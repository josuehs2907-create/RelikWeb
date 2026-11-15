"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

// Acceso de trabajadores con Supabase Auth (correo + contraseña).
// FUTURO: "ID de colaborador" -> resolver el correo asociado desde la tabla de perfiles.
export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function entrar(e: React.FormEvent) {
    e.preventDefault(); setError(""); setLoading(true);
    const { error } = await createClient().auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError("Usuario o contraseña incorrectos.");
    router.push("/panel"); router.refresh();
  }

  const input = "mt-1 w-full rounded-xl border border-line bg-black px-4 py-3 outline-none focus:border-gold";
  return (
    <main className="grid min-h-screen place-items-center px-5">
      <form onSubmit={entrar} className="w-full max-w-sm rounded-2xl border border-gold/40 bg-coal p-7 shadow-2xl">
        <div className="text-center text-3xl font-extrabold tracking-[0.3em]">RELIK</div>
        <p className="mt-4 text-center text-sm">INGRESA TU <b className="text-gold">ID DE COLABORADOR</b></p>
        <label className="mt-5 block text-sm text-white/60">Usuario (correo)<input required type="email" autoComplete="username" className={input} value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label className="mt-3 block text-sm text-white/60">Contraseña
          <span className="relative block"><input required type={show ? "text" : "password"} autoComplete="current-password" className={input} value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-4 text-xs text-white/60" aria-label="Mostrar u ocultar contraseña">{show ? "Ocultar" : "Ver"}</button></span>
        </label>
        {error && <p className="mt-3 rounded-lg border border-red-400/40 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
        <button disabled={loading} className="mt-5 w-full rounded-full bg-gold py-3 font-semibold text-ink disabled:opacity-60">{loading ? "Verificando…" : "INGRESAR AL SISTEMA"}</button>
        <Link href="/" className="mt-3 block text-center text-sm text-white/60 hover:text-gold">← Volver al inicio</Link>
      </form>
    </main>
  );
}
