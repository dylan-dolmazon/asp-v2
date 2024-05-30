export const translateRole = (role: User["role"]): string => {
  switch (role) {
    case "admin":
      return "Administrateur";
    case "moderator":
      return "Modérateur";
    default:
      return "Utilisateur";
  }
};
