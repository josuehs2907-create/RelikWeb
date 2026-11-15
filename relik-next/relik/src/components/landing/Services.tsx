"use client";
import Link from "next/link";
import { useState } from "react";
import { categories, services, type Service } from "@/data/services";

const money = (n: number) => "S/ " + n.toLocaleString("es-PE", { minimumFractionDigits: 2 });

export default function Services() {
  const [cat, setCat] = useState<string | null>(null);
  const [open, setOpen] = useState<Service | null>(null);
  const current = categories.find((c) => c.id === cat);
  const list = services.filter((s) => s.categoryId === cat);
  const featured = services.find((s) => s.featured);

  return (
    <section id="servicios" className="bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <p className="text-xs tracking-[0.3em] text-gold">NUESTROS SERVICIOS</p>
        <h2 className="mt-2 text-3xl font-bold md:text-5xl">SERVICIOS DISEÑADOS PARA <span className="text-gold">TU VEHÍCULO</span></h2>
        <p className="mt-3 max-w-2xl text-white/60">Soluciones integrales de mantenimiento, diagnóstico y reparación, con la experiencia y tecnología de RELIK.</p>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          <Chip active={!cat} onClick={() => setCat(null)}>Todos los servicios</Chip>
          {categories.map((c) => <Chip key={c.id} active={cat === c.id} onClick={() => setCat(c.id)}>{c.shortName}</Chip>)}
        </div>

        {!cat ? (
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {categories.filter((c) => c.id !== "otros").map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)} className="rounded-2xl border border-line bg-coal p-5 text-left transition hover:-translate-y-1 hover:border-gold">
                <b>{c.title}</b>
                <p className="mt-1 text-sm text-white/60">{c.description}</p>
              </button>
            ))}
            {featured && (
              <aside className="rounded-2xl border border-gold/50 bg-panel p-5 md:col-span-4 md:col-start-1">
                <span className="text-xs text-gold">★ SERVICIO DESTACADO {featured.demo && "· DEMO"}</span>
                <h3 className="mt-1 text-2xl font-semibold">{featured.name}</h3>
                <p className="text-white/60">{featured.description}</p>
                <button onClick={() => setOpen(featured)} className="mt-4 rounded-full border border-gold px-5 py-2 text-sm text-gold hover:bg-gold hover:text-ink">VER DETALLES</button>
              </aside>
            )}
          </div>
        ) : (
          <div className="mt-6">
            <button onClick={() => setCat(null)} className="text-sm text-white/60 hover:text-gold">← Todas las categorías</button>
            <h3 className="mt-2 text-2xl font-semibold">{current?.name}</h3>
            {list.length === 0 && <p className="mt-4 text-white/60">Aún no hay servicios registrados en esta categoría.</p>}
            <div className="mt-4 grid gap-4 md:grid-cols-3">
              {list.map((s) => (
                <article key={s.id} className="flex flex-col gap-2 rounded-2xl border border-line bg-coal p-5">
                  <h4 className="text-lg font-semibold">{s.name} {s.demo && <span className="ml-1 rounded-full bg-gold px-2 text-[10px] font-bold text-ink">DEMO</span>}</h4>
                  <p className="text-sm text-white/60">{s.description}</p>
                  {s.price != null && <p className="text-2xl font-bold text-gold"><small className="text-xs font-normal text-white/50">Desde </small>{money(s.price)}</p>}
                  <button onClick={() => setOpen(s)} className="mt-auto rounded-full bg-gold px-4 py-2 text-xs font-semibold text-ink">VER DETALLES</button>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/70 p-4" onClick={() => setOpen(null)}>
          <div className="max-h-[90vh] w-full max-w-xl overflow-auto rounded-2xl border border-gold/50 bg-coal p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-semibold">{open.name}</h3>
            <p className="mt-1 text-white/60">{open.description}</p>
            <h4 className="mt-4 text-gold">✓ Resumen de lo que se realizará</h4>
            <ul className="mt-2 grid gap-1 text-sm md:grid-cols-2">{open.tasks.map((t) => <li key={t}>✓ {t}</li>)}</ul>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-gold/20 pt-4">
              <div>{open.price != null ? <><small className="text-white/50">Desde</small><div className="text-3xl font-bold text-gold">{money(open.price)}</div><small className="text-white/50">{open.demo ? "Precio referencial (DEMO)" : "Precio referencial"}</small></> : <small className="text-white/50">Precio por confirmar con el taller</small>}</div>
              <div className="flex gap-2">
                <button onClick={() => setOpen(null)} className="rounded-full border border-line px-4 py-2 text-sm">← Volver</button>
                <Link href={`/citas?servicio=${open.id}`} className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink">SEPARAR CITA</Link>
              </div>
            </div>
            <p className="mt-3 text-xs text-white/40">El precio real será brindado en el taller luego de la evaluación del vehículo.</p>
          </div>
        </div>
      )}
    </section>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} className={`whitespace-nowrap rounded-xl border px-4 py-2 text-sm transition ${active ? "border-transparent bg-gold font-bold text-ink" : "border-line bg-coal hover:border-gold"}`}>{children}</button>;
}
