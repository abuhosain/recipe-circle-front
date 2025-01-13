export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Recipe Circle",
  description: "Recipe Circle is a blogtype site",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Add Friend",
      href: "/friend",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Add Friend",
      href: "/friend",
    },
  ],
};
