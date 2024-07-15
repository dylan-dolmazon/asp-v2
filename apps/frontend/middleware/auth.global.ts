export default defineNuxtRouteMiddleware((to) => {
  const { isLoggin, getUserInfos } = useUserInfos();
  const allowedRoles = pages_config.find((page) =>
    configPagePathIsSameAsTo(page.path, to.path)
  )?.allowedRoles;
  if (!allowedRoles) return navigateTo("/", { redirectCode: 302 });
  if (allowedRoles.includes("all")) return;
  if (!isLoggin.value) {
    addToast(
      "Acces refusé",
      ["Vous devez être connecté pour accéder à cette page"],
      "error"
    );
    return navigateTo(`/auth/login?redirect=${to.path}`, { redirectCode: 302 });
  }

  if (
    !getUserInfos.value.role ||
    !allowedRoles.includes(getUserInfos.value.role)
  ) {
    addToast(
      "Acces refusé",
      ["Vous n'avez pas les droits pour accéder à cette page"],
      "error"
    );
    return navigateTo("/", { redirectCode: 302 });
  }
});
