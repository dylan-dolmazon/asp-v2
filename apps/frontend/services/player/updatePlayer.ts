export const updatePlayer = async (
  player: Omit<Player, "id" | "createdAt" | "updatedAt">,
  id: string
) => {
  return await useCustomFetch(`players/${id}`, "PUT", {
    body: { ...player },
  });
};
