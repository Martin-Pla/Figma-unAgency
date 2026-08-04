type ProductBenefitsProps = {
  slug?: string;
};

export default function ProductBenefits({ slug }: ProductBenefitsProps) {
  return (
    <section className="bg-cream py-16 md:py-24" data-product-slug={slug}>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl font-bold text-brand-red md:text-4xl">
          {/* título beneficios */}
        </h2>
        <ul className="mt-8 space-y-4 font-body text-lg">
          {/* lista de beneficios */}
        </ul>
      </div>
    </section>
  );
}
