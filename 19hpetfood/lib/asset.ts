/** Prefijo del prototipo en el dominio de The unAgency */
export const BASE_PATH = "/19hpetfood.com";

/**
 * Prefija rutas de assets del prototipo.
 * next/image con `unoptimized` + export estático no aplica basePath solo,
 * por eso siempre anteponemos /19hpetfood.com.
 */
export function asset(path: string): string {
  if (!path) return path;
  if (/^https?:\/\//.test(path)) return path;
  if (path.startsWith(BASE_PATH)) return path;
  return `${BASE_PATH}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Carpeta de imágenes 19hPetFood (dentro de public del prototipo) */
export const ASSETS = "/assets/19hPetfood";
