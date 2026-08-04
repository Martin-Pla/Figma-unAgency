import { notFound } from "next/navigation";
import ProductHero from "@/components/ProductHero";
import ProductBenefits from "@/components/ProductBenefits";
import ProductNutritionTable from "@/components/ProductNutritionTable";
import { getProductoBySlug, productos } from "@/lib/data/productos";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return productos.map((p) => ({ slug: p.slug }));
}

export default function ProductoPage({ params }: PageProps) {
  const producto = getProductoBySlug(params.slug);

  // Scaffold: permite renderizar la plantilla aunque aún no haya datos
  if (productos.length > 0 && !producto) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <ProductHero slug={params.slug} />
      <ProductBenefits slug={params.slug} />
      <ProductNutritionTable slug={params.slug} />
      <section className="bg-cream py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          {/* Otros productos de la línea — scaffold */}
        </div>
      </section>
      <section className="bg-cream pb-24">
        <div className="mx-auto max-w-6xl px-6">
          {/* CTA final: encuentra un distribuidor */}
        </div>
      </section>
    </main>
  );
}
