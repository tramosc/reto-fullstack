// app/layout.tsx
import './globals.css'; // o estilos globales

export const metadata = {
  title: 'Reto FullStack',
  description: 'Descripción de la app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
