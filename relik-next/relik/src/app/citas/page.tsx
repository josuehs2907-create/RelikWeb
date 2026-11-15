"use client";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/data/services";
import { sanitizePhone, sanitizePlate } from "@/lib/validators";

// Dos estados separados: formulario O confirmación (nunca ambos a la vez).
export default function Citas() {
  const [done, setDone] = useState<null | { name: string; date: string; time: string; service: string; plate: string }>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [f, setF] = useState({ name: "", phone: "", plate: "", serviceId: "express", date: "", time: "09:00" });
  const today = new Date().toISOString().slice(0, 10);

  async function enviar(e: React.FormEvent) {
    e.preventDefault(); setError(""); setLoading(true);
    const res = await fetch("/api/citas", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
    const json = await res.json(); setLoading(false);
    if (!res.ok) return setError(json.error ?? "Error");
    setDone({ name: f.name, date: f.date, time: f.time, plate: f.plate, service: services.find((s) => s.id === f.serviceId)?.name ?? "" });
  }

  if (done) return (
    <main className="mx-auto max-w-lg px-5 py-16 text-center">
      <h1 className="text-3xl font-bold">Cita <span className="text-gold">registrada</span></h1>
      <p className="mt-2">¡Gracias por confiar en RELIK!</p>
      <p>Te esperamos, <b className="text-gold">{done.name}</b>.</p>
      <div className="mt-6 grid grid-cols-2 gap-3 text-sm md:grid-cols-4">
        {[["Fecha", done.date.split("-").reverse().join("/")], ["Hora", done.time], ["Servicio", done.service], ["Placa", done.plate]].map(([k, v]) => <div key={k} className="rounded-xl border border-line bg-coal p-3"><small className="text-white/50">{k}</small><div className="font-semibold">{v}</div></div>)}
      </div>
      <p className="mt-6 text-sm text-white/60">Tu solicitud de cita ha sido registrada correctamente. El taller revisará tu solicitud y te confirmará la disponibilidad.</p>
      <Link href="/" className="mt-6 inline-block rounded-full bg-gold px-8 py-3 font-semibold text-ink">ENTENDIDO</Link>
    </main>
  );

  const input = "mt-1 w-full rounded-xl border border-line bg-coal px-4 py-3 outline-none focus:border-gold";
  return (
    <main className="mx-auto max-w-lg px-5 py-16">
      <Link href="/" className="text-sm text-white/60 hover:text-gold">← Inicio</Link>
      <h1 className="mt-4 text-2xl font-bold">AGENDA TU PRÓXIMA VISITA</h1>
      <p className="text-white/60">Completa tus datos para reservar una cita en nuestro taller.</p>
      <form onSubmit={enviar} className="mt-6 grid gap-4">
        <label>Nombre completo *<input required className={input} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></label>
        <label>Teléfono / WhatsApp * (9 dígitos)<input required inputMode="numeric" maxLength={9} className={input} value={f.phone} onChange={(e) => setF({ ...f, phone: sanitizePhone(e.target.value) })} /></label>
        <label>Placa del vehículo * (máx. 6)<input required maxLength={6} className={`${input} uppercase`} value={f.plate} onChange={(e) => setF({ ...f, plate: sanitizePlate(e.target.value) })} /></label>
        <label>Servicio *<select className={input} value={f.serviceId} onChange={(e) => setF({ ...f, serviceId: e.target.value })}>{services.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}</select></label>
        <div className="grid grid-cols-2 gap-3">
          <label>Fecha *<input required type="date" min={today} className={input} value={f.date} onChange={(e) => setF({ ...f, date: e.target.value })} /></label>
          <label>Hora *<input required type="time" className={input} value={f.time} onChange={(e) => setF({ ...f, time: e.target.value })} /></label>
        </div>
        {error && <p className="rounded-lg border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
        <button disabled={loading} className="rounded-full bg-gold py-3 font-semibold text-ink disabled:opacity-60">{loading ? "Enviando…" : "AGENDAR CITA"}</button>
        <Link href="/" className="rounded-full border border-line py-3 text-center">CANCELAR</Link>
      </form>
    </main>
  );
}
