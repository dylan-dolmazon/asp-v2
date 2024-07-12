export const checkCompetsInfos = async () => {
  return await useCustomFetch(`/compets/updates`);
};
