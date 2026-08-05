import Link from "next/link";

const socials = [
  { label: "Instagram", href: "#redes" },
  { label: "Facebook", href: "#redes" },
  { label: "WhatsApp", href: "#redes" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-brand-red/10 bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-3 md:gap-8 md:py-16">
        <div>
          <p className="font-display text-xl font-extrabold text-brand-red">
            19hPetFood
          </p>
          <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-[var(--foreground)]/65">
            Nutrición de campo, hecha para tu hogar. Forrajera Los 19 Hermanos ·
            Tototlán, Jalisco.
          </p>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-brand-red">
            Contacto
          </p>
          <ul className="mt-4 space-y-2 font-body text-sm text-[var(--foreground)]/75">
            <li>
              <a
                href="tel:+523919160067"
                className="transition-colors hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
              >
                391 91 60067
              </a>
            </li>
            <li>
              <a
                href="tel:+523919160449"
                className="transition-colors hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
              >
                391 91 60449
              </a>
            </li>
            <li className="pt-1 leading-relaxed">
              Km. 1.5 carretera Tototlán–Guadalajara
            </li>
            <li>
              <Link
                href="/#contacto"
                className="font-medium text-brand-red transition-colors hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
              >
                Escribirnos
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-brand-red">
            Redes
          </p>
          <ul className="mt-4 flex flex-wrap gap-3">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="btn-interactive inline-flex min-h-11 items-center rounded-sm border border-brand-red/15 px-4 py-2 font-body text-sm text-[var(--foreground)]/80"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-red/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 font-body text-xs text-[var(--foreground)]/55 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} 19hPetFood · Forrajera Los 19 Hermanos
          </p>
          <a
            href="#aviso-privacidad"
            className="transition-colors hover:text-brand-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
          >
            Aviso de privacidad
          </a>
        </div>
      </div>
    </footer>
  );
}
