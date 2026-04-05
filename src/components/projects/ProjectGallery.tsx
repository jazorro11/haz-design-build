"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { getGalleryCellClassName } from "@/lib/project-gallery-layout";

type GalleryImage = Project["images"][number];

/** En `false`, los pies de foto no se muestran al visitante (miniaturas y lightbox). */
const showImageCaptions = false;

const GRID_SIZES_FIRST =
  "(max-width: 768px) 100vw, (max-width: 1280px) 66vw, 50vw";
const GRID_SIZES_REST =
  "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw";
const LIGHTBOX_SIZES = "100vw";

export function ProjectGallery({
  projectName,
  images,
}: {
  projectName: string;
  images: GalleryImage[];
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = images.length;

  const openAt = useCallback((index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  }, []);

  const goPrev = useCallback(() => {
    setActiveIndex((i) => (i <= 0 ? total - 1 : i - 1));
  }, [total]);

  const goNext = useCallback(() => {
    setActiveIndex((i) => (i >= total - 1 ? 0 : i + 1));
  }, [total]);

  useEffect(() => {
    if (!lightboxOpen || total <= 1) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, total, goPrev, goNext]);

  if (total === 0) {
    return null;
  }

  const gridClass =
    total === 1
      ? "grid grid-cols-1 gap-4"
      : total === 2
        ? "grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4"
        : "grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-none md:gap-2 md:[grid-auto-rows:minmax(0,1fr)]";

  const current = images[activeIndex];

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Galería</h2>
      <div className={gridClass}>
        {images.map((image, index) => {
          const thumbLabel = image.caption
            ? `${projectName}, imagen ${index + 1} de ${total}: ${image.caption}. Ampliar`
            : `${projectName}, imagen ${index + 1} de ${total}. Ampliar`;
          return (
            <button
              key={index}
              type="button"
              aria-label={thumbLabel}
              onClick={() => openAt(index)}
              className={cn(
                "group relative block w-full min-h-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg",
                getGalleryCellClassName(index, total),
              )}
            >
              <span
                className={cn(
                  "absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-200",
                  "bg-background/15 opacity-100",
                  "[@media(hover:hover)_and_(pointer:fine)]:bg-background/0 [@media(hover:hover)_and_(pointer:fine)]:opacity-0",
                  "[@media(hover:hover)_and_(pointer:fine)]:group-hover:bg-background/20 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100",
                  "[@media(hover:hover)_and_(pointer:fine)]:group-focus-visible:bg-background/25 [@media(hover:hover)_and_(pointer:fine)]:group-focus-visible:opacity-100",
                )}
              >
                <span className="pointer-events-none flex items-center gap-2 rounded-full bg-background/90 px-3 py-1.5 text-caption font-medium text-foreground shadow-sm">
                  <Maximize2 className="size-4 shrink-0" aria-hidden />
                  Ampliar
                </span>
              </span>
              <OptimizedImage
                src={image.url}
                alt={
                  image.caption ||
                  `${projectName} - Imagen ${index + 1} de ${total}`
                }
                sizes={
                  index === 0 && total >= 3 ? GRID_SIZES_FIRST : GRID_SIZES_REST
                }
                className="image-cover"
              />
              {showImageCaptions && image.caption ? (
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 p-3 bg-gradient-to-t from-background/80 to-transparent">
                  <p className="text-caption text-foreground">{image.caption}</p>
                </div>
              ) : null}
            </button>
          );
        })}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          showCloseButton={false}
          className={cn(
            "fixed left-0 top-0 z-50 flex h-dvh max-h-dvh w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 border-0 bg-zinc-950 p-0 shadow-none duration-200 sm:rounded-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=open]:zoom-in-[1] data-[state=closed]:zoom-out-[1]",
            "data-[state=open]:slide-in-from-left-0 data-[state=open]:slide-in-from-top-0",
            "data-[state=closed]:slide-out-to-left-0 data-[state=closed]:slide-out-to-top-0",
          )}
        >
          <DialogTitle className="sr-only">
            {projectName}: imagen {activeIndex + 1} de {total}
            {current?.caption ? `. ${current.caption}` : ""}
          </DialogTitle>
          <DialogDescription className="sr-only">
            {total > 1
              ? "Use las flechas del teclado o los botones para cambiar de imagen."
              : "Imagen ampliada del proyecto."}
          </DialogDescription>

          <div className="relative flex min-h-0 flex-1 flex-col">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute right-3 top-3 z-30 h-11 w-11 rounded-full border border-zinc-600 bg-zinc-900/95 text-zinc-100 shadow-md hover:bg-zinc-800 hover:text-zinc-50 md:right-4 md:top-4"
                aria-label="Cerrar galería"
              >
                <X className="size-5" />
              </Button>
            </DialogClose>

            <p className="absolute left-1/2 top-3 z-20 -translate-x-1/2 text-caption text-zinc-100 md:top-4">
              {activeIndex + 1} / {total}
            </p>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 pt-14 pb-28 md:px-20 md:pb-24">
              {current ? (
                <div className="relative h-full w-full min-h-[40vh]">
                  <OptimizedImage
                    src={current.url}
                    alt={
                      current.caption ||
                      `${projectName} - Imagen ${activeIndex + 1} de ${total}`
                    }
                    sizes={LIGHTBOX_SIZES}
                    className="!object-contain h-full w-full"
                  />
                </div>
              ) : null}
            </div>

            {total > 1 ? (
              <>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute left-2 top-1/2 z-20 h-11 w-11 -translate-y-1/2 rounded-full border border-zinc-700 bg-zinc-900/90 text-zinc-100 shadow-md hover:bg-zinc-800 md:left-4"
                  onClick={goPrev}
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft className="size-6" />
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  className="absolute right-2 top-1/2 z-20 h-11 w-11 -translate-y-1/2 rounded-full border border-zinc-700 bg-zinc-900/90 text-zinc-100 shadow-md hover:bg-zinc-800 md:right-4"
                  onClick={goNext}
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight className="size-6" />
                </Button>
              </>
            ) : null}

            {showImageCaptions && current?.caption ? (
              <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-zinc-800 bg-zinc-950/95 px-4 py-3 md:px-6">
                <p className="text-center text-sm text-zinc-200">
                  {current.caption}
                </p>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
