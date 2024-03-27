export const configPagePathIsSameAsTo = (path: string, to: string): boolean => {
  // Convertir le chemin de la page en une expression régulière
  const pathRegex = new RegExp("^" + path.replace(/:[^/]+/g, "[^/]+") + "$");
  // Vérifier si le chemin de la route correspond au chemin de la page
  return pathRegex.test(to);
};
