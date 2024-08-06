export const generateScorerClassement = async (
  title: string,
  season: string
) => {
  return await useCustomFetch<CanvasDataUrl>(
    `canvas?title=${title}&season=${season}`,
    "GET"
  );
};
