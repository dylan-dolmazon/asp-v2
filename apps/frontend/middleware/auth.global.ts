export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();
  const allowedRoles = pages_config.find((page) =>
    configPagePathIsSameAsTo(page.path, to.path)
  )?.allowedRoles;
  if (!allowedRoles) return navigateTo("/", { redirectCode: 302 });
  if (allowedRoles.includes("all")) return;
  if (!userStore.isLoggin) {
    addToast(
      "Acces refusé",
      ["Vous devez être connecté pour accéder à cette page"],
      "error"
    );
    return navigateTo(`/auth/login?redirect=${to.path}`, { redirectCode: 302 });
  }

  if (
    !userStore.getUserInfos.role ||
    !allowedRoles.includes(userStore.getUserInfos.role)
  ) {
    addToast(
      "Acces refusé",
      ["Vous n'avez pas les droits pour accéder à cette page"],
      "error"
    );
    return navigateTo("/", { redirectCode: 302 });
  }
});
