export const isAdmin = (): boolean => {
  return useCookie<User>("user").value?.role?.includes("admin" || "moderator");
};
