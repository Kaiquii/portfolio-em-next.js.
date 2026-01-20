"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaJava,
  FaCode,
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaDownload,
} from "react-icons/fa";
import { SiReact, SiNextdotjs, SiTypescript } from "react-icons/si";

export default function About() {
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const age = calculateAge("2002-07-06");

  return (
    <section
      id="about"
      className="py-20 bg-linear-to-br from-[#0a0a0a] to-[#111] relative overflow-hidden"
    >
      <div className="max-w-350 mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >
          <div className="relative w-full max-w-137.5 group">
            <div className="absolute -inset-1 bg-linear-to-r from-pink-600 via-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-50"></div>

            <div className="relative bg-[#1e1e1e] rounded-xl shadow-2xl border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-white/5">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-400 text-xs font-mono">
                  kaiqui.dev.tsx
                </div>
                <div className="w-12"></div>
              </div>

              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm md:text-base leading-relaxed">
                  <code>
                    <div className="flex">
                      <span className="text-gray-500 w-6 select-none">1</span>
                      <span className="text-pink-400">const</span>{" "}
                      <span className="text-blue-300 ml-2">Developer</span>{" "}
                      <span className="text-white mx-2">=</span>{" "}
                      <span className="text-yellow-300">{"{"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-6 select-none">2</span>
                      <span className="text-blue-300 ml-6">name:</span>{" "}
                      <span className="text-green-400 ml-2">
                        &quot;Kaiqui Lucas&quot;
                      </span>
                      <span className="text-white">,</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-6 select-none">3</span>
                      <span className="text-blue-300 ml-6">role:</span>{" "}
                      <span className="text-green-400 ml-2">
                        &quot;Full Stack Dev&quot;
                      </span>
                      <span className="text-white">,</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-6 select-none">4</span>
                      <span className="text-blue-300 ml-6">skills:</span>{" "}
                      <span className="text-yellow-300 ml-2">{"["}</span>
                    </div>

                    <div className="flex items-center group/line hover:bg-white/5 py-1 rounded">
                      <span className="text-gray-500 w-6 select-none">5</span>
                      <span className="text-green-400 ml-10">
                        &quot;React&quot;
                      </span>
                      <SiReact className="ml-3 text-cyan-400 text-lg animate-spin-slow" />
                      <span className="text-white">,</span>
                    </div>
                    <div className="flex items-center group/line hover:bg-white/5 py-1 rounded">
                      <span className="text-gray-500 w-6 select-none">6</span>
                      <span className="text-green-400 ml-10">
                        &quot;Next.js&quot;
                      </span>
                      <SiNextdotjs className="ml-3 text-white text-lg" />
                      <span className="text-white">,</span>
                    </div>
                    <div className="flex items-center group/line hover:bg-white/5 py-1 rounded">
                      <span className="text-gray-500 w-6 select-none">7</span>
                      <span className="text-green-400 ml-10">
                        &quot;Java&quot;
                      </span>
                      <FaJava className="ml-3 text-red-500 text-lg" />
                      <span className="text-white">,</span>
                    </div>
                    <div className="flex items-center group/line hover:bg-white/5 py-1 rounded">
                      <span className="text-gray-500 w-6 select-none">8</span>
                      <span className="text-green-400 ml-10">
                        &quot;TypeScript&quot;
                      </span>
                      <SiTypescript className="ml-3 text-blue-500 text-lg" />
                    </div>

                    <div className="flex">
                      <span className="text-gray-500 w-6 select-none">9</span>
                      <span className="text-yellow-300 ml-6">{"]"}</span>
                    </div>
                    <div className="flex">
                      <span className="text-gray-500 w-6 select-none">10</span>
                      <span className="text-yellow-300">{"}"}</span>
                      <span className="text-white">;</span>
                    </div>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col"
        >
          <div className="inline-flex items-center gap-2 bg-linear-to-br from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full font-bold w-fit mb-6 shadow-lg text-sm">
            <FaCode /> <span>Desenvolvedor</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-2">
            <span className="bg-linear-to-r from-pink-500 to-blue-600 bg-clip-text text-transparent">
              Full Stack
            </span>
          </h2>
          <span className="text-3xl lg:text-4xl text-white mb-6 block font-bold">
            Developer
          </span>

          <p className="text-base lg:text-lg text-gray-300 mb-8 leading-relaxed">
            Sou um <strong>Desenvolvedor Full Stack</strong> apaixonado por
            tecnologia e inovação, com experiência em diversas tecnologias
            modernas.
          </p>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-sm">
            <span className="block text-pink-500 font-bold text-lg mb-4">
              Tecnologias:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                "TypeScript",
                "TailwindCSS",
                "Python",
                "PHP",
                "ReactJS",
                "NextJS",
                "UI/UX",
                "Java",
              ].map((tag) => (
                <span
                  key={tag}
                  className="bg-linear-to-br from-pink-600 to-blue-600 text-white px-3 py-1 rounded-full text-xs lg:text-sm font-medium shadow-md hover:scale-105 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 group">
              <div className="w-12 h-12 flex items-center justify-center bg-linear-to-br from-pink-500 to-blue-600 rounded-xl text-white shadow-lg group-hover:scale-110 shrink-0">
                <FaUser size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg group-hover:text-pink-500">
                  Kaiqui Lucas
                </h4>
                <p className="text-gray-400 text-sm">
                  {age} anos • Desenvolvedor Full Stack
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 group">
              <div className="w-12 h-12 flex items-center justify-center bg-linear-to-br from-pink-500 to-blue-600 rounded-xl text-white shadow-lg group-hover:scale-110 shrink-0">
                <FaGraduationCap size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg group-hover:text-pink-500">
                  Formação & Experiência
                </h4>
                <p className="text-gray-400 text-sm">
                  Conhecimento em NextJS, ReactJS, Python, TypeScript, Java...
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 group">
              <div className="w-12 h-12 flex items-center justify-center bg-linear-to-br from-pink-500 to-blue-600 rounded-xl text-white shadow-lg group-hover:scale-110 shrink-0">
                <FaBriefcase size={20} />
              </div>
              <div>
                <h4 className="text-white font-bold text-lg group-hover:text-pink-500">
                  Oportunidades
                </h4>
                <p className="text-gray-400 text-sm">
                  Aberto para Front-end, Back-end e Full Stack
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href="/document/CV Dev Kaiqui.pdf"
              download
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-linear-to-br from-pink-600 to-blue-600 text-white font-bold shadow-lg hover:shadow-pink-500/30 hover:-translate-y-1 flex-1 md:flex-none"
            >
              <FaDownload /> Baixar CV
            </a>
            <Link
              href="#projects"
              className="flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 hover:border-pink-500 hover:text-pink-500 flex-1 md:flex-none"
            >
              <FaCode /> Ver Projetos
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
