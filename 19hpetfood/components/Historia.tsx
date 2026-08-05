"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import { historiaImages } from "@/lib/data/productos";
import { asset } from "@/lib/asset";

const beats = [
  {
    title: "Tototlán, Jalisco",
    body: "Todo empezó en Tototlán, Jalisco, con una promesa simple: alimentar bien cuesta lo justo.",
    image: historiaImages[0],
  },
  {
    title: "Nueve estados",
    body: "Hoy llevamos esa misma promesa a los tazones de perros y gatos en nueve estados del país, seleccionando cada ingrediente por calidad y desempeño, no solo por costo.",
    image: historiaImages[1],
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
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/5] min-h-[280px] w-full min-w-0 overflow-hidden rounded-sm shadow-md sm:aspect-[4/3] sm:min-h-[320px]"
              >
                <Image
                  src={asset(beat.image.src)}
                  alt={beat.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </motion.div>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-0"
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
            className="btn-interactive inline-flex min-h-12 items-center justify-center rounded-sm border border-brand-red/30 px-6 py-3 text-sm font-semibold text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          >
            Conoce nuestra historia completa
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
