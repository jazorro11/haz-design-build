import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("omite valores falsy en la fusión de clases", () => {
    expect(cn("a", undefined, false, "", "c")).toBe("a c");
  });

  it("resuelve conflictos de Tailwind con tailwind-merge", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });
});
