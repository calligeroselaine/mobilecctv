import Image from "next/image";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import { instagramPosts } from "@/lib/instagram";
import { business } from "@/lib/business";

export function InstagramHighlights() {
  return (
    <Section tone="alt">
      <SectionHeading eyebrow="On The Ground" title="From Instagram" align="center" />
      <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
        {instagramPosts.map((post) => (
          <a
            key={post.href}
            href={post.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[3/4] overflow-hidden rounded-lg bg-ink"
          >
            <Image
              src={post.image}
              alt={post.caption}
              fill
              sizes="(min-width: 640px) 33vw, 50vw"
              className="object-cover transition-transform group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/0 to-black/0 p-3 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="line-clamp-4 text-xs text-white">{post.caption}</span>
            </span>
          </a>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Button href={business.social.instagram} variant="secondary">
          <InstagramIcon className="h-4 w-4" />
          Follow On Instagram
        </Button>
      </div>
    </Section>
  );
}
