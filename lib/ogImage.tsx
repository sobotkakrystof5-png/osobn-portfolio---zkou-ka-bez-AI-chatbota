import { ImageResponse } from "next/og";

export const ogImageSize = { width: 1200, height: 630 };

export function buildOgImage(title: string, subtitle: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#080808",
          backgroundImage:
            "radial-gradient(circle at 50% 26%, rgba(201,168,76,0.16) 0%, rgba(8,8,8,0) 60%)",
          padding: "90px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 32,
            letterSpacing: 14,
            color: "#c9a84c",
            textTransform: "uppercase",
            marginBottom: 34,
          }}
        >
          VIZEON
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 52,
            color: "#f0ece6",
            textAlign: "center",
            lineHeight: 1.25,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 22,
            color: "#8a8070",
            letterSpacing: 2,
            marginTop: 38,
            textTransform: "uppercase",
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    { ...ogImageSize }
  );
}
