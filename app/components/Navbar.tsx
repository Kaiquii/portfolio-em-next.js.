"use client"; 

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#person" },
    { name: "Sobre", href: "#about" },
    { name: "Projetos", href: "#projects" },
    { name: "Recomendações", href: "#testimonials" },
    { name: "Contatos", href: "#contacts" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled ? "bg-black/95 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        <Link href="/" className="text-2xl font-bold hover:text-pink z-50">
          <h1>kaiqui.dev</h1>
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex gap-8">
            {navLinks.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-white text-base font-medium hover:text-pink relative group py-2"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="lg:hidden flex flex-col justify-around w-10 h-10 p-2 z-50 relative focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Abrir Menu"
        >
          <span className={`block w-full h-0.75 bg-white rounded ${isOpen ? "rotate-45 translate-y-2.5 bg-pink" : ""}`} />
          <span className={`block w-full h-0.75 bg-white rounded ${isOpen ? "opacity-0" : ""}`} />
          <span className={`block w-full h-0.75 bg-white rounded ${isOpen ? "-rotate-45 -translate-y-2.5 bg-pink" : ""}`} />
        </button>

        <div
          className={`fixed inset-0 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
          }`}
        >
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-2xl font-bold text-white hover:text-pink"
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