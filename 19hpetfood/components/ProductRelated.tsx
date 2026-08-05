import Link from "next/link";
import type { Producto } from "@/lib/data/productos";
import FadeIn from "@/components/FadeIn";
import ProductImage from "@/components/ProductImage";

type ProductRelatedProps = {
  productos: Producto[];
};

export default function ProductRelated({ productos }: ProductRelatedProps) {
  if (productos.length === 0) return null;

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <FadeIn duration={0.5}>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-brand-red md:text-4xl">
            Otros productos de la línea
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {productos.map((producto, i) => (
            <FadeIn key={producto.slug} delay={i * 0.06} duration={0.5}>
              <Link
                href={`/producto/${producto.slug}`}
                className="card-interactive group block overflow-hidden rounded-sm border border-brand-red/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
              >
                <ProductImage producto={producto} variant="card" />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]/50">
                    {producto.lineaVida}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold text-brand-red">
                    {producto.nombre}
                  </h3>
                  <p className="mt-2 font-body text-sm text-[var(--foreground)]/70">
                    {producto.beneficio}
                  </p>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
