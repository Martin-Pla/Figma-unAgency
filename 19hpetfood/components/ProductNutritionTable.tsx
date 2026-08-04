type ProductNutritionTableProps = {
  slug?: string;
};

export default function ProductNutritionTable({
  slug,
}: ProductNutritionTableProps) {
  // TODO: reemplazar con datos reales del costal
  return (
    <section className="bg-cream py-16 md:py-24" data-product-slug={slug}>
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl font-bold text-brand-red md:text-4xl">
          {/* título tabla nutricional */}
        </h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full max-w-md border-collapse font-body text-left">
            <thead>
              <tr className="border-b border-brand-red/20">
                <th className="py-3 pr-4 font-display font-semibold">Nutriente</th>
                <th className="py-3 font-display font-semibold">%</th>
              </tr>
            </thead>
            <tbody>
              {/* filas placeholder */}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
