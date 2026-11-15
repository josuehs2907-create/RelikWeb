const SPECS = ["Mantenimiento preventivo", "Diagnóstico electrónico", "Mecánica general", "Suspensión y dirección", "Sistemas de gas", "Reparación especializada"];
const VALUES = ["Transparencia", "Compromiso", "Responsabilidad", "Calidad", "Innovación"];

export default function About() {
  return (
    <section id="nosotros" className="bg-coal">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs tracking-[0.3em] text-gold">QUIÉNES SOMOS</p>
        <h2 className="mt-2 text-3xl font-bold md:text-5xl">Sobre <span className="text-gold">RELIK</span></h2>
        <p className="mt-3 text-lg">Comprometidos con el cuidado, rendimiento y seguridad de tu vehículo.</p>
        <p className="mt-2 max-w-3xl text-white/60">En RELIK trabajamos para ofrecer una experiencia automotriz basada en la confianza, la transparencia y la calidad, con una atención organizada y profesional apoyada en tecnología.</p>
        <h3 className="mt-10 text-2xl">Nuestra <span className="text-gold">especialidad</span></h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:grid-cols-3">{SPECS.map((s) => <div key={s} className="rounded-xl border border-gold/30 bg-panel p-4 text-center">{s}</div>)}</div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-gold/30 bg-panel p-6"><h3 className="text-xl">Nuestra <span className="text-gold">misión</span></h3><p className="mt-2 text-white/60">Brindar soluciones automotrices confiables mediante tecnología, conocimiento técnico y atención transparente, garantizando que cada vehículo reciba un servicio responsable y de calidad.</p></article>
          <article className="rounded-2xl border border-gold/30 bg-panel p-6"><h3 className="text-xl">Nuestra <span className="text-gold">visión</span></h3><p className="mt-2 text-white/60">Ser una empresa referente en servicios automotrices, reconocida por su innovación, transparencia, organización y compromiso con cada cliente.</p></article>
        </div>
        <h3 className="mt-10 text-2xl">Nuestros <span className="text-gold">valores</span></h3>
        <div className="mt-4 flex flex-wrap gap-3">{VALUES.map((v) => <span key={v} className="rounded-full border border-gold/40 px-4 py-2 text-sm">{v}</span>)}</div>
      </div>
    </section>
  );
}
