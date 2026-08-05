"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Historia from "@/components/Historia";
import LifestyleStrip from "@/components/LifestyleStrip";
import CatalogoFinder from "@/components/CatalogoFinder";
import CalidadIngredientes from "@/components/CalidadIngredientes";
import DondeComprar from "@/components/DondeComprar";
import Confianza from "@/components/Confianza";
import Contacto from "@/components/Contacto";
import type { PetMode } from "@/lib/types";
import type { Especie } from "@/lib/data/productos";

export default function HomePage() {
  const [mode, setMode] = useState<PetMode>("perro");
  const [catalogEspecie, setCatalogEspecie] = useState<Especie | "todas">(
    "perro",
  );

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--accent",
      mode === "perro" ? "var(--accent-dog)" : "var(--accent-cat)",
    );
    setCatalogEspecie(mode);
  }, [mode]);

  return (
    <main className="min-h-screen bg-cream">
      <Hero mode={mode} onModeChange={setMode} />
      <TrustBar />
      <Historia />
      <LifestyleStrip />
      <CatalogoFinder key={catalogEspecie} initialEspecie={catalogEspecie} />
      <CalidadIngredientes />
      <DondeComprar />
      <Confianza />
      <Contacto />
    </main>
  );
}
