import FadeIn from "@/components/FadeIn";

const items = [
  "Presencia en 9 estados de México",
  "Una familia, tres generaciones de experiencia en el campo",
  "Fórmulas específicas por etapa: cachorro, adulto, todas las edades",
];

export default function TrustBar() {
  return (
    <section
      id="confianza-bar"
      className="border-y border-brand-red/10 bg-cream py-12 md:py-14"
      aria-label="Indicadores de confianza"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 md:grid-cols-3 md:gap-6">
        {items.map((item, i) => (
          <FadeIn key={item} delay={i * 0.08}>
            <div className="flex gap-4 md:block md:border-l md:border-brand-red/15 md:pl-5">
              <span
                className="mt-1 h-2 w-2 shrink-0 rounded-full md:mb-4 md:mt-0"
                style={{ backgroundColor: "var(--accent)" }}
                aria-hidden
              />
              <p className="font-display text-base font-semibold leading-snug text-brand-red md:text-lg">
                {item}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
