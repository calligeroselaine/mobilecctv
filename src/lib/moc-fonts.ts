import { Archivo } from "next/font/google";

/**
 * The Mobile Operations Centre design spec calls for Archivo, a variable
 * font with a width (wdth) axis, used at font-stretch: 62–125% throughout
 * (the oversized condensed headlines in the hero, Step Inside, Ramadan
 * Nights and Bathurst sections). Without loading the real variable font,
 * `font-stretch` on the system font stack is a no-op — headlines render
 * at full width in a normal sans-serif, wrap onto extra lines, and blow
 * out the whole page's vertical rhythm. This is scoped to the Mobile
 * Operations Centre page only (applied to that page's wrapper div), not
 * the site's global font, so no other page is affected.
 */
export const mocArchivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});
