import { NextResponse } from "next/server";
import { plateSchema } from "@/lib/validators";
import { createAdminClient } from "@/lib/supabase/admin";

// Consulta pública por placa. Devuelve SOLO datos limitados (sin nombre, DNI ni teléfono del cliente).
// TODO: limitar intentos por IP (rate limiting) antes de publicar.
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = plateSchema.safeParse(body?.plate ?? "");
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });

  const { data, error } = await createAdminClient().rpc("public_order_status", {
    p_tenant: process.env.DEFAULT_TENANT_ID,
    p_plate: parsed.data,
  });
  if (error) return NextResponse.json({ error: "No se pudo realizar la consulta." }, { status: 500 });
  if (!data) return NextResponse.json({ error: "No encontramos esa placa en este taller." }, { status: 404 });
  return NextResponse.json({ order: data });
}
