import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/pruvodce", "/odznak"],
      },
    ],
    sitemap: "https://the-pulse.cz/sitemap.xml",
  };
}
