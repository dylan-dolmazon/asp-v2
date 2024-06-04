export const checkLink = async (token: string, email: string) => {
  return await useCustomFetch<ApiResponseType>(`check-link`, "POST", {
    body: { token, email },
  });
};
