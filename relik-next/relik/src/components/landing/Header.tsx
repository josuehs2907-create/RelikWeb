"use client";
import Link from "next/link";
import { useState } from "react";

const NAV = [["inicio", "Inicio"], ["servicios", "Servicios"], ["proceso", "Nuestro proceso"], ["resultados", "Resultados"], ["nosotros", "Nosotros"], ["contacto", "Contacto"]] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-gold/20 bg-ink/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3">
        <a href="#inicio" className="text-lg font-extrabold tracking-[0.3em]">RELIK</a>
        <nav className="mx-auto hidden gap-6 text-sm md:flex">
          {NAV.map(([id, label]) => <a key={id} href={`#${id}`} className="transition hover:text-gold">{label}</a>)}
        </nav>
        <Link href="/login" className="ml-auto rounded-full border border-gold px-4 py-2 text-xs font-semibold text-gold transition hover:bg-gold hover:text-ink md:ml-0">LOGIN TRABAJADOR</Link>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menú">☰</button>
      </div>
      {open && (
        <nav className="flex flex-col gap-3 border-t border-line px-5 py-4 md:hidden">
          {NAV.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
        </nav>
      )}
    </header>
  );
}
