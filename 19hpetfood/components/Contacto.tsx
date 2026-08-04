"use client";

import { FormEvent, useState } from "react";
import FadeIn from "@/components/FadeIn";

type TipoContacto = "consumidor" | "distribuidor";

export default function Contacto() {
  const [tipo, setTipo] = useState<TipoContacto>("consumidor");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contacto" className="bg-cream py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid gap-12 md:grid-cols-12">
          <FadeIn className="md:col-span-5">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-red sm:text-4xl md:text-5xl">
              ¿Tienes preguntas sobre tu alimento ideal?
            </h2>
            <p className="mt-5 font-body text-lg leading-relaxed text-[var(--foreground)]/80">
              Escríbenos como consumidor final o como distribuidor — te
              atendemos directo.
            </p>
          </FadeIn>

          <FadeIn className="md:col-span-7" delay={0.08}>
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              aria-label="Formulario de contacto"
            >
              <div
                className="inline-flex rounded-sm border border-brand-red/15 p-1"
                role="group"
                aria-label="Tipo de contacto"
              >
                {(
                  [
                    { value: "consumidor", label: "Consumidor final" },
                    { value: "distribuidor", label: "Distribuidor" },
                  ] as const
                ).map((option) => {
                  const active = tipo === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setTipo(option.value)}
                      aria-pressed={active}
                      className="min-h-11 rounded-sm px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                      style={
                        active
                          ? { backgroundColor: "var(--accent)", color: "#F7F3EC" }
                          : { color: "var(--foreground)" }
                      }
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nombre" id="nombre" name="nombre" required />
                <Field
                  label="Correo"
                  id="email"
                  name="email"
                  type="email"
                  required
                />
              </div>

              <Field label="Teléfono" id="telefono" name="telefono" type="tel" />

              {tipo === "distribuidor" && (
                <Field
                  label="Estado / zona de interés"
                  id="estado"
                  name="estado"
                />
              )}

              <div>
                <label
                  htmlFor="mensaje"
                  className="mb-2 block font-body text-sm font-medium text-[var(--foreground)]"
                >
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={4}
                  className="w-full rounded-sm border border-brand-red/20 bg-cream px-4 py-3 font-body text-base text-[var(--foreground)] outline-none transition focus:border-brand-red"
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center rounded-sm px-6 py-3 text-sm font-semibold text-cream transition-transform hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red"
                style={{ backgroundColor: "var(--accent)" }}
              >
                Enviar mensaje
              </button>

              {sent && (
                <p className="font-body text-sm text-brand-red" role="status">
                  Gracias. Este formulario es un prototipo — el envío real se
                  conectará después.
                </p>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  name,
  type = "text",
  required,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-body text-sm font-medium text-[var(--foreground)]"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-sm border border-brand-red/20 bg-cream px-4 py-3 font-body text-base text-[var(--foreground)] outline-none transition focus:border-brand-red"
      />
    </div>
  );
}
