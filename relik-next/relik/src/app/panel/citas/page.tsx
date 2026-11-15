import { createClient } from "@/lib/supabase/server";

// RLS garantiza que solo se vean las citas del taller del usuario.
// FUTURO: acciones confirmar / rechazar / proponer otro horario (Server Actions).
export default async function Citas() {
  const supabase = await createClient();
  const { data } = await supabase.from("appointments").select("*").order("date", { ascending: true });
  return (
    <>
      <h1 className="text-2xl font-bold">Citas</h1>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-coal">
        <table className="w-full text-left text-sm">
          <thead className="text-white/50"><tr>{["Cliente", "Teléfono", "Placa", "Fecha", "Hora", "Estado"].map((h) => <th key={h} className="p-3">{h}</th>)}</tr></thead>
          <tbody>{(data ?? []).map((a) => <tr key={a.id} className="border-t border-line"><td className="p-3">{a.name}</td><td>{a.phone}</td><td>{a.plate}</td><td>{a.date}</td><td>{String(a.time).slice(0, 5)}</td><td>{a.status}</td></tr>)}
            {!data?.length && <tr><td className="p-3 text-white/50" colSpan={6}>Sin solicitudes</td></tr>}</tbody>
        </table>
      </div>
    </>
  );
}
