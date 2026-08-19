"use client";

import { useRef } from "react";
import Image from "next/image";

export function ImageLightbox({
  src,
  alt,
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        aria-label={`View ${alt} full screen`}
        className="relative block h-full w-full cursor-zoom-in"
        onClick={() => dialogRef.current?.showModal()}
      >
        <Image src={src} alt="" fill priority={priority} sizes={sizes} unoptimized className="object-contain" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`${alt} full-screen view`}
        className="fixed inset-0 m-0 h-dvh w-screen max-h-none max-w-none bg-black/95 p-4 text-white backdrop:bg-black/80 md:p-10"
      >
        <Image src={src} alt={alt} fill sizes="100vw" unoptimized className="object-contain p-4 md:p-10" />
        <button
          type="button"
          autoFocus
          className="absolute top-4 right-4 z-10 border border-white/40 bg-black/70 px-4 py-2 font-mono text-xs uppercase tracking-wider md:top-6 md:right-6"
          onClick={() => dialogRef.current?.close()}
        >
          Close
        </button>
      </dialog>
    </>
  );
}
