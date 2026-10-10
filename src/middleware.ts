import { routing } from '@/core/i18n/routing';
import createMiddleware from 'next-intl/middleware';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const allowedIPs = new Set(
  (process.env.ALLOWED_IPS ?? '')
    .split(',')
    .map((ip) => ip.trim())
    .filter(Boolean)
);
allowedIPs.add('127.0.0.1');
allowedIPs.add('::1');

const SANDBOX_PREFIXES = ['sandboxapp.', 'sandboxadmin.', 'sandboxweb.'];
const isIpAllowlistEnabled = process.env.ENABLE_IP_ALLOWLIST === 'true';

export function middleware(request: NextRequest) {
  try {
    if (isIpAllowlistEnabled && process.env.MODE !== 'production') {
      const forwarded = request.headers.get('x-forwarded-for');
      const realIp = request.headers.get('x-real-ip');

      let requestIp = forwarded
        ? forwarded.split(',')[0].trim()
        : (realIp ?? '');

      if (requestIp.includes('::ffff:')) {
        requestIp = requestIp.replace('::ffff:', '');
      }

      const host = request.headers.get('host');
      const isSandbox = SANDBOX_PREFIXES.some((prefix) =>
        host?.startsWith(prefix)
      );

      // O preview do v0 usa IPs efêmeros; a proteção por allowlist é aplicada
      // somente fora dos hosts de sandbox e continua server-side no middleware.
      if (!isSandbox && requestIp && !allowedIPs.has(requestIp)) {
        console.error(`[IP Blocked] IP não autorizado: ${requestIp}`);

        const blocked = NextResponse.json(
          { message: `Forbidden: IP not allowed, yourIP: ${requestIp}` },
          { status: 403 }
        );

        blocked.headers.set('X-Frame-Options', 'DENY');
        blocked.headers.set('X-Content-Type-Options', 'nosniff');
        blocked.headers.set(
          'Referrer-Policy',
          'strict-origin-when-cross-origin'
        );

        return blocked;
      }
    }

    const intlResponse = intlMiddleware(request);

    if (intlResponse && intlResponse.status !== 200) {
      intlResponse.headers.set('X-Frame-Options', 'DENY');
      intlResponse.headers.set('X-Content-Type-Options', 'nosniff');
      intlResponse.headers.set(
        'Referrer-Policy',
        'strict-origin-when-cross-origin'
      );
      return intlResponse;
    }

    const response = intlResponse || NextResponse.next();

    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
