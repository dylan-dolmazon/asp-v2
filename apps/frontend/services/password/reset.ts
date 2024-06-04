export const resetPassword = async ({
  email,
  token,
  password,
  password_confirmation
}: {email: string, token: string, password:string,password_confirmation: string}) => {
  return await useCustomFetch<ApiResponseType>(`reset-password`, "POST", {
    body: { email, token, password, password_confirmation },
  });
};
