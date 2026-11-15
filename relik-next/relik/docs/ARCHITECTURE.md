# Arquitectura de RELIK

## Stack
Next.js 15 (App Router) + TypeScript + Tailwind CSS 4 + Supabase (PostgreSQL, Auth, Storage) + Zod.

## Carpetas
- `src/app/` rutas: `/` (portada), `/consulta`, `/citas`, `/login`, `/panel/*` (protegido), `/api/*`.
- `src/components/landing/` secciones de la portada.
- `src/lib/supabase/` clientes: `client` (navegador), `server` (sesión + RLS), `admin` (service role, solo servidor).
- `src/lib/validators.ts` reglas de validación compartidas (placa de 6 caracteres, teléfono de 9 dígitos).
- `src/data/` y `src/config/` contenido inicial; luego pasa a la base de datos.
- `supabase/migrations/` esquema SQL y políticas RLS.

## Seguridad (principios)
1. La seguridad real está en la base de datos (RLS), no en ocultar botones.
2. El cliente nunca recibe datos personales ni costos: la consulta por placa pasa por `/api/consulta` y la función `public_order_status`.
3. `SUPABASE_SERVICE_ROLE_KEY` solo en el servidor; jamás en el navegador ni en GitHub.
4. Validar siempre en servidor (Zod), aunque el formulario ya valide.

## Hoja de ruta sugerida
1. Conectar Supabase y probar login, consulta y citas.
2. Servicios y categorías desde la base de datos + panel para editarlos.
3. Órdenes de trabajo (crear, estados, fotos con Supabase Storage).
4. Inventario: movimientos de stock sin doble descuento (`stock_deducted`).
5. Citas: confirmar / rechazar / reprogramar desde el panel.
6. Roles y permisos por módulo.
7. Almacén público, ventas y caja.
8. WhatsApp Business, facturación electrónica y suscripciones.
9. Pruebas automatizadas, rate limiting y despliegue (Vercel).
