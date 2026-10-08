import type { Metadata, Viewport } from "next";
import { Nunito, Noto_Sans_Kannada } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";

const nunito = Nunito({ variable: "--font-nunito", subsets: ["latin"], weight: ["400", "600", "700", "800", "900"] });
const kannada = Noto_Sans_Kannada({ variable: "--font-kannada", subsets: ["kannada"], weight: ["400", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "Maathu · 30-Day Kannada",
  description: "From Namaskara to natural conversations. Learn spoken Bengaluru Kannada in 30 days, with English and Hindi explanations.",
  applicationName: "Maathu",
  appleWebApp: { capable: true, title: "Maathu", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#fff8ec",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nunito.variable} ${kannada.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
