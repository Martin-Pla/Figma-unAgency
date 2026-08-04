import FadeIn from "@/components/FadeIn";

const placeholders = [
  {
    quote: "Testimonio de distribuidor pendiente.",
    author: "Distribuidor · Por confirmar",
  },
  {
    quote: "Testimonio de veterinario pendiente.",
    author: "Veterinario · Por confirmar",
  },
  {
    quote: "Testimonio de cliente pendiente.",
    author: "Cliente · Por confirmar",
  },
];

export default function Confianza() {
  return (
    <section id="confianza" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <FadeIn>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-red sm:text-4xl">
            Confianza
          </h2>
          <p className="mt-4 max-w-xl font-body text-[var(--foreground)]/65">
            Placeholder — testimonios de distribuidores y veterinarios pendientes
            del cliente.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {placeholders.map((item, i) => (
            <FadeIn key={item.author} delay={i * 0.08}>
              <blockquote className="h-full border border-dashed border-brand-red/20 p-6">
                <p className="font-body text-base leading-relaxed text-[var(--foreground)]/70">
                  “{item.quote}”
                </p>
                <footer className="mt-6 font-display text-sm font-semibold text-brand-red">
                  {item.author}
                </footer>
              </blockquote>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
