import type { Producto } from "@/lib/data/productos";
import FadeIn from "@/components/FadeIn";

type ProductNutritionTableProps = {
  producto: Producto;
};

export default function ProductNutritionTable({
  producto,
}: ProductNutritionTableProps) {
  // TODO: reemplazar con datos reales del costal
  const rows = [
    { nutriente: "Proteína cruda", valor: producto.nutricion.proteina },
    { nutriente: "Grasa cruda", valor: producto.nutricion.grasa },
    { nutriente: "Fibra cruda", valor: producto.nutricion.fibra },
    { nutriente: "Humedad", valor: producto.nutricion.humedad },
    { nutriente: "Cenizas", valor: producto.nutricion.cenizas },
  ];

  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <FadeIn>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-brand-red md:text-4xl">
            Información nutricional
          </h2>
          <p className="mt-3 font-body text-sm text-[var(--foreground)]/55">
            Valores placeholder — pendientes de reemplazar con datos reales del
            costal.
          </p>
        </FadeIn>

        <FadeIn className="mt-8 overflow-x-auto" delay={0.08}>
          <table className="w-full max-w-lg border-collapse font-body text-left">
            <thead>
              <tr className="border-b border-brand-red/25">
                <th className="py-3 pr-6 font-display text-sm font-semibold uppercase tracking-[0.12em] text-brand-red">
                  Nutriente
                </th>
                <th className="py-3 font-display text-sm font-semibold uppercase tracking-[0.12em] text-brand-red">
                  %
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.nutriente} className="border-b border-brand-red/10">
                  <td className="py-4 pr-6 text-base text-[var(--foreground)]/85">
                    {row.nutriente}
                  </td>
                  <td className="py-4 font-display text-base font-semibold text-brand-red">
                    {row.valor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeIn>
      </div>
    </section>
  );
}
