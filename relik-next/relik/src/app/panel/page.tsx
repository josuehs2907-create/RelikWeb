import { createClient } from "@/lib/supabase/server";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { count } = await supabase.from("appointments").select("*", { count: "exact", head: true }).eq("status", "pendiente");
  return (
    <>
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="text-white/60">Sesión: {user?.email}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-line bg-coal p-5"><div className="text-3xl font-bold text-gold">{count ?? 0}</div><div className="text-white/60">Citas pendientes de revisión</div></div>
      </div>
      <p className="mt-6 text-sm text-white/50">FUTURO: KPIs de órdenes activas, vehículos listos, stock bajo e ingresos del mes.</p>
    </>
  );
}
