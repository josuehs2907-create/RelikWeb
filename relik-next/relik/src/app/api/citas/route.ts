import { NextResponse } from "next/server";
import { appointmentSchema } from "@/lib/validators";
import { createAdminClient } from "@/lib/supabase/admin";

// Registra una SOLICITUD de cita (estado inicial: pendiente). No es una cita confirmada.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  const a = parsed.data;
  if (new Date(`${a.date}T${a.time}`) <= new Date()) return NextResponse.json({ error: "Elige una fecha y hora futuras." }, { status: 400 });

  const { error } = await createAdminClient().from("appointments").insert({
    tenant_id: process.env.DEFAULT_TENANT_ID, name: a.name, phone: a.phone, plate: a.plate,
    service_id: a.serviceId ?? null, date: a.date, time: a.time, status: "pendiente",
  });
  if (error?.code === "23505") return NextResponse.json({ error: "Ese horario ya no está disponible." }, { status: 409 });
  if (error) return NextResponse.json({ error: "No se pudo registrar la solicitud." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
