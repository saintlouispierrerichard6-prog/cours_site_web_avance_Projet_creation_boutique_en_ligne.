"use client";

import Link from "next/link";
import Image from "next/image";
import "./Header.css";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaTiktok } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useTheme } from "@/app/context/ThemeContext";
import { useLang } from "@/app/context/LangContext";
import { useEffect, useState } from "react";

export default function AfficherHeader() {

    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const { lang, toggleLang } = useLang();

    const isActive = (path: string) =>
        pathname === path ? "active-link" : "";

    const [showDownloadBtn, setShowDownloadBtn] = useState(false);

    /* ============================
       LOGIQUE INSTALLATION PWA
       ============================ */

    useEffect(() => {
        let deferredPrompt: any = null;

        // 1. Capture l’événement d’installation PWA
        window.addEventListener("beforeinstallprompt", (e) => {
            e.preventDefault();
            deferredPrompt = e;

            // Vérifier si bouton an dwe parèt
            const hideDate = localStorage.getItem("hideDownloadLink");
            const installed = localStorage.getItem("hasInstalledApp");

            if (!installed) {
                if (hideDate) {
                    const diff = Date.now() - Number(hideDate);
                    const sevenDays = 7 * 24 * 60 * 60 * 1000;

                    if (diff >= sevenDays) {
                        localStorage.removeItem("hideDownloadLink");
                        setShowDownloadBtn(true);
                    }
                } else {
                    setShowDownloadBtn(true);
                }
            }

            // 2. Bouton telechargement 
            const btn = document.getElementById("installAppBtn");
            if (btn) {
                btn.onclick = async () => {
                    if (deferredPrompt) {
                        deferredPrompt.prompt();
                        const result = await deferredPrompt.userChoice;

                        if (result.outcome === "accepted") {
                            localStorage.setItem("hasInstalledApp", "true");
                            setShowDownloadBtn(false);
                        }
                    }
                };
            }
        });
    }, []);

    /* ============================
       TEXTE LANG
       ============================ */

    const text = {
        fr: {
            accueil: "Accueil",
            produits: "Produits",
            panier: "Panier",
            actualites: "Actualités",
            contact: "Contacts",
            telecharger: "Télécharger l’application"
        },
        en: {
            accueil: "Home",
            produits: "Products",
            panier: "Cart",
            actualites: "News",
            contact: "Contact",
            telecharger: "Download App"
        }
    };

    return (
        <header className="containerHeader">

            <div id="containerHeader2">
                <div id="premierbarmenu">
                    <Image src="/images/logo.png" alt="Logo de Elite Store" height={100} width={100} />
                    <h1>Elite Store</h1>
                </div>

                <div id="containerreseauxsociaux">
                    <ul>
                        <li><FaFacebook /></li>
                        <li><FaInstagram /></li>
                        <li><FaYoutube /></li>
                        <li><FaTwitter /></li>
                        <li><FaTiktok /></li>
                    </ul>
                </div>

                {/* Boutons Theme + Lang */}
                <div id="headerButtons">
                    <button onClick={toggleTheme}>
                        {theme === "light" ? "🌙 Mode sombre" : "☀️ Mode clair"}
                    </button>

                    <button onClick={toggleLang}>
                        {lang === "fr" ? "🇫🇷 Français" : "🇬🇧 English"}
                    </button>
                </div>
            </div>

            <nav className="barmenu">
                <ul>
                    <li className={isActive("/")}>
                        <Link href="/">{text[lang].accueil}</Link>
                    </li>

                    <li className={isActive("/produits")}>
                        <Link href="/produits">{text[lang].produits}</Link>
                    </li>

                    <li className={isActive("/panier")}>
                        <Link href="/panier">{text[lang].panier}</Link>
                    </li>

                    <li className={isActive("/actualites")}>
                        <Link href="/actualites">{text[lang].actualites}</Link>
                    </li>

                    <li className={isActive("/contact")}>
                        <Link href="/contact">{text[lang].contact}</Link>
                    </li>

                    {/* ============================
                       BOUTON TÉLÉCHARGER APP
                       ============================ */}
                    {showDownloadBtn && (
                        <li>
                            <button id="installAppBtn" className="downloadBtn">
                                {text[lang].telecharger}
                            </button>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
}

