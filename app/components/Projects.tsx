"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { OverflowItemsTooltip, TruncatedTextTooltip } from "./ui/Tooltip";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const projects = [
  {
    id: 1,
    title: "SobraAi — Android",
    img: "/img/sobra-ai-android.png",
    desc: "Aplicativo nativo de gestão financeira para acompanhar despesas, rendas, saldo mensal e relatórios, com integração segura a uma API REST.",
    tags: ["Kotlin", "Jetpack Compose", "Retrofit", "API REST"],
    category: "App Android",
    featured: true,
    repo: "https://github.com/Kaiquii/Sobra-Ai-Android.git",
    live: "https://play.google.com/store/apps/details?id=br.com.sobraai.app&hl=pt_BR",
    liveLabel: "Play Store",
  },
  {
    id: 2,
    title: "SobraAi - Web",
    img: "/img/app-financeiro-web.webp",
    desc: "Plataforma financeira web com autenticação, dashboards e API REST em Go para controle completo de receitas, despesas e metas.",
    tags: ["Next.js", "TypeScript", "Go", "API REST"],
    category: "Projeto principal",
    repo: "https://github.com/Kaiquii/Sobra-Ai-Web.git",
    live: "https://sobra-ai.netlify.app/login",
  },
  {
    id: 3,
    title: "Site Motoboy - Chama o Boy",
    img: "/img/site-motoboy.webp",
    desc: "Landing page responsiva para corridas e entregas, com formulário direto para WhatsApp e foco em conversão rápida.",
    tags: ["Next.js", "TypeScript", "WhatsApp"],
    category: "Negócio local",
    repo: "https://github.com/Kaiquii/site-motoboy-nextjs.git",
    live: "https://chama-o-boy.vercel.app",
  },
  {
    id: 4,
    title: "Consulta Fipe",
    img: "/img/projeto-fipe.webp",
    desc: "Aplicação moderna para consultar a Tabela Fipe de carros, motos e caminhões usando dados de API externa.",
    tags: ["Next.js", "TypeScript", "API REST"],
    category: "Integração API",
    repo: "https://github.com/Kaiquii/consulta-fipe.git",
    live: "https://consulta-fipe.vercel.app",
  },
  {
    id: 5,
    title: "Calculadora de IMC",
    img: "/img/projeto-imc.webp",
    desc: "Calculadora de IMC com interface simples, responsiva e feedback visual para acompanhar indicadores de saúde.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Interface web",
    repo: "https://github.com/Kaiquii/imc-next",
    live: "https://imc-next.vercel.app",
  },
  {
    id: 6,
    title: "Pet Shop - DEV",
    img: "/img/petdev.webp",
    desc: "E-commerce completo para petshop com sistema de carrinho e checkout.",
    tags: ["React", "Node.js", "E-commerce"],
    category: "E-commerce",
    repo: "https://github.com/Kaiquii/petdev.git",
    live: "https://petdev-ten.vercel.app",
  },
  {
    id: 7,
    title: "Starbucks Clone",
    img: "/img/starbucks-foto.webp",
    desc: "Landing page responsiva inspirada na experiência visual da Starbucks, com foco em layout, cores e apresentação de produto.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    category: "Landing page",
    repo: "https://github.com/Kaiquii/site-starbucks",
    live: "https://cheery-strudel-5e916f.netlify.app",
  },
  {
    id: 8,
    title: "Agência Awax",
    img: "/img/awaw.webp",
    desc: "Template de agência criativa com seções institucionais, layout responsivo e composição visual moderna.",
    tags: ["HTML5", "CSS3", "Responsivo"],
    category: "Institucional",
    repo: "https://github.com/Kaiquii/Projeto-Awax",
    live: "https://projetoo-awax.netlify.app/",
  },
  {
    id: 9,
    title: "Loja de Roupas",
    img: "/img/loja-roupas.webp",
    desc: "E-commerce de moda com catálogo de produtos, filtros dinâmicos e experiência pensada para navegação rápida.",
    tags: ["E-commerce", "JavaScript", "UI/UX"],
    category: "E-commerce",
    repo: "https://github.com/Kaiquii/loja-de-roupas-front-end",
    live: "https://loja-roupas-proj.netlify.app/",
  },
  {
    id: 10,
    title: "Medicenter",
    img: "/img/medicenter.webp",
    desc: "Website institucional para clínica médica, com estrutura clara para serviços, informações e agendamentos.",
    tags: ["Institucional", "Responsivo", "Healthcare"],
    category: "Institucional",
    repo: "https://github.com/Kaiquii/Templete-medicenter-responsivo",
    live: "https://templete-medicenter-b7web.netlify.app/",
  },
  {
    id: 11,
    title: "Pizzaria Delivery",
    img: "/img/pizzaria-proj.webp",
    desc: "Site de delivery para pizzaria com cardápio interativo, carrinho e fluxo pensado para pedidos online.",
    tags: ["Delivery", "WhatsApp API", "Animações"],
    category: "Delivery",
    repo: "https://github.com/Kaiquii/Projeto-pizzaria",
    live: "https://proj-pizzaria-b7web.netlify.app/",
  },
  {
    id: 12,
    title: "Cadastro de Produtos",
    img: "/img/proj-cadastro.webp",
    desc: "Sistema CRUD para gestão de produtos e estoque, com cadastro, listagem e validação de dados no front-end.",
    tags: ["CRUD", "JavaScript", "Validação"],
    category: "Gestão",
    repo: "https://github.com/Kaiquii/Cadastro-Produto-JS",
    live: "https://cadastro-produtos.netlify.app/",
  },
];

