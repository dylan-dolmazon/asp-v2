export const useUserStore = defineStore({
  id: "user-store",
  state: (): { user: User } => {
    const userCookie = useCookie<User>("user");
    const tokenCookie = useCookie<Token>("token");

    const user = userCookie.value ? userCookie.value : null;
    const token = tokenCookie.value ? tokenCookie.value : null;
    return {
      user:
        user && token
          ? { ...user, token }
          : {
              id: -1,
              email: "",
              firstname: "",
              lastname: "",
              username: "",
              role: "",
              createdAt: "",
              updatedAt: "",
              token: {
                abilities: [],
                expiresAt: "",
                lastUsedAt: "",
                token: "",
                type: "",
                name: "",
              },
            },
    };
  },
  actions: {
    setUserInfos(userInfos: User, remember = false) {
      this.user = userInfos;

      if (remember) {
        const userCookie = useCookie("user");
        const tokenCookie = useCookie("token");
        const { token, ...userValue } = userInfos;

        userCookie.value = JSON.stringify(userValue);
        tokenCookie.value = JSON.stringify(token);
      }
    },
    resetUserInfos() {
      this.user = {
        id: -1,
        email: "",
        firstname: "",
        lastname: "",
        username: "",
        role: "",
        createdAt: "",
        updatedAt: "",
        token: {
          abilities: [],
          expiresAt: "",
          lastUsedAt: "",
          token: "",
          type: "",
          name: "",
        },
      };
      const userCookie = useCookie("user");
      const tokenCookie = useCookie("token");
      userCookie.value = null;
      tokenCookie.value = null;
    },
  },
  getters: {
    getUserInfos: (state) => state.user,
    getToken: (state) => state.user.token,
    isLoggin: (state) => state.user.id !== -1,
    isAdmin: (state) =>
      state.user.role === "admin" || state.user.role === "moderator",
  },
});
