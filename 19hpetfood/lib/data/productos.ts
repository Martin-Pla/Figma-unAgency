export type Especie = "perro" | "gato";
export type Etapa = "cachorro" | "adulto" | "todas";

export type Producto = {
  slug: string;
  nombre: string;
  /** Título completo de la ficha de producto */
  titulo: string;
  especie: Especie;
  etapa: Etapa;
  lineaVida: string;
  beneficio: string;
  descripcion: string;
  beneficios: string[];
  /** Placeholder — reemplazar con datos reales del costal */
  nutricion: {
    proteina: string;
    grasa: string;
    fibra: string;
    humedad: string;
    cenizas: string;
  };
  imagen?: string;
  peso?: string;
};

// TODO: reemplazar con datos reales del costal
const nutricionPlaceholder = {
  proteina: "XX%",
  grasa: "XX%",
  fibra: "XX%",
  humedad: "XX%",
  cenizas: "XX%",
};

export const productos: Producto[] = [
  {
    slug: "silver-kan-cachorro",
    nombre: "Silver Kan Cachorro®",
    titulo: "Silver Kan Cachorro® — Nutrición para perros en crecimiento.",
    especie: "perro",
    etapa: "cachorro",
    lineaVida: "Perros en crecimiento",
    beneficio: "Huesos sanos y fuertes",
    descripcion:
      "Elaborado con cereales y productos de la más alta calidad para el desarrollo óptimo de tu mascota. Alimento balanceado para todo tipo de razas.",
    beneficios: [
      "Máxima energía y vitalidad",
      "Pelo suave y saludable",
      "Fácil y máxima digestión",
      "Huesos sanos y fuertes",
    ],
    nutricion: nutricionPlaceholder,
    imagen: "/productos/silver-kan-cachorro.png",
    peso: "20 Kg",
  },
  {
    slug: "silver-kan",
    nombre: "Silver Kan®",
    titulo: "Silver Kan® — Nutrición completa para perros adultos.",
    especie: "perro",
    etapa: "adulto",
    lineaVida: "Perros adultos",
    beneficio: "Proteínas, vitaminas y minerales para el desempeño diario",
    descripcion:
      "Fórmula balanceada con proteínas, vitaminas y minerales esenciales, pensada para el desempeño diario de tu perro adulto.",
    beneficios: [
      "Proteína de calidad para mantenimiento muscular",
      "Vitaminas y minerales para un sistema inmune fuerte",
      "Formulación pensada para el gasto energético diario de un perro adulto",
    ],
    nutricion: nutricionPlaceholder,
    // Imagen de costal pendiente
  },
  {
    slug: "silver-kan-premium",
    nombre: "Silver Kan Premium®",
    titulo: "Silver Kan Premium® — Nutrición equilibrada para perros adultos.",
    especie: "perro",
    etapa: "adulto",
    lineaVida: "Perros adultos",
    beneficio: "Prebióticos que mejoran la integridad intestinal",
    descripcion:
      "Alimento premium con prebióticos, vitaminas y minerales que apoyan su salud y energía. Para perros adultos de todas las razas y tamaños.",
    beneficios: [
      "Minerales orgánicos que favorecen la salud del pelo y la piel",
      "Antioxidantes para la salud de articulaciones y músculos",
      "Prebióticos que mejoran la integridad intestinal",
    ],
    nutricion: nutricionPlaceholder,
    imagen: "/productos/silver-kan-premium.png",
    peso: "20 Kg",
  },
  {
    slug: "kan-kan",
    nombre: "Kan Kan®",
    titulo: "Kan Kan® — Alimentación práctica para el día a día.",
    especie: "perro",
    etapa: "adulto",
    lineaVida: "Perros adultos",
    beneficio: "Máxima energía y vitalidad",
    descripcion:
      "Kan-Kan® está elaborado con cereales y materias primas de alta calidad, pensado para apoyar el desarrollo y bienestar de tu mascota. Alimento balanceado para todo tipo de razas.",
    beneficios: [
      "Máxima energía y vitalidad",
      "Piel sana y pelo brillante",
      "Fácil y óptima digestión",
      "Huesos sanos",
    ],
    nutricion: nutricionPlaceholder,
    imagen: "/productos/kan-kan.png",
    peso: "25 Kg",
  },
  {
    slug: "mi-boob",
    nombre: "Mi Boob®",
    titulo: "Mi Boob® — El alimento que pone feliz a tu mascota.",
    especie: "perro",
    etapa: "todas",
    lineaVida: "Todas las etapas",
    beneficio: "Alimento balanceado para todo tipo de razas",
    descripcion:
      "Elaborado con cereales y productos de la más alta calidad para el desarrollo óptimo de tu mascota. Alimento balanceado para todo tipo de razas.",
    beneficios: [
      "Alimento balanceado para todo tipo de razas",
      "Elaborado con cereales y productos de alta calidad",
      "Pensado para el desarrollo óptimo de tu mascota",
    ],
    nutricion: nutricionPlaceholder,
    imagen: "/productos/mi-boob.png",
    peso: "20 Kg",
  },
  {
    slug: "silver-cat",
    nombre: "Silver Cat®",
    titulo: "Silver Cat® — Nutrición completa para gatos adultos.",
    especie: "gato",
    etapa: "adulto",
    lineaVida: "Gatos adultos",
    beneficio: "Sabor a pollo y pescado",
    descripcion:
      "Nutrición confiable para tu gato; proteínas de origen animal, vitaminas y minerales que contribuyen a su salud, energía y una vida activa.",
    beneficios: [
      "Sabor a pollo y pescado",
      "Mejor digestión",
      "Balanceado para controlar la acidificación de la orina",
      "Fibras naturales que ayudan a un adecuado tránsito intestinal",
    ],
    nutricion: nutricionPlaceholder,
    imagen: "/productos/silver-cat.png",
    peso: "15 Kg",
  },
];

export function getProductoBySlug(slug: string): Producto | undefined {
  return productos.find((p) => p.slug === slug);
}

export function getProductosByEspecie(especie: Especie): Producto[] {
  return productos.filter((p) => p.especie === especie);
}

/** Otros productos de la misma especie (cross-sell), excluyendo el actual */
export function getRelatedProductos(slug: string, limit = 3): Producto[] {
  const current = getProductoBySlug(slug);
  if (!current) return [];
  return productos
    .filter((p) => p.especie === current.especie && p.slug !== slug)
    .slice(0, limit);
}
