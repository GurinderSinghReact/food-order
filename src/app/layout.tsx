import { Roboto_Mono, VT323, Open_Sans } from "next/font/google";
import "./globals.css";

const roboto = Roboto_Mono({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const vt323 = VT323({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-vt323",
});

const open_sans = Open_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open_sans",
});

export const metadata = {
  title: "Noshiri",
  description: "Web developer portfolio showcasing my projects and skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${open_sans.variable} ${roboto.variable} ${vt323.variable}`}
    >
      <body className={open_sans.className}>
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
