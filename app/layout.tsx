import type { Metadata } from "next";
import "./globals.css";

import Header from "../components/Header";
import Footer from "../components/Footer";

import { ThemeProvider } from "./context/ThemeContext";
import { LangProvider } from "./context/LangContext";

export const metadata: Metadata = {
  title: "Elite Store",
  description: "Une boutique en ligne de vetement pour hommes et femmes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
    <head>
      <link rel="manifest" href="/manifest.json" />
    </head>
      <body>
        <ThemeProvider>
          <LangProvider>
            <Header />
            {children}
            <Footer />
          </LangProvider>
        </ThemeProvider>
      </body>
   </html>
  );
}
