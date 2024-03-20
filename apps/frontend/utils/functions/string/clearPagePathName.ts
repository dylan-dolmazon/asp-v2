export const clearPagePathName = (path: string): string => {
  // Utiliser la méthode replace pour enlever les barres obliques à la fin de la chaîne, uniquement si elles existent
  const cleanedPath = path.endsWith("/") ? path.replace(/\/+$/, "") : path;

  // Si la chaîne est vide après suppression des barres obliques, renvoyer "/"
  return cleanedPath || "/";
};
