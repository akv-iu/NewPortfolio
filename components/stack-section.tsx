import { headings, stack } from "@/lib/content";
import { Container, Meta, Section, SectionHeading } from "@/components/ui";
import { Reveal, Stagger, StaggerItem } from "@/components/motion-primitives";

/**
 * Plain lists, not badges. A pill around every skill is filler geometry: it
 * adds twelve borders and communicates nothing the word did not already say.
 */
export function StackSection() {
  return (
    <Section id="stack">
      <Container>
        <Reveal>
          <SectionHeading index="04" title={headings.stack} />
        </Reveal>

        <Stagger className="mt-16" gap={0.05}>
          {stack.map((group) => (
            <StaggerItem key={group.group}>
              <div className="grid gap-3 border-t border-line-soft py-6 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3">
                  <Meta>{group.group}</Meta>
                </div>
                <p className="text-base leading-relaxed text-fg md:col-span-9">
                  {group.items.join(", ")}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </Section>
  );
}
