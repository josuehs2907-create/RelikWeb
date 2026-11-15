import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RELIK | Tu vehículo merece más",
  description: "Tecnología, precisión y confianza en cada servicio automotriz.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
