export const isAdmin = (): boolean => {
  const role = useCookie<User>("user").value?.role;
  return role === "admin" || role === "moderator";
};
