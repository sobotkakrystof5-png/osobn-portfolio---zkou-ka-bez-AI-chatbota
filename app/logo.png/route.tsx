import { ImageResponse } from "next/og";
import { loadFonts } from "@/lib/ogImage";

// Logo pro strukturovaná data (Organization.logo v app/layout.tsx). Google
// chce rastr aspoň 112×112 px, favicon.ico 32×32 nestačil. Wordmark je ve
// stylu VizeonLogo: Cormorant light, verzálky, prostrk 0,2 em, krémová na
// tmavém pozadí webu. Generuje se jednou při buildu.
export const dynamic = "force-static";

const SIZE = 512;

export async function GET() {
  const fonts = await loadFonts();
  return new ImageResponse(
    (
      <div
        style={{
          width: SIZE,
          height: SIZE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#080808",
        }}
      >
        {/* paddingLeft vyrovnává prostrk za posledním písmenem, ať je
            wordmark opticky na středu. */}
        <div
          style={{
            fontFamily: "Cormorant Garamond",
            fontWeight: 300,
            fontSize: 84,
            letterSpacing: "0.2em",
            paddingLeft: "0.2em",
            color: "#f0ece6",
          }}
        >
          VIZEON
        </div>
      </div>
    ),
    { width: SIZE, height: SIZE, fonts }
  );
}
