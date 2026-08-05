import Image from "next/image";
import type { Producto } from "@/lib/data/productos";

type ProductImageProps = {
  producto: Producto;
  /** hero = ficha grande; card = catálogo / related */
  variant?: "hero" | "card";
  className?: string;
  priority?: boolean;
};

export default function ProductImage({
  producto,
  variant = "card",
  className = "",
  priority = false,
}: ProductImageProps) {
  const accentBg =
    producto.especie === "gato"
      ? "linear-gradient(145deg, #1a1214 0%, #2A6F77 140%)"
      : "linear-gradient(145deg, #1a1214 0%, #C9743A 140%)";

  if (!producto.imagen) {
    return (
      <div
        className={`relative w-full overflow-hidden bg-[#111] ${
          variant === "hero" ? "aspect-[4/5] md:aspect-[3/4]" : "aspect-[4/3]"
        } ${className}`}
        style={{ background: accentBg }}
        role="img"
        aria-label={`Imagen pendiente del costal de ${producto.nombre}`}
      >
        <span className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.16em] text-cream/70">
          Placeholder · {producto.nombre}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-black ${
        variant === "hero" ? "aspect-[3/4] md:aspect-[4/5]" : "aspect-[4/5]"
      } ${className}`}
    >
      <Image
        src={producto.imagen}
        alt={`Costal de ${producto.nombre}`}
        fill
        priority={priority}
        sizes={
          variant === "hero"
            ? "(max-width: 768px) 100vw, 50vw"
            : "(max-width: 768px) 100vw, 33vw"
        }
        className="object-contain object-center p-2 sm:p-3"
      />
    </div>
  );
}
