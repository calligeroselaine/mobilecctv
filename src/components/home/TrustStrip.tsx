import Image from "next/image";

/**
 * A compact, auto-scrolling strip of client/council logos, sitting directly
 * under the hero banner. Individual logos were cropped out of the old
 * single flat "companies-we-work-with-banner.jpg" montage (see
 * public/images/trust-logos/) so they can run as a continuous marquee at a
 * much smaller size, rather than one large static image.
 */
const logos = [
  { file: "supercars", name: "Supercars", w: 446, h: 93 },
  { file: "willoughby-city-council", name: "Willoughby City Council", w: 256, h: 194 },
  { file: "richard-crookes-constructions", name: "Richard Crookes Constructions", w: 275, h: 91 },
  { file: "parkes-shire-council", name: "Parkes Shire Council", w: 365, h: 159 },
  { file: "grounded-construction-group", name: "Grounded Construction Group", w: 410, h: 117 },
  { file: "municipality-of-hunters-hill", name: "Municipality of Hunters Hill", w: 196, h: 196 },
  { file: "nsw-ports", name: "NSW Ports", w: 363, h: 149 },
  { file: "pcl-corp", name: "PCL Corp", w: 286, h: 168 },
  { file: "manly-sea-eagles", name: "Manly Warringah Sea Eagles", w: 248, h: 216 },
  { file: "coolmore", name: "Coolmore", w: 190, h: 191 },
  { file: "smokeshield-australia", name: "Smokeshield Australia", w: 200, h: 203 },
  { file: "inverell-shire-council", name: "Inverell Shire Council", w: 404, h: 143 },
  { file: "paddington-gold-mine", name: "Paddington Gold Mine", w: 434, h: 176 },
  { file: "northern-beaches-council", name: "Northern Beaches Council", w: 329, h: 161 },
  { file: "queensland-government", name: "Queensland Government, Department of Transport and Main Roads", w: 677, h: 161 },
  { file: "city-of-port-phillip", name: "City of Port Phillip", w: 193, h: 195 },
  { file: "global-event-management", name: "Global Event Management", w: 210, h: 209 },
  { file: "canterbury-bankstown", name: "Canterbury-Bankstown Council", w: 379, h: 137 },
];

function LogoRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={ariaHidden || undefined}>
      {logos.map((logo, i) => (
        <div key={`${logo.file}-${i}`} className="relative h-8 w-auto shrink-0 opacity-70 grayscale">
          <Image
            src={`/images/trust-logos/${logo.file}.png`}
            alt={ariaHidden ? "" : logo.name}
            width={logo.w}
            height={logo.h}
            className="h-8 w-auto object-contain"
          />
        </div>
      ))}
    </div>
  );
}

export function TrustStrip() {
  return (
    <div className="overflow-hidden border-y border-steel-200 bg-surface py-5">
      <p className="sr-only">Companies and councils who trust Mobile CCTV Solutions</p>
      <div className="flex w-max animate-trust-scroll">
        <LogoRow />
        <LogoRow ariaHidden />
      </div>
    </div>
  );
}
