export const exploreNavigation = [
  { href: "/", label: "Field Guide" },
  { href: "/planets", label: "Planets" },
  { href: "/deep-space", label: "Deep Space" },
  { href: "/orbit-data", label: "Orbit Data" },
  { href: "/spacecraft", label: "Spacecraft" },
  { href: "/ar-experience", label: "AR Experience" },
] as const;

export const explorerNavigation = [
  { href: "/app", label: "View App", featured: true },
  { href: "/my-space", label: "My Page" },
  { href: "/login", label: "Log In" },
  { href: "/signup", label: "Sign Up" },
] as const;

export const siteNavigation = [...exploreNavigation, ...explorerNavigation];
