import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Experience } from "@/components/experience";
import { About } from "@/components/about";
import { StackSection } from "@/components/stack-section";
import { Contact, Footer } from "@/components/contact";

/**
 * One page, six sections, anchor navigation. Every string on it comes from
 * lib/content.ts.
 */
export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <Work />
        <About />
        <StackSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
