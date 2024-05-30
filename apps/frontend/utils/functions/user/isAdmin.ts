export const isAdmin = (): boolean => {
  const { role } = useCookie<User>("user").value;
  return role === "admin" || role === "moderator";
};
