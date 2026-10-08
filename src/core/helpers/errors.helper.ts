import { cookies } from 'next/headers';

export async function handleErrors(
  response: Response,
  errorData: { message?: string; error?: string }
) {
  if (response.status === 401 || response.status === 404) {
    console.error('Response error:', response.status);

    return {
      error: {
        value: true,
        msg:
          errorData?.message ||
          errorData?.error ||
          'Erro de autenticação ou rota não encontrada.',
      },
      status: response.status,
      data: null,
    };
  }

  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    const rateLimitReset = response.headers.get('RateLimit-Reset');

    let resetTimestamp = Date.now() + 15 * 60 * 1000;

    if (retryAfter) {
      resetTimestamp = Date.now() + parseInt(retryAfter, 10) * 1000;
    } else if (rateLimitReset) {
      resetTimestamp = parseInt(rateLimitReset, 10) * 1000;
    }

    const remainingSeconds = Math.ceil((resetTimestamp - Date.now()) / 1000);
    const waitTimeMessage =
      remainingSeconds > 60
        ? `${Math.ceil(remainingSeconds / 60)} minutos`
        : `${remainingSeconds} segundos`;

    const cookieStore = await cookies();
    cookieStore.set('@smartsms:rlr', resetTimestamp.toString(), {
      expires: new Date(resetTimestamp),
      httpOnly: true,
    });

    console.warn(
      `[SmartSMS Rate Limit] Limite atingido. Aguardar: ${waitTimeMessage}`
    );

    return {
      error: {
        value: true,
        msg: `Muitos pedidos. Por favor, aguarde ${waitTimeMessage} antes de tentar novamente.`,
      },
      status: 429,
      data: null,
      retryAfter: remainingSeconds,
    };
  }

  if ([400, 402, 403, 409, 412, 422, 500, 501, 503].includes(response.status)) {
    console.error('Response error:', response.status);

    return {
      error: {
        value: true,
        msg:
          errorData?.message ||
          errorData?.error ||
          'Erro no processamento do pedido.',
      },
      status: response.status,
      data: null,
    };
  }

  return {
    error: {
      value: true,
      msg: 'Erro desconhecido. Por favor, tente novamente mais tarde.',
    },
    status: response.status,
    data: null,
  };
}
