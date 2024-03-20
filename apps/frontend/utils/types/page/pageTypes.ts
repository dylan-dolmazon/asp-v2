export type pageType = {
  title: string;
  url: string;
  path: string;
  allowedRoles: string[];
  link?: { href: string; text: string; linkAccessRoles: string[] };
};
