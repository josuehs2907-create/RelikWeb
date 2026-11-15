import { z } from "zod";

// Placa: exactamente 6 letras o números, en mayúsculas. Se valida igual en cliente y servidor.
export const plateSchema = z
  .string()
  .transform((s) => s.toUpperCase().replace(/[^A-Z0-9]/g, ""))
  .pipe(z.string().length(6, "La placa debe tener exactamente 6 letras o números."));

export const appointmentSchema = z.object({
  name: z.string().trim().min(3, "Escribe tu nombre completo."),
  phone: z.string().regex(/^\d{9}$/, "El teléfono debe tener exactamente 9 dígitos."),
  plate: plateSchema,
  serviceId: z.string().min(1).nullable().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida."),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Hora inválida."),
});

export const sanitizePlate = (v: string) => v.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
export const sanitizePhone = (v: string) => v.replace(/\D/g, "").slice(0, 9);
