"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPhp,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
} from "react-icons/si";

import { FaGithub, FaInstagram, FaLinkedin, FaJava } from "react-icons/fa";

const techs = [
  { name: "HTML", icon: <SiHtml5 className="text-orange-500" /> },
  { name: "CSS", icon: <SiCss3 className="text-blue-500" /> },
  { name: "JS", icon: <SiJavascript className="text-yellow-400" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
  { name: "Python", icon: <SiPython className="text-blue-400" /> },
  { name: "PHP", icon: <SiPhp className="text-indigo-400" /> },
  { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400" /> },
  { name: "React", icon: <SiReact className="text-cyan-300" /> },
  { name: "NextJS", icon: <SiNextdotjs className="text-white" /> },
  { name: "Java", icon: <FaJava className="text-red-500" /> },
];

export default function Hero() {
  return (
    <section
      id="person"
      className="min-h-screen w-full flex flex-col lg:flex-row items-center justify-center relative overflow-hidden pt-32 pb-10 px-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(209,47,122,0.1),transparent_50%)] pointer-events-none" />

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start z-10 text-center lg:text-left mb-12 lg:mb-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-4xl lg:text-6xl font-bold mb-2 text-white">
            Olá,
          </h1>
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-white">
            Meu nome é
          </h1>
          <h1 className="text-5xl lg:text-7xl font-bold bg-linear-to-r from-pink to-blue bg-clip-text text-transparent pb-2">
            Kaiqui Lucas
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col items-center lg:items-start w-full"
        >
          <h3 className="text-xl mb-6 relative inline-block text-white after:content-[''] after:absolute after:-bottom-1.25 after:w-full after:h-0.5 after:bg-linear-to-r after:from-pink after:to-blue">
            Techs :
          </h3>

          <ul className="flex flex-wrap justify-center lg:justify-start gap-4 max-w-xl">
            {techs.map((tech) => (
              <li
                key={tech.name}
                className="p-4 bg-white/5 border border-white/10 rounded-xl hover:scale-110 hover:bg-white/10 hover:border-pink/50 hover:shadow-[0_0_20px_rgba(209,47,122,0.3)] group cursor-default"
                title={tech.name}
              >
                <div className="text-3xl">
                  {tech.icon}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-1/2 flex flex-col items-center justify-center relative"
      >
        <div className="relative w-70 h-70 lg:w-100 lg:h-100 rounded-full p-0.75 bg-linear-to-tr from-orange-400 via-pink-500 to-blue-600 animate-[profileGlow_4s_ease-in-out_infinite] mb-8">
          <div className="w-full h-full rounded-full overflow-hidden relative border-4 border-black bg-black">
            <Image
              src="/img/foto-kaiqui-ofc.jpg"
              alt="Kaiqui Lucas"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="flex gap-6 z-20">
          <Link
            href="https://github.com/Kaiquii"
            target="_blank"
            className="w-14 h-14 flex items-center justify-center bg-[#1a1a1a] rounded-full border border-white/10 hover:bg-black hover:border-white hover:scale-110 shadow-lg text-white text-2xl"
          >
            <FaGithub />
          </Link>
          <Link
            href="https://www.instagram.com/kaiqui_luucas/"
            target="_blank"
            className="w-14 h-14 flex items-center justify-center bg-[#1a1a1a] rounded-full border border-white/10 hover:bg-pink/20 hover:border-pink hover:scale-110 shadow-lg hover:shadow-pink/40 text-pink text-2xl"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://www.linkedin.com/in/kaiqui-lucas/"
            target="_blank"
            className="w-14 h-14 flex items-center justify-center bg-[#1a1a1a] rounded-full border border-white/10 hover:bg-blue-600/20 hover:border-blue-600 hover:scale-110 shadow-lg hover:shadow-blue-600/40 text-blue-500 text-2xl"
          >
            <FaLinkedin />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
