"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Quote, Star } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import Modal from "./ui/Modal";
import { TruncatedTextTooltip } from "./ui/Tooltip";

const recommendations = [
  {
    name: "Bruno Jardim",
    role: "Especialista de Manufatura | Green Belt",
    company: "Cie Automotive",
    img: "/img/bruno-jardim.webp",
    text: "Tive o prazer de trabalhar com Kaiqui durante três anos na empresa Cie Automotive, onde ele atuou como Aprendiz, estagiário e efetivo. Desde o início demonstrou um alto nível de inteligência nos controles sistêmico, proatividade no planejamento das atividades do departamento e dedicação às suas atividades. Ele foi responsável por implementar diversos KPI's, ajudando na análise dos dados de produtividade e refugo. Profissional extremamente criativo.",
    featured: false,
  },
  {
    name: "João Mário Silva Nascimento",
    role: "Engenheiro de Software | Go | Kotlin | NodeJs | NextJs",
    company: "D&O Sistemas",
    img: "/img/joao-mario.webp",
    text: "Quero deixar aqui minha recomendação pro Kaiqui Lucas. Tive a oportunidade de acompanhar o trabalho dele e posso dizer com tranquilidade que é um profissional com muita disposição pra aprender e que entrega os projetos com excelência e atenção aos detalhes. É o tipo de pessoa que não se contenta em fazer o básico, ele realmente busca entender o porquê das coisas, se aprofunda, melhora a cada dia e tem uma postura super proativa. Sem dúvida, alguém com muito potencial e que faz a diferença em qualquer equipe. Além disso, ele tem uma mentalidade colaborativa incrível. Sempre disposto a ajudar os colegas, compartilhar conhecimento e contribuir pra que o time cresça junto. Trabalhar com alguém assim é fácil, leve e inspirador, e isso faz toda a diferença no dia a dia.",
    featured: false,
  },
  {
    name: "Leonardo Cali ",
    role: "Analista de Sistemas | Analista de Infraestrutura | Virtualização de Ambientes",
    company: "D&O Sistemas",
    img: "/img/leonardo-calli.webp",
    text: "Trabalhar com Kaiqui Lucas é ter a certeza de que a experiência do usuário estará em boas mãos. Ele une técnica e sensibilidade de design de uma forma rara de se encontrar: transforma ideias em interfaces funcionais, leves e com atenção a cada detalhe. Com domínio de React, TypeScript, Tailwind e boas práticas de arquitetura, Kaiqui entrega mais do que código — entrega experiências. É meticuloso com performance, acessibilidade e usabilidade, sempre buscando a melhor forma de comunicar o que está na tela com clareza e propósito. Além disso, tem um espírito de equipe exemplar: está sempre disposto a ajudar, ouvir, revisar e compartilhar conhecimento. Sua forma colaborativa eleva o nível de todos ao redor. Um profissional que entende que design e código caminham juntos — e faz isso com excelência. Qualquer time que conte com o Kaiqui tem muito a ganhar.",
    featured: false,
  },
  {
    name: "Matheus Brito ",
    role: "Desenvolvedor de Software Full-Stack",
    company: "CPortal",
    img: "/img/matheus-brito.webp",
    text: "Recomendação para Kaiqui Lucas: Tive o prazer de trabalhar com o Kaiqui durante o período em que ele atuou como estagiário de Suporte Técnico. Desde o início, ele se destacou pelo interesse genuíno em aprender e se desenvolver. Sempre demonstrou proatividade, curiosidade técnica e disposição para ajudar os colegas — qualidades que, sem dúvida, farão diferença em sua trajetória profissional. É nítido que ele busca crescer continuamente, absorvendo feedbacks e buscando novas formas de melhorar. Com certeza tem um futuro promissor pela frente!",
    featured: false,
  },
];

