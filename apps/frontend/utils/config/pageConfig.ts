export const pages_config: PageType[] = [
  {
    title: "",

    path: "/auth/login",
    allowedRoles: ["all"],
  },
  {
    title: "",

    path: "/auth/register",
    allowedRoles: ["all"],
  },
  {
    title: "Classement des buteurs",

    path: "/",
    allowedRoles: ["all"],
    link: {
      href: "/admin/buteurs",
      text: "Modifier le classement",
      linkAccessRoles: ["admin"],
    },
    breadCrumb: [{ label: "Accueil" }],
  },
  {
    title: "Résultats des équipes",
    path: "/results",
    allowedRoles: ["all"],
    breadCrumb: [{ label: "Résultats" }],
  },
  {
    title: "Administration menu",
    path: "/admin",
    allowedRoles: ["admin", "moderator"],
    breadCrumb: [{ label: "Administration" }],
  },
  {
    title: "Classement des buteurs",
    breadCrumb: [
      { label: "Administration", to: "/admin" },
      { label: "Classement des buteurs" },
    ],
    path: "/admin/buteurs",
    allowedRoles: ["admin", "moderator"],
  },
  {
    title: "Gérer mon équipe",
    path: "/equipe",
    allowedRoles: ["all"],
    breadCrumb: [{ label: "Equipe" }],
  },
  {
    title: "Détail du joueur",
    path: "/equipe/player/:id",
    allowedRoles: ["all"],
    breadCrumb: [{ label: "Equipe", to: "/equipe" }, { label: "Joueur" }],
  },
];
