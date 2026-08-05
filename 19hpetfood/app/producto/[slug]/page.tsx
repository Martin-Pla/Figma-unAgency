import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import ProductHero from "@/components/ProductHero";
import ProductBenefits from "@/components/ProductBenefits";
import ProductNutritionTable from "@/components/ProductNutritionTable";
import ProductRelated from "@/components/ProductRelated";
import ProductCta from "@/components/ProductCta";
import {
  getProductoBySlug,
  getRelatedProductos,
  productos,
} from "@/lib/data/productos";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const producto = getProductoBySlug(params.slug);
  if (!producto) {
    return { title: "Producto no encontrado — 19hPetFood" };
  }
  return {
    title: `${producto.nombre} — 19hPetFood`,
    description: producto.descripcion,
    robots: { index: false, follow: false },
  };
}

export default function ProductoPage({ params }: PageProps) {
  const producto = getProductoBySlug(params.slug);

  if (!producto) {
    notFound();
  }

  const related = getRelatedProductos(producto.slug);

  const mainStyle = {
    "--accent":
      producto.especie === "gato" ? "var(--accent-cat)" : "var(--accent-dog)",
  } as CSSProperties;

  return (
    <main className="min-h-screen bg-cream" style={mainStyle}>
      <ProductHero producto={producto} />
      <ProductBenefits producto={producto} />
      <ProductNutritionTable producto={producto} />
      <ProductRelated productos={related} />
      <ProductCta especie={producto.especie} />
    </main>
  );
}
