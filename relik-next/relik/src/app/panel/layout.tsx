import Link from "next/link";

const NAV = [["/panel", "Dashboard"], ["/panel/ordenes", "Órdenes de trabajo"], ["/panel/inventario", "Inventario"], ["/panel/citas", "Citas"]];

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr]">
      <aside className="border-r border-line bg-black p-5">
        <div className="font-extrabold tracking-[0.3em]">RELIK</div>
        <nav className="mt-6 grid gap-1 text-sm">{NAV.map(([href, label]) => <Link key={href} href={href} className="rounded-lg px-3 py-2 hover:bg-panel hover:text-gold">{label}</Link>)}</nav>
      </aside>
      <div className="p-6">{children}</div>
    </div>
  );
}
