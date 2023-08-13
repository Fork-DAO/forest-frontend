import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fork Forest",
  description:
    "Proyecto ReFi que trabaja con herramientas web3 al servicio de los valores de conservación ambiental y responsabilidad social",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
