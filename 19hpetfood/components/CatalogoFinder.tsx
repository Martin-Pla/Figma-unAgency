"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";
import {
  productos,
  type Especie,
  type Etapa,
} from "@/lib/data/productos";

type CatalogoFinderProps = {
  initialEspecie?: Especie | "todas";
};

const especieFilters: Array<{ value: Especie | "todas"; label: string }> = [
  { value: "todas", label: "Todas" },
  { value: "perro", label: "Perro" },
  { value: "gato", label: "Gato" },
];

const etapaFilters: Array<{ value: Etapa | "todas"; label: string }> = [
  { value: "todas", label: "Todas las etapas" },
  { value: "cachorro", label: "Cachorro" },
  { value: "adulto", label: "Adulto" },
];

export default function CatalogoFinder({
  initialEspecie = "todas",
}: CatalogoFinderProps) {
  const [especie, setEspecie] = useState<Especie | "todas">(initialEspecie);
  const [etapa, setEtapa] = useState<Etapa | "todas">("todas");

  const filtered = useMemo(() => {
    return productos.filter((p) => {
      const matchEspecie = especie === "todas" || p.especie === especie;
      if (etapa === "todas") return matchEspecie;
      const matchEtapa = p.etapa === etapa || p.etapa === "todas";
      return matchEspecie && matchEtapa;
    });
  }, [especie, etapa]);

  return (
    <section id="productos" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <FadeIn>
          <h2 className="max-w-3xl font-display text-3xl font-extrabold tracking-tight text-brand-red sm:text-4xl md:text-5xl">
            Un alimento para cada etapa de su vida.
          </h2>
          <p className="mt-4 max-w-xl font-body text-lg text-[var(--foreground)]/80">
            Filtra por especie y edad para encontrar la fórmula ideal.
          </p>
        </FadeIn>

        <FadeIn className="mt-8 space-y-4" delay={0.05}>
          <div role="group" aria-label="Filtrar por especie" className="flex flex-wrap gap-2">
            {especieFilters.map((f) => (
              <FilterChip
                key={f.value}
                label={f.label}
                active={especie === f.value}
                onClick={() => setEspecie(f.value)}
              />
            ))}
          </div>
          <div role="group" aria-label="Filtrar por etapa" className="flex flex-wrap gap-2">
            {etapaFilters.map((f) => (
              <FilterChip
                key={f.value}
                label={f.label}
                active={etapa === f.value}
                onClick={() => setEtapa(f.value)}
              />
            ))}
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((producto, i) => (
            <FadeIn key={producto.slug} delay={Math.min(i * 0.05, 0.2)}>
              <Link
                href={`/producto/${producto.slug}`}
                className="group relative block overflow-hidden rounded-sm border border-brand-red/10 bg-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
              >
                <motion.article
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  className="h-full shadow-sm transition-shadow group-hover:shadow-md"
                >
                  <div
                    className="aspect-[4/3] w-full"
                    style={{
                      background:
                        producto.especie === "gato"
                          ? "linear-gradient(145deg, #D5E4E3 0%, #2A6F77 140%)"
                          : "linear-gradient(145deg, #E8D5C4 0%, #C9743A 140%)",
                    }}
                    role="img"
                    aria-label={`Imagen placeholder de ${producto.nombre}`}
                  />
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--foreground)]/50">
                      {producto.lineaVida}
                    </p>
                    <h3 className="mt-2 font-display text-xl font-bold text-brand-red">
                      {producto.nombre}
                    </h3>
                    {/* Beneficio visible en móvil; en desktop se revela al hover/focus */}
                    <p className="mt-3 font-body text-sm leading-relaxed text-[var(--foreground)]/75 md:max-h-0 md:overflow-hidden md:opacity-0 md:transition-all md:duration-300 md:group-hover:max-h-28 md:group-hover:opacity-100 md:group-focus-within:max-h-28 md:group-focus-within:opacity-100">
                      {producto.beneficio}
                    </p>
                  </div>
                </motion.article>
              </Link>
            </FadeIn>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 font-body text-[var(--foreground)]/70">
            No hay productos con estos filtros. Prueba otra combinación.
          </p>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="min-h-11 rounded-sm px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
      style={
        active
          ? { backgroundColor: "var(--accent)", color: "#F7F3EC" }
          : {
              backgroundColor: "transparent",
              color: "var(--foreground)",
              border: "1px solid rgba(196, 30, 58, 0.2)",
            }
      }
    >
      {label}
    </button>
  );
}
