export const getPlayer = async (id: Ref) => {
  return await useCustomFetch<Player>("players/id", "GET", {
    params: { id },
  });
};
