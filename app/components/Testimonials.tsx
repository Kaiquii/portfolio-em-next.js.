"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const recommendations = [
  {
    name: "Matheus Brito",
    role: "Desenvolvedor de software fullstack",
    company: "C Portal",
    img: "/img/matheus-brito.png",
    text: "Tive o prazer de trabalhar com o Kaiqui durante o período em que ele atuou como estagiário de Suporte Técnico. Desde o início, ele se destacou pelo interesse genuíno em aprender e se desenvolver...",
    featured: true,
  },
  {
    name: "Bruno Jardim",
    role: "Especialista de Manufatura | Green Belt",
    company: "Cie Automotive",
    img: "/img/bruno-jardim.jpeg",
    text: "Tive o prazer de trabalhar com Kaiqui durante três anos na empresa Cie Automotive... Demonstrou um alto nível de inteligência nos controles sistêmicos, proatividade no planejamento...",
    featured: false,
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-20 bg-linear-to-br from-[#0a0a0a] to-[#1a1a1a] relative"
    >
      <div className="max-w-350 mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-pink to-blue bg-clip-text text-transparent">
              Recomendações Profissionais
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#0077B5] px-4 py-2 rounded-full text-white font-bold text-sm shadow-md">
            <i className="fa-brands fa-linkedin"></i> <span>LinkedIn</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-275 mx-auto">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`bg-[#1a1a1a] p-8 rounded-3xl border ${rec.featured ? "border-pink/30 shadow-[0_0_30px_rgba(209,47,122,0.1)]" : "border-white/10"} hover:border-pink/30 hover:shadow-xl group`}
            >
              <div className="flex justify-between items-start mb-6">
                <i className="fa-solid fa-quote-left text-4xl text-pink/70"></i>
                <div className="flex gap-1 text-yellow-400 text-sm">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i key={star} className="fa-solid fa-star"></i>
                  ))}
                </div>
              </div>

              <p className="text-gray-300 italic mb-8 leading-relaxed">
                &quot;{rec.text}&quot;
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12.5 h-12.5 rounded-full p-0.5 bg-linear-to-br from-pink to-blue">
                  <Image
                    src={rec.img}
                    alt={rec.name}
                    width={50}
                    height={50}
                    className="rounded-full w-full h-full object-cover border-2 border-transparent"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg group-hover:text-pink">
                    {rec.name}
                  </h4>
                  <span className="block text-pink text-sm font-medium">
                    {rec.role}
                  </span>
                  <span className="text-gray-500 text-xs">{rec.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="https://www.linkedin.com/in/kaiqui-lucas/"
            target="_blank"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[#0077B5] text-white font-bold hover:shadow-[0_10px_30px_rgba(0,119,181,0.3)] hover:-translate-y-1"
          >
            <i className="fa-brands fa-linkedin"></i> Ver todas no LinkedIn
          </Link>
        </div>
      </div>
    </section>
  );
}
