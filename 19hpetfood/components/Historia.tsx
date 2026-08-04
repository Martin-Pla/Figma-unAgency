"use client";

import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

const beats = [
  {
    title: "Tototlán, Jalisco",
    body: "Todo empezó en Tototlán, Jalisco, con una promesa simple: alimentar bien cuesta lo justo.",
    imageLabel: "Placeholder · campo en Tototlán",
  },
  {
    title: "Nueve estados",
    body: "Hoy llevamos esa misma promesa a los tazones de perros y gatos en nueve estados del país, seleccionando cada ingrediente por calidad y desempeño, no solo por costo.",
    imageLabel: "Placeholder · distribución regional",
  },
];

export default function Historia() {
  const reduce = useReducedMotion();

  return (
    <section id="historia" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <FadeIn>
          <h2 className="max-w-4xl font-display text-3xl font-extrabold leading-tight tracking-tight text-brand-red sm:text-4xl md:text-5xl">
            De una familia de 19 hermanos a más de 110 millones de mexicanos.
          </h2>
        </FadeIn>

        <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
          {beats.map((beat, index) => (
            <div
              key={beat.title}
              className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${
                index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/3] overflow-hidden rounded-sm"
                style={{
                  background:
                    index === 0
                      ? "linear-gradient(145deg, #E8D5C4 0%, #C41E3A 120%)"
                      : "linear-gradient(145deg, #D4C4B0 0%, #C9743A 130%)",
                }}
              >
                <span className="absolute bottom-4 left-4 text-xs uppercase tracking-[0.16em] text-cream/80">
                  {beat.imageLabel}
                </span>
              </motion.div>

              <motion.div
                initial={reduce ? false : { opacity: 0, x: index % 2 === 0 ? 28 : -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="mb-3 text-sm font-semibold uppercase tracking-[0.18em]"
                  style={{ color: "var(--accent)" }}
                >
                  {beat.title}
                </p>
                <p className="font-body text-lg leading-relaxed text-[var(--foreground)]/85 md:text-xl">
                  {beat.body}
                </p>
              </motion.div>
            </div>
          ))}
        </div>

        <FadeIn className="mt-14 md:mt-16" delay={0.1}>
          <a
            href="#calidad"
            className="inline-flex min-h-12 items-center justify-center rounded-sm border border-brand-red/30 px-6 py-3 text-sm font-semibold text-brand-red transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          >
            Conoce nuestra historia completa
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
