export default defineNuxtRouteMiddleware((to) => {
  const allowedRoles = pages_config.find((page) =>
    configPagePathIsSameAsTo(page.path, to.path)
  )?.allowedRoles;
  if (!allowedRoles) return navigateTo("/", { redirectCode: 302 });
  if (allowedRoles.includes("all")) return;
  const user = useCookie<User>("user");
  if (!user.value) {
    addToast(
      "Acces refusé",
      ["Vous devez être connecté pour accéder à cette page"],
      "error"
    );
    return navigateTo("/auth/login", { redirectCode: 302 });
  }
  if (!allowedRoles.includes(user.value.role)) {
    addToast(
      "Acces refusé",
      ["Vous n'avez pas les droits pour accéder à cette page"],
      "error"
    );
    return navigateTo("/", { redirectCode: 302 });
  }
});
