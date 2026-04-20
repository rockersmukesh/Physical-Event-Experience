import type { Metadata } from "next";
import { Inter, Lexend, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";

const headlineFont = Lexend({
  subsets: ["latin"],
  variable: "--font-headline-display",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body-copy",
});

const labelFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-label-display",
});

export const metadata: Metadata = {
  title: "Stadium Pulse",
  description:
    "Real-time venue intelligence for crowd movement, queue reduction, live coordination, and frictionless game-day service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`dark ${headlineFont.variable} ${bodyFont.variable} ${labelFont.variable}`}
    >
      <body className="bg-background text-on-surface font-body min-h-screen lg:flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex-1 min-h-screen bg-background pb-24 lg:ml-64 lg:pb-0">
          {children}
        </div>
        <div className="lg:hidden">
          <Navigation />
        </div>
      </body>
    </html>
  );
}
