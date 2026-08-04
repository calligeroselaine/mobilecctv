import { ChevronDown } from "lucide-react";

export type FaqItem = {
  question: string;
  answer: string;
};

type FaqProps = {
  items: FaqItem[];
};

/** Accessible FAQ list — native <details>/<summary>, no JS required. */
export function Faq({ items }: FaqProps) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-steel-200 border-y border-steel-200">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand">
            {item.question}
            <ChevronDown
              className="h-5 w-5 shrink-0 text-steel-400 transition-transform group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="mt-3 text-steel-600">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
