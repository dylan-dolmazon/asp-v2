export const isModerator = (): boolean => {
  return useCookie<User>("user").value?.role?.includes("moderator");
};
