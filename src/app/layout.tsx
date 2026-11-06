import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Corbatul & Co. | Suite Ejecutiva Sastrería & Confección',
  description: 'Plataforma analítica local-first con estética de confección vintage para presentación directiva de resultados Corbatul',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased bg-vintage-50 text-vintage-900 selection:bg-brass-light selection:text-brass-dark">
        {children}
      </body>
    </html>
  );
}
