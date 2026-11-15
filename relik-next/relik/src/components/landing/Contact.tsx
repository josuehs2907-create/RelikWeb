import Link from "next/link";
import { SITE } from "@/config/site";

const digits = (s: string) => s.replace(/\D/g, "");

function Card({ title, sub, value, href }: { title: string; sub?: string; value?: string; href?: string }) {
  const body = (<><b>{title}</b>{sub && <small className="block text-white/50">{sub}</small>}<div className="mt-1 font-semibold text-gold">{value || <span className="italic text-white/40">Por completar</span>}</div></>);
  const cls = "rounded-2xl border border-gold/30 bg-panel p-5";
  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" className={`${cls} transition hover:-translate-y-1 hover:border-gold`}>{body}</a> : <div className={cls}>{body}</div>;
}

export default function Contact() {
  const s = SITE;
  return (
    <section id="contacto" className="bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs tracking-[0.3em] text-gold">CONTÁCTANOS</p>
        <h2 className="mt-2 text-3xl font-bold md:text-5xl">Estamos aquí para <span className="text-gold">ayudarte</span></h2>
        <p className="mt-3 max-w-2xl text-white/60">¿Necesitas información, deseas consultar sobre tu vehículo o programar una visita? Nuestro equipo está listo para atenderte.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <Card title="Teléfono" sub="Llámanos directamente" value={s.phone} href={digits(s.phone) ? `tel:${digits(s.phone)}` : undefined} />
          <Card title="WhatsApp" sub="Consultas y atención rápida" value={s.whatsapp} href={digits(s.whatsapp) ? `https://wa.me/${digits(s.whatsapp)}` : undefined} />
          <Card title="Correo electrónico" sub="Consultas, cotizaciones y solicitudes" value={s.email} href={s.email ? `mailto:${s.email}` : undefined} />
          <Card title="Ubicación" sub="Encuentra nuestro taller" value={s.address} href={s.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.address)}` : undefined} />
          <Card title="Horario de atención" value={s.hours.join(" · ")} />
          <Card title="Redes sociales" sub="Síguenos y conoce nuestro trabajo" value={Object.values(s.social).some(Boolean) ? "Disponibles" : ""} />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-5 rounded-2xl border border-gold/40 bg-coal px-6 py-5">
          <div><small className="text-white/50">Atención virtual</small><div className="text-3xl font-bold text-gold">24/7</div></div>
          <div className="flex-1"><b>¿Deseas programar una visita?</b><p className="text-sm text-white/60">Separa una cita y te atenderemos en el horario que prefieras.</p></div>
          <Link href="/citas" className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink">SEPARAR UNA CITA →</Link>
        </div>
      </div>
    </section>
  );
}
