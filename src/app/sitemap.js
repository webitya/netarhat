import { tourPackages, destinations, blogPosts } from "@/lib/data";

export default function sitemap() {
  const baseUrl = "https://netarhat.in";

  const staticRoutes = [
    "",
    "/destinations",
    "/destinations/netarhat",
    "/destinations/betla",
    "/tours",
    "/stays",
    "/gallery",
    "/blog",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: "2026-10-26T00:00:00.000Z",
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  const tourRoutes = tourPackages.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: "2026-10-26T00:00:00.000Z",
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: "2026-10-26T00:00:00.000Z",
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...tourRoutes, ...blogRoutes];
}
