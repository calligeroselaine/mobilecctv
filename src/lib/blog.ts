/**
 * Blog post data, sourced verbatim from the Stage 1 audit of the live site.
 * Only the fields needed for teaser cards live here; full post bodies are
 * built in the Blog stage.
 */

export type BlogPost = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
};

/** Ordered as the live site's blog index displays them (most recent first). */
export const blogPosts: BlogPost[] = [
  {
    slug: "securing-the-granny-smith-festival",
    date: "1 November",
    title: "Securing the Granny Smith Festival with Mobile CCTV Solutions",
    excerpt:
      "Mobile CCTV Solutions was proud to support the recent Granny Smith Festival in Ryde, providing high-tech, flexible security to keep the event safe and enjoyable for all.",
  },
  {
    slug: "safeguarding-our-communities",
    date: "5 May",
    title: "Safeguarding Our Communities Whilst Protecting Our Youth",
    excerpt:
      "Councils around Australia are turning to our pole camera technology and security trailers to protect neighbourhoods and deter antisocial behaviour.",
  },
  {
    slug: "safeguarding-tradition-ramadan-festival",
    date: "29 April",
    title:
      "Safeguarding Tradition – The Crucial Role of Mobile CCTV Solutions at Sydney's Largest Ramadan Festival",
    excerpt:
      "For the fifth consecutive year, a South West Sydney Council entrusted Mobile CCTV Solutions as the security provider for the Lakemba Nights Ramadan Festival.",
  },
];

/** Home page shows the 3 most recent; the Blog stage will use the full set. */
export const recentBlogPosts = blogPosts.slice(0, 3);
