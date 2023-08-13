import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import { Navbar } from '@/components';

import './globals.css';

export const metadata: Metadata = {
  title: 'Fork Forest',
  description:
    'Proyecto ReFi que trabaja con herramientas web3 al servicio de los valores de conservación ambiental y responsabilidad social',
};

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es' className={raleway.className}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
