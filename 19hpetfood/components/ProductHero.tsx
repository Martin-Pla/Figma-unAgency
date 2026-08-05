import Link from "next/link";
import Image from "next/image";
import type { Producto } from "@/lib/data/productos";
import FadeIn from "@/components/FadeIn";
import ProductImage from "@/components/ProductImage";

type ProductHeroProps = {
  producto: Producto;
};

export default function ProductHero({ producto }: ProductHeroProps) {
  const accent =
    producto.especie === "gato" ? "var(--accent-cat)" : "var(--accent-dog)";

  const secondaryLifestyle = producto.galeria?.find(
    (g) => g.src !== producto.imagenLifestyle,
  );

  return (
    <section className="bg-cream pt-24 md:pt-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center font-body text-sm font-medium text-brand-red/80 transition hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
        >
          ← Volver al inicio
        </Link>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-2 md:gap-14 md:py-16">
        <FadeIn duration={0.5} className="space-y-4">
          <ProductImage
            producto={producto}
            variant="hero"
            priority
            className="rounded-sm shadow-lg"
          />
          {producto.imagen && producto.imagenLifestyle && (
            <div className="grid grid-cols-2 gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-black">
                <Image
                  src={producto.imagen}
                  alt={`Costal de alimento ${producto.nombre}`}
                  fill
                  sizes="25vw"
                  className="object-contain p-2"
                />
              </div>
              {secondaryLifestyle && (
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#1a1214]">
                  <Image
                    src={secondaryLifestyle.src}
                    alt={secondaryLifestyle.alt}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          )}
        </FadeIn>

        <FadeIn
          delay={0.08}
          duration={0.5}
          className="flex flex-col justify-center gap-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <p
              className="text-sm font-semibold uppercase tracking-[0.18em]"
              style={{ color: accent }}
            >
              {producto.lineaVida}
            </p>
            {producto.peso && (
              <span className="rounded-sm border border-brand-red/20 px-2.5 py-1 font-body text-xs font-medium text-[var(--foreground)]/70">
                Cont. neto {producto.peso}
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-brand-red sm:text-4xl md:text-5xl">
            {producto.titulo}
          </h1>

          <p className="max-w-xl font-body text-lg leading-relaxed text-[var(--foreground)]/85">
            {producto.descripcion}
          </p>

          <div className="pt-2">
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
