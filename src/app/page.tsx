import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Activity } from "@/components/Activity";
import { Skills } from "@/components/Skills";
import { Credentials } from "@/components/Credentials";
import { Contact, Footer } from "@/components/Contact";

export default function Page() {
  return (
    <>
      <TopNav />
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8 lg:px-12">
        <main id="main" className="space-y-16 sm:space-y-20">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Activity />
          <Skills />
          <Credentials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
