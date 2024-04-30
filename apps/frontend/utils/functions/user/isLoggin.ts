export const isLoggin = (): boolean => {
  return !!useCookie<User>("user").value;
};
