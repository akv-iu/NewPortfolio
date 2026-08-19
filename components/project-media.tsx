"use client";

import { useEffect, useRef } from "react";

import { isVideo } from "@/lib/layout";
import { ImageLightbox } from "@/components/image-lightbox";
import { useMotionEnabled, WipeIn } from "@/components/motion-primitives";

/**
 * Renders whatever you dropped into public/projects/.
 *
 *   media: "adeguard.png"   -> image
 *   media: "adeguard.mp4"   -> muted looping video
 *   media: ""               -> a slot telling you where to put the file
 *
 * No card, no border, no shadow. The image is the object.
 */
export function ProjectMedia({
  media,
  poster,
  title,
  slug,
  aspect,
  priority = false,
  sizes,
}: {
  media: string;
  poster?: string;
  title: string;
  slug: string;
  aspect: string;
  priority?: boolean;
  sizes: string;
}) {
  const motionOn = useMotionEnabled();
  const videoRef = useRef<HTMLVideoElement>(null);

  // autoPlay is only read at mount, so stopping a running clip takes a call.
  useEffect(() => {
    if (!motionOn) videoRef.current?.pause();
  }, [motionOn]);

  const shell = `relative w-full overflow-hidden rounded-media bg-raised ${aspect}`;

  if (!media) {
    return (
      <div className={`${shell} border border-dashed border-line`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          <p className="text-sm text-muted">Drop an image or video here</p>
          <code className="font-mono text-[11px] leading-relaxed text-faint">
            public/projects/{slug}.png
            <br />
            then set media: &quot;{slug}.png&quot; in lib/content.ts
          </code>
        </div>
      </div>
    );
  }

  const src = `/projects/${media}`;

  if (isVideo(media)) {
    return (
      <WipeIn className={shell}>
        <video
          ref={videoRef}
          className="h-full w-full object-contain"
          poster={poster ? `/projects/${poster}` : undefined}
          // Under reduced motion the clip waits for the user instead of looping.
          autoPlay={motionOn}
          loop={motionOn}
          controls={!motionOn}
          muted
          playsInline
          preload="metadata"
          aria-label={`${title} preview`}
        >
          <source src={src} />
        </video>
      </WipeIn>
    );
  }

  return (
    <WipeIn className={shell}>
      <ImageLightbox
        src={src}
        alt={`${title} preview`}
        priority={priority}
        sizes={sizes}
      />
    </WipeIn>
  );
}
