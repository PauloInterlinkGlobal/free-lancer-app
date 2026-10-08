import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createCookieSetter } from './cookie.helper';
import { handleErrors } from './errors.helper';

type TRequestMethods = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface IUseRequest extends RequestInit {
  url: string;
  method: TRequestMethods;
  responseType?: 'blob' | 'json';
  body?: any;
}

export type IResponse<T> = {
  error: { value: boolean; msg: string };
  status: number | null;
  data: T | null;
  retryAfter?: number | null;
};

export default async function serverRequest<T>({
  url,
  method,
  responseType,
  body,
  ...props
}: IUseRequest): Promise<IResponse<T>> {
  const cookieStore = await cookies();

  const rateLimitCookie = cookieStore.get('@smartsms:rlr')?.value;
  if (rateLimitCookie && parseInt(rateLimitCookie, 10) > Date.now()) {
    const remaining = Math.ceil(
      (parseInt(rateLimitCookie, 10) - Date.now()) / 1000
    );
    return {
      error: {
        value: true,
        msg: `Bloqueio ativo. Aguarde ${remaining} segundos.`,
      },
      status: 429,
      data: null,
    };
  }

  try {
    const baseURL =
      process.env.NODE_ENV === 'development'
        ? '/api'
        : process.env.NEXT_PUBLIC_API_SMSILLICO;

    const instance = `${baseURL}${url}`;

    const projectId = cookieStore.get(
      process.env.NEXT_PUBLIC_PROJECT as string
    )?.value;

    const allCookies = cookieStore
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join('; ');

    const isFormData = body instanceof FormData;
    const customHeaders = {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(projectId ? { 'x-project-id': projectId } : {}),
      ...(allCookies ? { Cookie: allCookies } : {}),
      ...props.headers,
    };

    let response = await fetch(instance, {
      ...props,
      method,
      headers: customHeaders,
      body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    });

    if (
      response.status === 401 &&
      !url.includes('/auth/login') &&
      !url.includes('/auth/refresh')
    ) {
      console.warn(
        '[ServerRequest] Token expirado (401). A tentar refresh automático...'
      );

      const refreshRes = await fetch(`${baseURL}/auth/refresh`, {
        method: 'POST',
        headers: { Cookie: allCookies },
      });

      if (refreshRes.ok) {
        const newSetCookies = refreshRes.headers.getSetCookie();
        await createCookieSetter(newSetCookies, cookieStore);

        const updatedCookies = cookieStore
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join('; ');

        response = await fetch(instance, {
          ...props,
          method,
          headers: { ...customHeaders, Cookie: updatedCookies },
          body: isFormData ? body : body ? JSON.stringify(body) : undefined,
        });
      } else {
        console.warn(
          '[ServerRequest] Refresh falhou. A forçar logout e redirecionar...'
        );

        try {
          cookieStore.delete('accessToken');
          cookieStore.delete('refreshToken');
        } catch (e) {
          console.error(
            '[ServerRequest] Erro ao limpar cookies durante logout:',
            e
          );
        }

        redirect('/login?session_expired=true');
      }
    }

    const setCookies = response.headers.getSetCookie();
    if (setCookies && setCookies.length > 0) {
      await createCookieSetter(setCookies, cookieStore);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: 'Erro inesperado no servidor da API.',
      }));
      return await handleErrors(response, errorData);
    }

    if (responseType === 'blob') {
      const blob = await response.blob();
      return {
        error: { value: false, msg: '' },
        status: response.status,
        data: blob as unknown as T,
      };
    }

    const text = await response.text();
    const res = text ? JSON.parse(text) : null;

    return {
      error: { value: false, msg: '' },
      status: response.status,
      data: (res ?? res?.data) as T,
    };
  } catch (error: any) {
    console.error('[ServerRequest Global Error]:', error);
    return {
      error: {
        value: true,
        msg: 'Não foi possível comunicar com o servidor da API. Tente novamente mais tarde.',
      },
      status: 503,
      data: null,
    };
  }
}
