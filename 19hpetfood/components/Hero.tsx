"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type HeroProps = {
  mode?: "perro" | "gato";
  onModeChange?: (mode: "perro" | "gato") => void;
};

const modeCopy = {
  perro: {
    lineLabel: "Línea para perros",
    imageLabel: "Placeholder · perro en campo mexicano",
  },
  gato: {
    lineLabel: "Línea para gatos",
    imageLabel: "Placeholder · gato en hogar",
  },
} as const;

export default function Hero({ mode = "perro", onModeChange }: HeroProps) {
  const reduce = useReducedMotion();
  const accent = mode === "perro" ? "#C9743A" : "#2A6F77";
  const copy = modeCopy[mode];

  return (
    <section
      id="inicio"
      className="relative isolate min-h-[100svh] overflow-hidden bg-cream"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          className="absolute inset-0 -z-10"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                mode === "perro"
                  ? "linear-gradient(135deg, #F7F3EC 0%, #E8D5C4 42%, #C9743A 160%)"
                  : "linear-gradient(135deg, #F7F3EC 0%, #C5D5D4 42%, #2A6F77 160%)",
            }}
          />
          <div
            className="absolute inset-y-0 right-0 w-full md:w-[55%]"
            style={{
              background:
                mode === "perro"
                  ? "radial-gradient(ellipse at 70% 40%, rgba(201,116,58,0.45) 0%, transparent 65%)"
                  : "radial-gradient(ellipse at 70% 40%, rgba(42,111,119,0.45) 0%, transparent 65%)",
            }}
          />
          <div className="absolute bottom-8 right-6 hidden max-w-[14rem] text-right text-xs uppercase tracking-[0.18em] text-[var(--foreground)]/40 md:block">
            {copy.imageLabel}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 sm:px-6 md:justify-center md:pb-24 md:pt-32">
        <div className="max-w-2xl">
          <div
            className="mb-6 inline-flex rounded-sm border border-[var(--foreground)]/10 bg-cream/70 p-1 backdrop-blur-sm"
            role="group"
            aria-label="Elegir modo mascota"
          >
            {(["perro", "gato"] as const).map((option) => {
              const active = mode === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => onModeChange?.(option)}
                  aria-pressed={active}
                  className="relative min-h-11 min-w-[5.5rem] rounded-sm px-4 py-2.5 text-sm font-medium capitalize transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                  style={{ color: active ? "#F7F3EC" : "var(--foreground)" }}
                >
                  {active && (
                    <motion.span
                      layoutId="pet-mode-pill"
                      className="absolute inset-0 rounded-sm"
                      style={{ backgroundColor: accent }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{option === "perro" ? "Perro" : "Gato"}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={`label-${mode}`}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mb-3 text-sm font-medium uppercase tracking-[0.2em]"
              style={{ color: accent }}
            >
              {copy.lineLabel}
            </motion.p>
          </AnimatePresence>

          <h1 className="font-display text-[2.35rem] font-extrabold leading-[1.05] tracking-tight text-brand-red sm:text-5xl md:text-6xl lg:text-7xl">
            Nutrición de campo, hecha para tu hogar.
          </h1>

          <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-[var(--foreground)]/80 sm:text-lg">
            Alimento balanceado para perros y gatos, elaborado en Tototlán,
            Jalisco, con una fórmula para cada etapa de su vida.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href="#productos"
              className="btn-interactive inline-flex min-h-12 items-center justify-center rounded-sm px-6 py-3 text-center text-sm font-semibold text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
              style={{ backgroundColor: accent }}
            >
              Descubre tu alimento ideal
            </a>
            <a
              href="#donde-comprar"
              className="btn-interactive inline-flex min-h-12 items-center justify-center rounded-sm border border-brand-red/30 bg-cream/60 px-6 py-3 text-center text-sm font-semibold text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
            >
              Encuentra un distribuidor
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
