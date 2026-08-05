import FadeIn from "@/components/FadeIn";

const estados = [
  "Jalisco",
  "Michoacán",
  "Aguascalientes",
  "Guanajuato",
  "Colima",
  "Guerrero",
  "Zacatecas",
  "San Luis Potosí",
  "Estado de México",
];

export default function DondeComprar() {
  return (
    <section id="donde-comprar" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <FadeIn>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-red sm:text-4xl md:text-5xl">
            Encuéntranos cerca de ti.
          </h2>
          <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-[var(--foreground)]/85">
            Distribuimos en Jalisco, Michoacán, Aguascalientes, Guanajuato,
            Colima, Guerrero, Zacatecas, San Luis Potosí y Estado de México.
          </p>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.08}>
          <ul className="flex flex-wrap gap-2" aria-label="Estados con cobertura">
            {estados.map((estado) => (
              <li
                key={estado}
                className="rounded-sm border border-brand-red/15 px-3 py-2 font-body text-sm text-[var(--foreground)]/80"
              >
                {estado}
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn className="mt-10" delay={0.12}>
          <a
            href="#contacto"
            className="btn-interactive inline-flex min-h-12 items-center justify-center rounded-sm px-6 py-3 text-sm font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            style={{ backgroundColor: "var(--accent)" }}
          >
            Buscar distribuidor por estado
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
