export const createCookieSetter = async (
  setCookies: string[],
  cookieStore: any
) => {
  if (!setCookies || setCookies.length === 0) return;

  try {
    setCookies.forEach((cookieStr) => {
      const parts = cookieStr.split(';');
      const [nameValue] = parts;
      const [name, value] = nameValue.split('=');

      if (name && value) {
        cookieStore.set(name.trim(), value.trim(), {
          httpOnly: cookieStr.toLowerCase().includes('httponly'),
          secure: cookieStr.toLowerCase().includes('secure'),
        });
      }
    });
  } catch (error) {
    console.warn(
      '[Next.js Cookies] Não é possível definir cookies num contexto Read-Only (Server Component).'
    );
  }
};
