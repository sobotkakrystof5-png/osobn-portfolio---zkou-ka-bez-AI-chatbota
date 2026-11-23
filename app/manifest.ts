import type { MetadataRoute } from "next";

// Web app manifest (/manifest.webmanifest). Ikona je logo z app/logo.png,
// barvy odpovídají tmavému pozadí webu a themeColor v app/layout.tsx.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VIZEON",
    short_name: "VIZEON",
    description: "Weby a e-shopy na míru pro firmy a živnostníky.",
    start_url: "/",
    display: "browser",
    background_color: "#080808",
    theme_color: "#080808",
    lang: "cs",
    icons: [{ src: "/logo.png", sizes: "512x512", type: "image/png" }],
  };
}
