  
"use client";
import { useEffect } from "react";
import AfficherHero from "../components/Hero";
import AfficherProduitsPopulaires from "../components/Products";

export const metadata = {
  title: "Elite Store – Boutique de luxe pour femmes africaines",
  description: "Découvrez des produits haut de gamme spécialement conçus pour les femmes africaines.",
  keywords: [
    "elite store",
    "boutique en ligne",
    "luxe",
    "femmes africaines",
    "mode africaine",
    "produits haut de gamme"
  ],
  openGraph: {
    title: "Elite Store – Boutique de luxe",
    description: "Boutique de luxe en ligne pour femmes africaines.",
    url: "https://elitestore.com",
    siteName: "Elite Store",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "fr_CA",
    type: "website",
  },
};

export default function Home() {

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js");
    }
  }, []);

  return (
    <main>
      <AfficherHero />
      <AfficherProduitsPopulaires />
    </main>
  );
}
