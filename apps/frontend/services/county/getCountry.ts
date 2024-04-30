export const getCountries = async () => {
  return await useCustomFetch<Country[]>(`countries`, "GET");
};
