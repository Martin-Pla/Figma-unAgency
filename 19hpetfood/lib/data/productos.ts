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
    beneficio: "Proteína y minerales para un desarrollo óseo fuerte",
    descripcion:
      "Nutrición para la etapa de crecimiento con proteínas, vitaminas y minerales.",
    beneficios: [
      "Proteína y minerales para un desarrollo óseo fuerte",
      "Vitaminas esenciales para el crecimiento",
      "Fórmula pensada para cachorros activos",
    ],
    nutricion: nutricionPlaceholder,
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
  },
  {
    slug: "silver-kan-premium",
    nombre: "Silver Kan Premium®",
    titulo: "Silver Kan Premium® — Nutrición equilibrada para perros adultos.",
    especie: "perro",
    etapa: "adulto",
    lineaVida: "Perros adultos",
    beneficio: "Ingredientes seleccionados para pelaje y digestión",
    descripcion:
      "Fórmula con ingredientes seleccionados para una nutrición equilibrada.",
    beneficios: [
      "Ingredientes seleccionados para pelaje y digestión",
      "Nutrición equilibrada para perros adultos",
      "Fórmula premium de la línea Silver Kan",
    ],
    nutricion: nutricionPlaceholder,
  },
  {
    slug: "kan-kan",
    nombre: "Kan Kan®",
    titulo: "Kan Kan® — Alimentación práctica para el día a día.",
    especie: "perro",
    etapa: "adulto",
    lineaVida: "Perros adultos",
    beneficio: "Nutrientes esenciales para la rutina del día a día",
    descripcion:
      "Alimentación práctica para el día a día, con nutrientes esenciales.",
    beneficios: [
      "Nutrientes esenciales para la rutina del día a día",
      "Alimentación práctica y accesible",
      "Fórmula pensada para perros adultos activos",
    ],
    nutricion: nutricionPlaceholder,
  },
  {
    slug: "mi-boob",
    nombre: "Mi Boob®",
    titulo: "Mi Boob® — Nutrición versátil para todas las etapas.",
    especie: "perro",
    etapa: "todas",
    lineaVida: "Todas las etapas",
    beneficio: "Vitaminas y minerales para distintas razas y edades",
    descripcion:
      "Nutrición versátil con vitaminas y minerales para diferentes razas y edades.",
    beneficios: [
      "Vitaminas y minerales para distintas razas y edades",
      "Fórmula versátil para todas las etapas",
      "Nutrición adaptable a diferentes tamaños",
    ],
    nutricion: nutricionPlaceholder,
  },
  {
    slug: "silver-cat",
    nombre: "Silver Cat®",
    titulo: "Silver Cat® — Nutrición completa para gatos adultos.",
    especie: "gato",
    etapa: "adulto",
    lineaVida: "Gatos adultos",
    beneficio: "Nutrición completa para su actividad diaria",
    descripcion:
      "Nutrición completa con nutrientes esenciales para su alimentación diaria.",
    beneficios: [
      "Nutrición completa para su actividad diaria",
      "Nutrientes esenciales para gatos adultos",
      "Fórmula pensada para el bienestar diario",
    ],
    nutricion: nutricionPlaceholder,
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
