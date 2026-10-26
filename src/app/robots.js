export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin-login", "/api/admin/"],
    },
    sitemap: "https://netarhat.in/sitemap.xml",
  };
}
