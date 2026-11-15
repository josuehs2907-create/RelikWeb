import Link from "next/link";

const STEPS = [
  ["01", "RECEPCIÓN", "Recibimos tu vehículo y registramos sus condiciones iniciales."],
  ["02", "DIAGNÓSTICO", "Evaluamos el vehículo e identificamos los trabajos necesarios."],
  ["03", "MANTENIMIENTO", "Realizamos los trabajos autorizados y registramos cada avance."],
  ["04", "CONTROL Y ENTREGA", "Verificamos los resultados y te informamos cuando esté listo."],
] as const;

export default function Process() {
  return (
    <section id="proceso" className="bg-coal">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center">
        <p className="text-xs tracking-[0.3em] text-gold">NUESTRA FORMA DE TRABAJAR</p>
        <h2 className="mt-2 text-3xl font-bold md:text-5xl">Así cuidamos <span className="text-gold">tu vehículo</span></h2>
        <p className="mx-auto mt-3 max-w-xl text-white/60">Te acompañamos desde su recepción hasta el momento en que vuelve a tus manos.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {STEPS.map(([n, t, d]) => (
            <article key={n} className="rounded-2xl border border-gold/30 bg-panel p-6 transition hover:-translate-y-1 hover:border-gold">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-gold font-bold text-gold">{n}</div>
              <h3 className="mt-3 font-semibold tracking-widest">{t}</h3>
              <p className="mt-2 text-sm text-white/60">{d}</p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4 rounded-full border border-gold/40 bg-panel px-8 py-5">
          <b className="text-gold">Tu vehículo, siempre bajo control.</b>
          <Link href="/consulta" className="rounded-full border border-gold px-5 py-2 text-sm text-gold hover:bg-gold hover:text-ink">CONSULTAR ESTADO DE MI VEHÍCULO →</Link>
        </div>
      </div>
    </section>
  );
}
