/**
 * Real Instagram posts pulled from the live site's homepage feed. Only 6
 * of the 16 posts shown there actually have a usable image: the rest are
 * hotlinked straight to Instagram's CDN with signed URLs that had already
 * expired by the time this was checked — confirmed broken on the OLD site
 * itself (naturalWidth: 0 in the live DOM), not just unavailable to us.
 * These 6 are cached on the client's own WordPress uploads folder instead,
 * so they're stable. A live-syncing feed (matching everything the old
 * site's plugin showed when its token was fresh) would need a real
 * Instagram Graph API connection — see the on-page note.
 */

export type InstagramPost = {
  image: string;
  caption: string;
  href: string;
};

export const instagramPosts: InstagramPost[] = [
  {
    image: "/images/instagram/insta-grounded-construction.jpg",
    caption:
      "We specialise in providing security coverage for areas where you wouldn't expect it — including a long-standing relationship with @grounded_construction, who design and construct mining villages all over Australia.",
    href: "https://www.instagram.com/reel/CsF6UcTsVwi/",
  },
  {
    image: "/images/instagram/insta-outdoor-event-security.jpg",
    caption:
      "Outdoor event security is our speciality. We bump in full security infrastructure for locations that don't typically have CCTV coverage.",
    href: "https://www.instagram.com/reel/CiJgEOTjHVC/",
  },
  {
    image: "/images/instagram/insta-trailer-dispatch.jpg",
    caption: "Mobile Security Trailer dispatch.",
    href: "https://www.instagram.com/reel/CTirvpGBAp3/",
  },
  {
    image: "/images/instagram/insta-fitting-out-trailer.jpg",
    caption: "Fitting out another security trailer.",
    href: "https://www.instagram.com/reel/CRXiTZSjfHc/",
  },
  {
    image: "/images/instagram/insta-customised-trailers.jpg",
    caption: "Yes — we customise our Mobile CCTV Solutions trailers.",
    href: "https://www.instagram.com/reel/CRDNMVPje4V/",
  },
  {
    image: "/images/instagram/insta-easy-deploy.jpg",
    caption: "Easy to deploy. Easy to set up.",
    href: "https://www.instagram.com/reel/CQc3X_sD7gg/",
  },
];
