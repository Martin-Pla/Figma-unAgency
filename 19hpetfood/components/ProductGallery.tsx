import Image from "next/image";
import type { Producto } from "@/lib/data/productos";
import FadeIn from "@/components/FadeIn";
import { asset } from "@/lib/asset";

type ProductGalleryProps = {
  producto: Producto;
};

export default function ProductGallery({ producto }: ProductGalleryProps) {
  const images =
    producto.galeria && producto.galeria.length > 0
      ? producto.galeria
      : producto.imagenLifestyle
        ? [
            {
              src: producto.imagenLifestyle,
              alt:
                producto.altLifestyle ||
                `Foto de ${producto.nombre} con mascota en el hogar`,
            },
          ]
        : [];

  if (images.length === 0) return null;

  return (
    <section className="bg-cream py-12 md:py-16" aria-label="Galería del producto">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <FadeIn>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-brand-red md:text-3xl">
            En el hogar
          </h2>
        </FadeIn>

        <div
          className={`mt-8 grid gap-4 ${
            images.length === 1
              ? "md:grid-cols-1"
              : images.length === 2
                ? "sm:grid-cols-2"
                : "sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {images.map((item, i) => (
            <FadeIn key={item.src} delay={i * 0.06} duration={0.5}>
              <div className="relative aspect-[3/4] min-h-[280px] overflow-hidden rounded-sm bg-[#1a1214] shadow-md sm:min-h-[360px]">
                <Image
                  src={asset(item.src)}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center"
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
