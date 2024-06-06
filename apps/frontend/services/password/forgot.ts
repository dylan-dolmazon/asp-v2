export const forgotPassword = async (email: string) => {
  return await useCustomFetch<ApiResponseType>(`forgot-password`, "POST", {
    body: { email },
  });
};
