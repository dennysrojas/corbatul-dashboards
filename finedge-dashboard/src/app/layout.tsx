import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FINEDGE · Inteligencia Ejecutiva Minimalista (PuntoOne)',
  description: 'Auditoría Causal y Defensa de Resultados de Negocios · Caso PuntoOne (2025-2029)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-mineral-50 text-slate-steel-900 antialiased selection:bg-blush selection:text-rosewood-800">
        {children}
      </body>
    </html>
  );
}
