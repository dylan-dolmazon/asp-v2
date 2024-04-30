export const getToken = (): Token | undefined => {
  return useCookie<Token>("token").value;
};
