import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The-Pulse.cz — Průvodce vodním půstem",
    short_name: "The-Pulse",
    description: "Interaktivní průvodce 5denním vodním půstem",
    start_url: "/",
    display: "standalone",
    background_color: "#f0fdfa",
    theme_color: "#0d9488",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
