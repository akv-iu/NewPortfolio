import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Work } from "@/components/work";
import { Experience } from "@/components/experience";
import { StackSection } from "@/components/stack-section";
import { Contact, Footer } from "@/components/contact";

/**
 * One page, five sections, anchor navigation. Every string on it comes from
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
        <StackSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
