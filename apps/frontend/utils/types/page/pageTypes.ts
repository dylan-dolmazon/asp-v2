type BreadcrumbType = {
  label: string;
  to?: string;
};

export type PageType = {
  title: string;
  path: string;
  allowedRoles: string[];
  breadCrumb?: BreadcrumbType[];
  link?: { href: string; text: string; linkAccessRoles: string[] };
};
