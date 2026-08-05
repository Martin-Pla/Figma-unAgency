import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { asset } from "@/lib/asset";

const momentos = [
  {
    src: "/assets/19hPetfood/Mi-Boob-02.jpg",
    alt: "Sirviendo Mi Boob en el hogar",
    label: "En el tazón",
  },
  {
    src: "/assets/19hPetfood/Silver-Kan-Premium-02.jpg",
    alt: "Pastor alemán con Silver Kan Premium",
    label: "Compañía diaria",
  },
  {
    src: "/assets/19hPetfood/Silver-Cat-03.jpg",
    alt: "Sirviendo Silver Cat a un gato",
    label: "Para gatos",
  },
];

export default function LifestyleStrip() {
  return (
    <section
      className="bg-cream py-16 md:py-20"
      aria-label="Momentos con 19hPetFood"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <FadeIn>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--foreground)]/45">
            Nutrición de campo
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-tight text-brand-red sm:text-4xl">
            Hecha para tu hogar.
          </h2>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {momentos.map((item, i) => (
            <FadeIn key={item.src} delay={i * 0.08} duration={0.5}>
              <figure className="group relative aspect-[3/4] min-h-[300px] overflow-hidden rounded-sm bg-[#1a1214] shadow-md">
                <Image
                  src={asset(item.src)}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-12">
                  <span className="font-display text-sm font-semibold text-cream">
                    {item.label}
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
