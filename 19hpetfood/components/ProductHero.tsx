type ProductHeroProps = {
  slug?: string;
};

export default function ProductHero({ slug }: ProductHeroProps) {
  return (
    <section className="bg-cream py-20 md:py-28" data-product-slug={slug}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2">
        <div>
          {/* imagen de costal */}
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="font-display text-3xl font-bold text-brand-red md:text-5xl">
            {/* nombre + línea */}
          </h1>
          <p className="font-body text-lg leading-relaxed">
            {/* descripción */}
          </p>
          <div>{/* CTA */}</div>
        </div>
      </div>
    </section>
  );
}
