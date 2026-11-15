import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Process from "@/components/landing/Process";
import Results from "@/components/landing/Results";
import About from "@/components/landing/About";
import Contact from "@/components/landing/Contact";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <Results />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
