import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import type { Especie } from "@/lib/data/productos";

type ProductCtaProps = {
  especie: Especie;
};

export default function ProductCta({ especie }: ProductCtaProps) {
  const accent =
    especie === "gato" ? "var(--accent-cat)" : "var(--accent-dog)";

  return (
    <section className="bg-cream pb-24 pt-8 md:pb-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <FadeIn duration={0.5}>
          <div className="rounded-sm border border-brand-red/15 px-6 py-12 text-center md:px-12 md:py-16">
            <Link
              href="/#donde-comprar"
              className="btn-interactive inline-flex min-h-12 items-center justify-center rounded-sm px-6 py-3 text-sm font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
              style={{ backgroundColor: accent }}
            >
              Encuentra un distribuidor cerca de ti
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
