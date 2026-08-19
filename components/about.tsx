import { about, headings } from "@/lib/content";
import { ImageLightbox } from "@/components/image-lightbox";
import { Container, Meta, Section, SectionHeading } from "@/components/ui";
import { Reveal, WipeIn } from "@/components/motion-primitives";

/**
 * Text, then a photograph, then education.
 */
export function About() {
  return (
    <Section id="about">
      <Container>
        <Reveal>
          <SectionHeading index="03" title={headings.about} />
        </Reveal>

        <Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-12">
            <div className="flex flex-col gap-6 md:col-span-7 md:col-start-4">
              {about.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="max-w-[58ch] text-lg leading-relaxed text-muted md:text-xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>

      <Container className="mt-12 md:mt-16">
        <WipeIn>
          <div className="relative mx-auto aspect-[1080/1384] w-full max-w-2xl overflow-hidden rounded-media bg-raised">
            <ImageLightbox
              src={about.image}
              alt={about.imageAlt}
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        </WipeIn>
      </Container>

      <Container className="mt-16">
        <Reveal>
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-3">
              <Meta>Education</Meta>
            </div>

            <div className="md:col-span-9">
              {about.education.map((entry) => (
                <div
                  key={entry.degree}
                  className="grid gap-1 border-t border-line-soft py-5 sm:grid-cols-12 sm:gap-6"
                >
                  <p className="text-sm font-medium text-fg sm:col-span-4">{entry.degree}</p>
                  <p className="text-sm text-muted sm:col-span-5">{entry.org}</p>
                  <Meta className="sm:col-span-3">{entry.period}</Meta>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
