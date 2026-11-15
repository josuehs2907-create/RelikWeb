// Las 5 tarjetas apuntan a rutas futuras. FUTURO: /resultados/trabajos, /equipo, /repuestos, /equipos.
const CARDS = [
  ["Trabajos realizados", "Conoce los vehículos que hemos atendido, los trabajos realizados y las soluciones que ofrecemos."],
  ["Nuestro equipo", "Conoce a nuestros técnicos, su experiencia y especialidades."],
  ["Almacén de repuestos", "Consulta repuestos disponibles, precios y stock en tiempo real."],
  ["Nuestros equipos del taller", "Contamos con tecnología y herramientas especializadas para ofrecer diagnósticos y servicios de precisión."],
  ["Reseñas de clientes", "Se mostrarán únicamente reseñas verificadas cuando se configure Google Business Profile."],
];

export default function Results() {
  return (
    <section id="resultados" className="bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs tracking-[0.3em] text-gold">RESULTADOS</p>
        <h2 className="mt-2 text-3xl font-bold md:text-5xl">Nuestro trabajo habla <span className="text-gold">por nosotros</span></h2>
        <p className="mt-3 max-w-2xl text-white/60">Resultados reales, un equipo especializado, repuestos disponibles y la confianza de nuestros clientes.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {CARDS.map(([t, d]) => (
            <article key={t} className="rounded-2xl border border-gold/30 bg-coal p-6 transition hover:-translate-y-1 hover:border-gold">
              <h3 className="text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm text-white/60">{d}</p>
              <span className="mt-3 inline-block text-xs text-white/40">Próximamente</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