export default function Testimonials() {
  const [selectedRecommendation, setSelectedRecommendation] = useState<
    (typeof recommendations)[number] | null
  >(null);

  return (
    <section
      id="testimonials"
      className="pt-12 pb-12 lg:pt-14 lg:pb-14 bg-white/55 dark:bg-[#07070a]/80 relative border-y border-black/5 dark:border-white/5 overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="max-w-350 mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-pink to-blue bg-clip-text text-transparent">
              Recomendações Profissionais
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 bg-[#0077B5] px-4 py-2 rounded-full text-white font-bold text-sm shadow-md">
            <FaLinkedin aria-hidden="true" /> <span>LinkedIn</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-275 mx-auto">
          {recommendations.map((rec, index) => {
            const textId = `recommendation-${index}`;

            return (
              <motion.div
                key={rec.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className={`flex h-full flex-col bg-white/90 dark:bg-[#111216] p-6 rounded-lg border backdrop-blur ${
                  rec.featured
                    ? "border-pink-500/50 shadow-[0_0_30px_rgba(209,47,122,0.1)]"
                    : "border-black/10 dark:border-white/10"
                } hover:border-pink-500/35 dark:hover:border-pink-500/35 shadow-md shadow-black/5 dark:shadow-none hover:shadow-lg group`}
              >
                <div className="flex justify-between items-start mb-5">
                  <Quote
                    className="text-pink-400 dark:text-pink-500/70"
                    size={32}
                    aria-hidden="true"
                  />
                  <div className="flex gap-1 text-yellow-400 text-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        fill="currentColor"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>

                <div className="mb-6 grow">
                  <TruncatedTextTooltip
                    content={rec.text}
                    id={textId}
                    className="relative outline-none"
                    linesClassName="line-clamp-4 text-gray-600 dark:text-gray-300 italic leading-relaxed"
                    renderText={(text) => <>&quot;{text}&quot;</>}
                    renderTooltipContent={(text) => `“${text}”`}
                    tooltipClassName="w-[min(32rem,calc(100vw-1.5rem))]"
                  />

                  <button
                    type="button"
                    onClick={() => setSelectedRecommendation(rec)}
                    aria-controls={textId}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg border border-pink-500/20 bg-pink-500/10 px-3 py-1.5 text-xs font-bold text-pink-700 hover:border-pink-500/40 hover:bg-pink-500/15 dark:text-pink-300"
                  >
                    Ler mais
                    <ExternalLink size={12} aria-hidden="true" />
                  </button>
                </div>

                <div className="flex items-center gap-4 border-t border-black/5 pt-5 dark:border-white/5">
                  <div className="w-12.5 h-12.5 rounded-full p-0.5 bg-linear-to-br from-pink to-blue">
                    <Image
                      src={rec.img}
                      alt={rec.name}
                      width={50}
                      height={50}
                      className="rounded-full w-full h-full object-cover border-2 border-white dark:border-black"
                      unoptimized
                    />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-bold text-lg group-hover:text-pink-600 dark:group-hover:text-pink-500">
                      {rec.name}
                    </h4>
                    <span className="block text-pink-600 dark:text-pink-500 text-sm font-medium">
                      {rec.role}
                    </span>
                    <span className="text-gray-500 dark:text-gray-500 text-xs">
                      {rec.company}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <Modal
          isOpen={Boolean(selectedRecommendation)}
          onClose={() => setSelectedRecommendation(null)}
          labelledBy="recommendation-modal-title"
          closeLabel="Fechar recomendação"
          panelClassName="max-w-3xl p-6"
        >
          {selectedRecommendation && (
            <>
              <div className="mb-6 flex items-center gap-4 pr-12">
                <div className="h-14 w-14 shrink-0 rounded-full bg-linear-to-br from-pink to-blue p-0.5">
                  <Image
                    src={selectedRecommendation.img}
                    alt={selectedRecommendation.name}
                    width={56}
                    height={56}
                    className="h-full w-full rounded-full border-2 border-white object-cover dark:border-black"
                    unoptimized
                  />
                </div>
                <div>
                  <h3
                    id="recommendation-modal-title"
                    className="text-xl font-bold text-gray-900 dark:text-white"
                  >
                    {selectedRecommendation.name}
                  </h3>
                  <span className="block text-sm font-medium text-pink-600 dark:text-pink-500">
                    {selectedRecommendation.role}
                  </span>
                  <span className="text-xs text-gray-500">
                    {selectedRecommendation.company}
                  </span>
                </div>
              </div>

              <div className="mb-5 flex items-center justify-between border-y border-black/5 py-4 dark:border-white/5">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#0077B5]/20 bg-[#0077B5]/10 px-3 py-1.5 text-xs font-bold text-[#0077B5] dark:text-blue-300">
                  <FaLinkedin aria-hidden="true" />
                  Recomendação LinkedIn
                </span>
                <div className="flex gap-1 text-sm text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      fill="currentColor"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 lg:text-lg">
                &quot;{selectedRecommendation.text}&quot;
              </p>
            </>
          )}
        </Modal>

        <div className="text-center mt-12">
          <Link
            href="https://www.linkedin.com/in/kaiqui-lucas/details/recommendations/?detailScreenTabIndex=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3 rounded-lg bg-[#0077B5] text-white font-bold hover:shadow-md hover:shadow-[#0077B5]/20 hover:-translate-y-0.5"
          >
            <FaLinkedin aria-hidden="true" /> Ver todas no LinkedIn
          </Link>
        </div>
      </div>
    </section>
  );
}
