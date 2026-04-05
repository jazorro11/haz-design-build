import { cn } from "@/lib/utils";

/**
 * Clases Tailwind para celdas de la galería según índice y total.
 * En md+: rejilla de 4 columnas; la primera imagen ocupa 2x2 cuando hay 3 o más.
 */
export function getGalleryCellClassName(index: number, total: number): string {
  const base =
    "relative min-h-0 overflow-hidden rounded-lg bg-muted transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.01]";

  if (total <= 0) {
    return base;
  }

  if (total === 1) {
    return cn(base, "col-span-1 aspect-video w-full md:aspect-project");
  }

  if (total === 2) {
    return cn(base, "col-span-1 aspect-project w-full");
  }

  if (index === 0) {
    return cn(
      base,
      "col-span-1 aspect-project w-full md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[min(70vh,28rem)]",
    );
  }

  return cn(
    base,
    "col-span-1 aspect-project w-full md:col-span-1 md:row-span-1 md:aspect-auto md:h-full",
  );
}
