const COOKIE_DOMAIN_ATTR =
  process.env.NODE_ENV === 'production' ? 'domain=.smsillico.ao; ' : '';

const COOKIE_OPTIONS = `path=/; ${COOKIE_DOMAIN_ATTR}max-age=31536000; SameSite=Lax`;

export function setPreferences(theme: string, locale: string) {
  document.cookie = `preferred_theme=${theme}; ${COOKIE_OPTIONS}`;
  document.cookie = `preferred_locale=${locale}; ${COOKIE_OPTIONS}`;
}

export function webUrl(path: string = '') {
  return `${process.env.NEXT_PUBLIC_WEB_URL}${path}`;
}
