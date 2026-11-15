# RELIK

Plataforma web para talleres automotrices. Base del proyecto: Next.js 15 + TypeScript + Tailwind CSS + Supabase.

> Estado: **base inicial**. Incluye la portada, consulta por placa, solicitud de citas, login de trabajadores y un panel mínimo. Los precios y servicios marcados **DEMO** son de demostración.

## Requisitos
- Node.js 20 o superior (LTS) y Git.
- Una cuenta gratuita en https://supabase.com

## Instalación (Windows)
1. Abre la carpeta del proyecto en VS Code y una terminal (Terminal → Nueva terminal).
2. `npm install`
3. Copia las variables: `copy .env.example .env.local`
4. En Supabase crea un proyecto. Copia **Project URL**, **anon key** y **service_role key** (Project Settings → API) en `.env.local`.
5. En Supabase → SQL Editor ejecuta `supabase/migrations/0001_init.sql` y luego `supabase/seed.sql`. Pega el id del taller en `DEFAULT_TENANT_ID`.
6. Crea un usuario en Authentication → Users y asócialo al taller con el `insert into memberships` del seed.
7. `npm run dev` y abre http://localhost:3000

## Probar
- `/` portada · `/consulta` (necesita una orden y un vehículo en la base) · `/citas` · `/login` → `/panel`.

## Subir a GitHub
```
git init
git add .
git commit -m "Base inicial de RELIK"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/relik.git
git push -u origin main
```
`.env.local` está en `.gitignore`: **nunca subas claves**.

## Pendiente
Foto de fondo en `public/images/hero.jpg`, logo oficial, datos de contacto en `src/config/site.ts`, y los módulos del panel (ver `docs/ARCHITECTURE.md`).
