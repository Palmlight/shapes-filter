import Cookie from "js-cookie";

const constant = {
  tokenName: "theP"
};

export const getTokenFromStorage = (cookie?: string) => {
  if (process.browser) {
    return Cookie.get(constant.tokenName);
  } else {
    if (cookie) {
      const rawCookie = cookie
        .split(";")
        .find(c => c.trim().startsWith(`theP=`));
      if (!rawCookie) return undefined;
      return rawCookie?.split("=")[1];
    }
  }
};

export const getEmailFromStorage = (cookie?: string) => {
  if (cookie) {
    const rawCookie = cookie
      .split(";")
      .find(c => c.trim().startsWith(`email=`));
    if (!rawCookie) return undefined;
    return rawCookie?.split("=")[1];
  }
};

export const removeTokenFromStorage = () => {
  return Cookie.remove(constant.tokenName);
};

export const setTokenToStorage = (token: string) => {
  return Cookie.set(constant.tokenName, token, { expires: 7 });
};
