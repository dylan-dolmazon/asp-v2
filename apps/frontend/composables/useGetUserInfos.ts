export const useUserInfos = () => {
  const cookieUserInfos = useCookie<User | null>("user");
  const cookieToken = useCookie<Token | null>("token");

  const storageUserInfos = localStorage.getItem("user");
  const storageToken = localStorage.getItem("token");

  const userInfosState = useState<User>("userInfos", () =>
    storageUserInfos && storageToken
      ? {
          ...JSON.parse(storageUserInfos),
          token: JSON.parse(storageToken),
        }
      : cookieUserInfos.value && cookieToken.value
        ? {
            ...cookieUserInfos.value,
            token: cookieToken.value,
          }
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
          }
  );

  const getUserInfos = computed(() => userInfosState.value);
  const getToken = computed(() => userInfosState.value.token);

  const setUserInfos = (userInfos: User, remember = false) => {
    userInfosState.value = userInfos;

    localStorage.setItem("user", JSON.stringify(userInfos));
    localStorage.setItem("token", JSON.stringify(userInfos.token));

    if (remember) {
      const userCookie = useCookie<User>("user");
      const tokenCookie = useCookie<Token>("token");

      const { token, ...userValue } = userInfos;

      userCookie.value = userValue;
      tokenCookie.value = token!;
    }
  };

  const resetUserInfos = () => {
    setUserInfos({
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
    });

    cookieUserInfos.value = null;
    cookieToken.value = null;

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isLoggin = computed(() => userInfosState.value.id !== -1);

  const isAdmin = computed(
    () =>
      userInfosState.value.role === "admin" ||
      userInfosState.value.role === "moderator"
  );

  return {
    getUserInfos,
    setUserInfos,
    resetUserInfos,
    isLoggin,
    isAdmin,
    getToken,
  };
};
