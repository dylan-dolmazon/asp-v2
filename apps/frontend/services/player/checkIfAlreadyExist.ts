type CheckPlayer = {
  lastname: string;
  firstname: string;
};

export const checkIfAlreadyExist = async (player: CheckPlayer) => {
  return await useCustomFetch<Player[]>(`players/check`, "POST", {
    body: { ...player },
  });
};
