import Link from "next/link";
import type { Producto } from "@/lib/data/productos";

type ProductHeroProps = {
  producto: Producto;
};

export default function ProductHero({ producto }: ProductHeroProps) {
  const accent =
    producto.especie === "gato" ? "var(--accent-cat)" : "var(--accent-dog)";

  return (
    <section className="bg-cream pt-8 md:pt-12">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center font-body text-sm font-medium text-brand-red/80 transition hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
        >
          ← Volver al inicio
        </Link>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-2 md:gap-14 md:py-20">
        <div
          className="relative aspect-[4/5] overflow-hidden rounded-sm md:aspect-[3/4]"
          style={{
            background:
              producto.especie === "gato"
                ? "linear-gradient(160deg, #D5E4E3 0%, #2A6F77 130%)"
                : "linear-gradient(160deg, #E8D5C4 0%, #C9743A 130%)",
          }}
          role="img"
          aria-label={`Imagen placeholder del costal de ${producto.nombre}`}
        >
          <span className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.16em] text-cream/85">
            Placeholder · costal {producto.nombre}
          </span>
        </div>

        <div className="flex flex-col justify-center gap-6">
          <p
            className="text-sm font-semibold uppercase tracking-[0.18em]"
            style={{ color: accent }}
          >
            {producto.lineaVida}
          </p>

          <h1 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-brand-red sm:text-4xl md:text-5xl">
            {producto.titulo}
          </h1>

          <p className="max-w-xl font-body text-lg leading-relaxed text-[var(--foreground)]/85">
            {producto.descripcion}
          </p>

          <div className="pt-2">
            <Link
              href="/#donde-comprar"
              className="inline-flex min-h-12 items-center justify-center rounded-sm px-6 py-3 text-sm font-semibold text-cream transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
              style={{ backgroundColor: accent }}
            >
              Encuentra un distribuidor cerca de ti
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
