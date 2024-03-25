export const pages_config: PageType[] = [
  {
    title: "",
    url: "",
    path: "/auth/login",
    allowedRoles: ["all"],
  },
  {
    title: "",
    url: "",
    path: "/auth/register",
    allowedRoles: ["all"],
  },
  {
    title: "Classement des buteurs",
    url: "Accueil",
    path: "/",
    allowedRoles: ["all"],
    link: {
      href: "/admin/buteurs",
      text: "Modifier le classement",
      linkAccessRoles: ["admin"],
    },
  },
  {
    title: "Résultats des équipes",
    url: "Accueil / Résultats",
    path: "/results",
    allowedRoles: ["all"],
  },
  {
    title: "Administration menu",
    url: "Administration",
    path: "/admin",
    allowedRoles: ["admin", "moderator"],
  },
  {
    title: "Classement des buteurs",
    url: "Administration / Buteurs",
    path: "/admin/buteurs",
    allowedRoles: ["admin", "moderator"],
  },
  {
    title: "Gérer mon équipe",
    url: "Administration / Equipe",
    path: "/admin/equipe",
    allowedRoles: ["admin", "moderator"],
  },
];
