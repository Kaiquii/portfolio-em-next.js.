"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ui/ThemeToogle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "#person" },
    { name: "Sobre", href: "#about" },
    { name: "Projetos", href: "#projects" },
    { name: "Repositórios", href: "#github-repos" },
    { name: "Recomendações", href: "#testimonials" },
    { name: "Contatos", href: "#contacts" },
  ];

  return (
    <header
      data-tooltip-boundary="top"
      className="fixed top-0 left-0 right-0 z-9999 px-4 pt-4"
    >
      <div
        className={`max-w-7xl mx-auto h-15 px-4 sm:px-5 flex items-center justify-between rounded-lg border backdrop-blur-xl ${
          scrolled
            ? "bg-white/88 dark:bg-black/78 border-black/10 dark:border-white/10 shadow-md shadow-black/5"
            : "bg-white/55 dark:bg-black/35 border-black/5 dark:border-white/5"
        }`}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xl sm:text-2xl font-bold z-10000 text-black dark:text-white hover:text-pink"
          aria-label="Ir para o início"
        >
          <span className="h-2.5 w-2.5 rounded-full bg-linear-to-br from-pink-500 to-blue-600 shadow-[0_0_10px_rgba(209,47,122,0.45)]" />
          <span>kaiqui.dev</span>
        </Link>

        <nav className="hidden lg:block" aria-label="Navegação principal">
          <ul className="flex items-center gap-1 rounded-lg border border-black/5 bg-black/3 p-1 dark:border-white/5 dark:bg-white/4">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="relative block rounded-md px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-pink-500/10 hover:text-pink-600 dark:text-gray-200 dark:hover:text-pink-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 z-10000">
          <ThemeToggle />

          <button
            className="lg:hidden inline-flex w-10 h-10 items-center justify-center rounded-lg border border-black/10 bg-white/70 text-gray-900 hover:border-pink-500/40 hover:text-pink-600 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:text-pink-300"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Abrir Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <div
          className={`fixed left-4 right-4 top-22 rounded-lg border border-black/10 bg-white/95 p-4 shadow-xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-black/90 lg:hidden z-9998 ${
            isOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible pointer-events-none -translate-y-2"
          }`}
        >
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-md px-4 py-3 text-base font-bold text-black hover:bg-pink-500/10 hover:text-pink-600 dark:text-white dark:hover:text-pink-300"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
