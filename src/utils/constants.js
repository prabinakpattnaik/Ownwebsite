// Central site configuration — single source of truth for domain, brand, and contact.
// Imported across SEO, footer, and contact components. Update values here only.

export const SITE_URL = "https://www.netrivium.com";
export const SITE_NAME = "Netrivium Technologies";
export const SITE_TAGLINE = "Building the Connected Future";
export const SITE_DESCRIPTION =
  "Netrivium Technologies — empowering businesses with intelligent connectivity, scalable networking solutions, and innovative SaaS & AI/ML development.";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

// Contact
export const SUPPORT_EMAIL_ADDRESS = "info@netrivium.com";
export const COMPANY_PHONE = "+91-40-49983275";
export const COMPANY_ADDRESS = "Hitech City, Hyderabad, India";

// Social profiles. TODO: replace with the company's real profile URLs.
export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/netrivium-technologies/",
  twitter: SITE_URL,
  instagram: SITE_URL,
  facebook: SITE_URL,
};

// Brand palette — kept in sync with the MUI theme (ThemeContext) and the brand pack.
export const BRAND = {
  navy: "#08213D",
  navyDeep: "#04101F",
  blue: "#0A5BD3",
  blueMid: "#1B5292",
  cyan: "#00B7E3",
  cyanBright: "#35D9FF",
};
