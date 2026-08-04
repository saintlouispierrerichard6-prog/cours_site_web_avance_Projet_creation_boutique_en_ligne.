  
"use client";
import { useEffect } from "react";
import AfficherHero from "../components/Hero";
import AfficherProduitsPopulaires from "../components/Products";

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
