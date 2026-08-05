import Image from "next/image";
import type { Producto } from "@/lib/data/productos";
import { getProductoVisual } from "@/lib/data/productos";
import { asset } from "@/lib/asset";

type ProductImageProps = {
  producto: Producto;
  /** hero = ficha grande; card = catálogo / related; bag = solo costal */
  variant?: "hero" | "card" | "bag";
  className?: string;
  priority?: boolean;
};

export default function ProductImage({
  producto,
  variant = "card",
  className = "",
  priority = false,
}: ProductImageProps) {
  const isBag = variant === "bag";
  const rawSrc = isBag
    ? producto.imagen
    : getProductoVisual(producto) || producto.imagen;
  const src = rawSrc ? asset(rawSrc) : undefined;
  const useCover = !isBag && Boolean(producto.imagenLifestyle);

  const accentBg =
    producto.especie === "gato"
      ? "linear-gradient(145deg, #1a1214 0%, #2A6F77 140%)"
      : "linear-gradient(145deg, #1a1214 0%, #C9743A 140%)";

  const aspect =
    variant === "hero"
      ? "aspect-[3/4] min-h-[320px] sm:min-h-[420px] md:aspect-[4/5] md:min-h-[520px]"
      : variant === "bag"
        ? "aspect-[3/4]"
        : "aspect-[4/5] min-h-[240px]";

  const alt = isBag
    ? `Costal de alimento ${producto.nombre}`
    : producto.altLifestyle ||
      `Foto de ${producto.nombre} con mascota en el hogar`;

  if (!src) {
    return (
      <div
        className={`relative w-full overflow-hidden ${aspect} ${className}`}
        style={{ background: accentBg }}
        role="img"
        aria-label={`Imagen pendiente del costal de ${producto.nombre}`}
      >
        <span className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.16em] text-cream/70">
          Imagen pendiente · {producto.nombre}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${
        useCover ? "bg-[#1a1214]" : "bg-black"
      } ${aspect} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={
          variant === "hero"
            ? "(max-width: 768px) 100vw, 50vw"
            : "(max-width: 768px) 100vw, 33vw"
        }
        className={
          useCover
            ? "object-cover object-center"
            : "object-contain object-center p-3 sm:p-4"
        }
      />
    </div>
  );
}
