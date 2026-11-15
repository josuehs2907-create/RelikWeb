export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-black px-5 py-10 text-center text-sm text-white/50">
      <div className="font-extrabold tracking-[0.3em] text-white">RELIK</div>
      <p className="mt-1">Todo bajo control. Cada proceso en orden.</p>
      <p className="mt-4 text-xs">© {new Date().getFullYear()} RELIK. Todos los derechos reservados. Desarrollado por RELIK.</p>
    </footer>
  );
}
