import Link from "next/link";

// Fondo: coloca tu fotografía en public/images/hero.jpg (si no existe, se ve el degradado).
export default function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-screen items-end justify-center bg-[url('/images/hero.jpg')] bg-cover bg-center px-5 pb-20 pt-32 text-center">
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
      <div className="relative max-w-3xl">
        <h1 className="text-4xl font-semibold md:text-6xl">Tu vehículo <span className="italic text-gold">merece más.</span></h1>
        <p className="mt-3 text-lg text-white/90 md:text-xl">Tecnología, precisión y confianza en cada servicio.</p>
        <p className="mt-4 text-xs tracking-[0.3em] text-gold">TODO BAJO CONTROL. CADA PROCESO EN ORDEN.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/consulta" className="rounded-full border border-gold bg-ink/80 px-7 py-3 text-sm font-semibold transition hover:bg-gold hover:text-ink">VER ESTADO DE MI AUTO →</Link>
          <Link href="/citas" className="rounded-full bg-gold px-7 py-3 text-sm font-semibold text-ink transition hover:brightness-110">SEPARAR CITA →</Link>
        </div>
      </div>
    </section>
  );
}
