import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Toaster } from "./sonner";

describe("Sonner Toaster", () => {
  it("monta Sonner (región de notificaciones en document.body)", () => {
    render(<Toaster />);
    expect(
      document.querySelector('[aria-label="Notifications alt+T"]'),
    ).toBeTruthy();
  });
});
