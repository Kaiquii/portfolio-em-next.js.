import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About"; 
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials"; 
import Contacts from "./components/Contacts";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="w-full overflow-hidden">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Testimonials />
      <Contacts />
      <Footer />
    </main>
  );
}