export default function Projects() {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  return (
    <section
      id="projects"
      className="pt-12 pb-12 lg:pt-14 lg:pb-14 relative bg-white/55 dark:bg-[#07070a]/80 border-y border-black/5 dark:border-white/5 overflow-hidden"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="max-w-350 mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-flex rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-sm font-bold text-pink-700 dark:text-pink-300 mb-5">
            Portfólio em destaque
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold bg-linear-to-r from-pink to-blue bg-clip-text text-transparent mb-4">
            Meus Projetos
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Projetos com foco em produto, integrações, interfaces responsivas e
            soluções full stack.
          </p>
        </div>

        <div className="relative px-4 lg:px-12 group/slider">
          <button
            ref={setPrevEl}
            className="absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-20 
                       w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center
                       bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full text-gray-900 dark:text-white 
                       shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] ease-out
                       hover:scale-110 hover:border-pink hover:text-pink hover:bg-pink/10 hover:shadow-[0_0_20px_rgba(209,47,122,0.3)] dark:hover:shadow-[0_0_20px_rgba(209,47,122,0.4)]
                       disabled:opacity-0 disabled:cursor-not-allowed md:flex"
            aria-label="Anterior"
          >
            <ChevronLeft size={20} className="relative -left-0.5" />
          </button>

          <button
            ref={setNextEl}
            className="absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-20 
                       w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center
                       bg-white/80 dark:bg-[#1a1a1a]/80 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-full text-gray-900 dark:text-white 
                       shadow-[0_4px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)] ease-out
                       hover:scale-110 hover:border-pink hover:text-pink hover:bg-pink/10 hover:shadow-[0_0_20px_rgba(209,47,122,0.3)] dark:hover:shadow-[0_0_20px_rgba(209,47,122,0.4)]
                       disabled:opacity-0 disabled:cursor-not-allowed md:flex"
            aria-label="Próximo"
          >
            <ChevronRight size={20} className="relative -right-0.5" />
          </button>

          <Swiper
            modules={[Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl,
              nextEl,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              700: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            style={
              {
                "--swiper-pagination-color": "#d12f7a",
                "--swiper-pagination-bullet-inactive-color": "#888",
                "--swiper-pagination-bullet-inactive-opacity": "1",
                "--swiper-pagination-bottom": "0px",
              } as React.CSSProperties
            }
            className="pb-12"
          >
            {[...projects].sort((a, b) => a.id - b.id).map((project) => (
              <SwiperSlide key={project.id} className="h-auto">
                <div
                  className={`bg-white/90 dark:bg-[#111216]/95 border rounded-lg overflow-hidden hover:border-pink/35 dark:hover:border-pink/25 shadow-md shadow-black/5 dark:shadow-none hover:shadow-lg dark:hover:shadow-[0_0_12px_rgba(209,47,122,0.12)] group h-120 flex flex-col backdrop-blur ${
                    project.featured
                      ? "border-pink-500/45 dark:border-pink-500/35"
                      : "border-black/10 dark:border-white/10"
                  }`}
                >
                  <div className="relative h-56 w-full overflow-hidden border-b border-black/5 dark:border-white/5">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 700px) 50vw, 100vw"
                      className="object-cover group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/65 to-transparent opacity-70" />
                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/25 bg-pink-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
                          <Sparkles size={12} />
                          Destaque
                        </span>
                      )}
                      <span className="rounded-full border border-white/25 bg-black/65 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-white/55 dark:bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center backdrop-blur-sm">
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Abrir ${project.title}`}
                        className="text-gray-900 dark:text-white text-3xl hover:text-pink dark:hover:text-pink"
                      >
                        <ExternalLink />
                      </Link>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="mb-3 h-7 text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                      {project.title}
                    </h3>

                    <TruncatedTextTooltip
                      content={project.desc}
                      className="relative mb-4 h-11 outline-none"
                      linesClassName="line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
                      tooltipClassName="w-[min(28rem,calc(100vw-1.5rem))]"
                    />

                    <div className="mb-6 flex h-7 items-center gap-1.5">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="shrink-0 rounded-full border border-pink-200 bg-pink-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-pink-700 dark:border-pink-500/20 dark:bg-pink-900/30 dark:text-pink-400"
                        >
                          {tag}
                        </span>
                      ))}
                      <OverflowItemsTooltip
                        items={project.tags}
                        className="relative shrink-0 outline-none"
                        triggerClassName="rounded-full border border-black/10 bg-black/5 px-2 py-1 text-[9px] font-bold tracking-wider text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300"
                        tooltipClassName="w-max max-w-52"
                      />
                    </div>

                    <div className="flex gap-4">
                      <Link
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 rounded-lg bg-gray-100 dark:bg-white/5 border border-black/10 dark:border-white/10 text-center text-sm font-bold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 flex items-center justify-center gap-2"
                      >
                        <FaGithub size={16} /> Código
                      </Link>
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 rounded-lg bg-linear-to-r from-pink to-blue text-center text-sm font-bold text-white hover:shadow-md hover:shadow-pink-500/15 flex items-center justify-center gap-2"
                      >
                        <ExternalLink size={14} /> {project.liveLabel ?? "Ver Site"}
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
