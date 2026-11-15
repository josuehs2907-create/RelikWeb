"use client";
import Link from "next/link";
import { useState } from "react";
import { sanitizePlate } from "@/lib/validators";

type Order = { plate: string; brand: string; model: string; year: number; km: number; order_code: string; status: number; eta: string | null; service: string; labor: number | null; parts: { name: string; qty: number; unit_price: number }[] };
const STAGES = ["Vehículo recibido", "Diagnóstico", "Esperando autorización", "Mantenimiento en proceso", "Control de calidad", "Servicio finalizado", "Listo para recoger"];
const money = (n: number) => "S/ " + n.toLocaleString("es-PE", { minimumFractionDigits: 2 });

export default function Consulta() {
  const [plate, setPlate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<Order | null>(null);

  async function buscar(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setOrder(null);
    if (plate.length !== 6) return setError("La placa debe tener exactamente 6 letras o números.");
    setLoading(true);
    const res = await fetch("/api/consulta", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ plate }) });
    const json = await res.json();
    setLoading(false);
    if (!res.ok) return setError(json.error ?? "Error");
    setOrder(json.order);
  }

  const total = order ? (order.labor ?? 0) + order.parts.reduce((a, p) => a + p.qty * p.unit_price, 0) : 0;

  return (
    <main className="mx-auto max-w-3xl px-5 py-16">
      <Link href="/" className="text-sm text-white/60 hover:text-gold">← Inicio</Link>
      <h1 className="mt-4 text-3xl font-bold">Consulta tu <span className="text-gold">vehículo</span></h1>
      <form onSubmit={buscar} className="mt-6 flex gap-3">
        <input value={plate} onChange={(e) => setPlate(sanitizePlate(e.target.value))} maxLength={6} placeholder="ABC123" autoComplete="off"
          className="w-full rounded-xl border border-line bg-coal px-4 py-3 text-center font-mono text-2xl tracking-[0.3em] outline-none focus:border-gold" />
        <button disabled={loading} className="rounded-xl bg-gold px-6 font-semibold text-ink disabled:opacity-60">{loading ? "Buscando…" : "BUSCAR"}</button>
      </form>
      {error && <p className="mt-3 rounded-lg border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}

      {order && (
        <div className="mt-8 grid gap-4">
          <section className="rounded-2xl border border-line bg-coal p-5">
            <div className="text-xs text-white/50">PLACA</div><div className="font-mono text-2xl tracking-widest">{order.plate}</div>
            <p className="text-white/60">{order.brand} {order.model} · {order.year} · {order.km?.toLocaleString("es-PE")} km</p>
          </section>
          <section className="rounded-2xl border border-line bg-coal p-5">
            <h2 className="font-semibold">Estado actual: <span className="text-gold">{STAGES[order.status]}</span></h2>
            <ol className="mt-4 grid gap-2 text-sm">{STAGES.map((s, i) => <li key={s} className={i < order.status ? "text-gold" : i === order.status ? "font-bold text-white" : "text-white/40"}>{i < order.status ? "✓" : i === order.status ? "●" : "○"} {s}</li>)}</ol>
          </section>
          <section className="rounded-2xl border border-line bg-coal p-5">
            <h2 className="font-semibold">Trabajos y repuestos</h2>
            <table className="mt-3 w-full text-sm"><tbody>
              {order.parts.map((p) => <tr key={p.name} className="border-b border-line"><td className="py-2">{p.name}</td><td>{p.qty}</td><td className="text-right">{money(p.qty * p.unit_price)}</td></tr>)}
              {order.labor ? <tr className="border-b border-line"><td className="py-2">Mano de obra · {order.service}</td><td>1</td><td className="text-right">{money(order.labor)}</td></tr> : null}
              <tr className="font-bold text-gold"><td className="py-2" colSpan={2}>Total estimado</td><td className="text-right">{money(total)}</td></tr>
            </tbody></table>
          </section>
          <p className="rounded-xl border-l-4 border-gold bg-coal p-4 text-sm text-white/70"><b className="text-gold">IMPORTANTE:</b> El precio real y actualizado será brindado en el taller de manera presencial, luego de la verificación y evaluación completa del vehículo.</p>
        </div>
      )}
    </main>
  );
}
