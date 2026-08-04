import FadeIn from "@/components/FadeIn";

const facts = [
  {
    label: "Proteína",
    detail: "de calidad, pensada para cada etapa",
  },
  {
    label: "Vitaminas",
    detail: "y minerales esenciales en proporción",
  },
  {
    label: "Desempeño",
    detail: "real, no solo promesas de empaque",
  },
];

export default function CalidadIngredientes() {
  return (
    <section id="calidad" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <FadeIn className="md:col-span-5">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-red sm:text-4xl md:text-5xl">
              Calidad que se puede medir, no solo prometer.
            </h2>
          </FadeIn>

          <FadeIn className="md:col-span-7" delay={0.08}>
            <p className="font-body text-lg leading-relaxed text-[var(--foreground)]/85 md:text-xl">
              Cada fórmula se desarrolla con base en el desempeño real: proteína
              de calidad, vitaminas y minerales esenciales, en proporciones
              pensadas para cada etapa de vida. Así garantizamos mayor
              producción y bienestar a un costo accesible.
            </p>

            <ul className="mt-10 space-y-6 border-t border-brand-red/15 pt-8">
              {facts.map((fact) => (
                <li
                  key={fact.label}
                  className="flex flex-col gap-1 border-b border-brand-red/10 pb-6 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6"
                >
                  <span className="font-display text-2xl font-bold text-brand-red sm:min-w-[8rem]">
                    {fact.label}
                  </span>
                  <span className="font-body text-base text-[var(--foreground)]/75">
                    {fact.detail}
                  </span>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
