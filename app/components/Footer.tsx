"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0a] pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(209,47,122,0.05),transparent_50%)] pointer-events-none" />

      <div className="max-w-300 mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold bg-linear-to-r from-pink to-blue bg-clip-text text-transparent">
              kaiqui.dev
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              Desenvolvedor Full Stack apaixonado por tecnologia e inovação.
              Transformando ideias em realidade digital.
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-linear-to-r after:from-pink after:to-blue">
              Navegação
            </h4>
            <ul className="space-y-3">
              {["Home", "Sobre", "Projetos", "Recomendações", "Contatos"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase().replace("çõ", "co").replace("é", "e")}`}
                      className="text-gray-400 hover:text-pink relative group flex items-center"
                    >
                      <span className="w-0 h-px bg-pink mr-0 group-hover:w-3 group-hover:mr-2"></span>
                      {item}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold text-white mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-linear-to-r after:from-pink after:to-blue">
              Conecte-se
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="https://www.linkedin.com/in/kaiqui-lucas/"
                  target="_blank"
                  className="text-gray-400 hover:text-[#0077B5]"
                >
                  <i className="fa-brands fa-linkedin w-6"></i> LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Kaiquii"
                  target="_blank"
                  className="text-gray-400 hover:text-white"
                >
                  <i className="fa-brands fa-github w-6"></i> GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.instagram.com/kaiqui_luucas/"
                  target="_blank"
                  className="text-gray-400 hover:text-[#E1306C]"
                >
                  <i className="fa-brands fa-instagram w-6"></i> Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:kaiqui.lucaskaiquiluc@gmail.com"
                  className="text-gray-400 hover:text-red-500"
                >
                  <i className="fa-solid fa-envelope w-6"></i> E-mail
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {currentYear} Kaiqui Lucas. Todos os direitos reservados.</p>
          <p className="flex items-center gap-2">
            Feito com <span className="text-red-500 animate-pulse">❤️</span> e
            muito <span className="text-yellow-600 animate-bounce">☕</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
