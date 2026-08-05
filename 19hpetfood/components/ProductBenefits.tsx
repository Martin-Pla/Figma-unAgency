import type { Producto } from "@/lib/data/productos";
import FadeIn from "@/components/FadeIn";

type ProductBenefitsProps = {
  producto: Producto;
};

export default function ProductBenefits({ producto }: ProductBenefitsProps) {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <FadeIn>
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-brand-red md:text-4xl">
            Beneficios
          </h2>
        </FadeIn>

        <ul className="mt-10 space-y-0 border-t border-brand-red/15">
          {producto.beneficios.map((beneficio, i) => (
            <FadeIn key={beneficio} delay={i * 0.06}>
              <li className="flex gap-4 border-b border-brand-red/10 py-5 md:gap-6 md:py-6">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      producto.especie === "gato"
                        ? "var(--accent-cat)"
                        : "var(--accent-dog)",
                  }}
                  aria-hidden
                />
                <p className="font-body text-lg leading-relaxed text-[var(--foreground)]/85 md:text-xl">
                  {beneficio}
                </p>
              </li>
            </FadeIn>
          ))}
        </ul>
      </div>
    </section>
  );
}
