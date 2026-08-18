export const exploreNavigation = [
  { href: "/", label: "Field Guide" },
  { href: "/planets", label: "Planets" },
  { href: "/deep-space", label: "Deep Space" },
  { href: "/orbit-data", label: "Orbit Data" },
  { href: "/spacecraft", label: "Spacecraft" },
  { href: "/cosmic-archive", label: "Cosmic Archive" },
  { href: "/near-earth", label: "Near Earth" },
  { href: "/ar-experience", label: "AR Experience" },
] as const;

export const explorerNavigation = [
  { href: "/app", label: "View App", action: true, featured: true },
  { href: "/my-space", label: "My Page", action: true },
  { href: "/login", label: "Log In", action: true },
  { href: "/signup", label: "Sign Up", action: true },
] as const;

export const siteNavigation = [...explorerNavigation, ...exploreNavigation];
