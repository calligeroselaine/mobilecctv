export type Engagement = "Hire" | "Purchase";
export type SolutionRequired = "Mobile CCTV Trailer" | "Pole Camera" | "Both / a mix";

/**
 * Builds a /contact link that pre-selects the "Hire, Purchase, Or
 * Unsure?" and "Solution Required" dropdowns — used by the Purchase/Hire
 * Enquiry CTAs on the product and solution pages, read back out by
 * ContactForm via useSearchParams.
 */
export function contactHref(params: {
  engagement?: Engagement;
  solution?: SolutionRequired;
}): string {
  const searchParams = new URLSearchParams();
  if (params.engagement) searchParams.set("engagement", params.engagement);
  if (params.solution) searchParams.set("solution", params.solution);
  const query = searchParams.toString();
  return query ? `/contact?${query}` : "/contact";
}
