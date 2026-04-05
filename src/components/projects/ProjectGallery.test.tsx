import { describe, it, expect } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import { ProjectGallery } from "./ProjectGallery";

const threeImages = [
  { url: "/gallery-1.png", caption: "Foto uno", stage: "completed" as const },
  { url: "/gallery-2.png", caption: "Foto dos", stage: "completed" as const },
  { url: "/gallery-3.png", caption: "Foto tres", stage: "completed" as const },
];

const oneImage = [
  { url: "/solo.png", caption: "Única", stage: "completed" as const },
];

describe("ProjectGallery — lightbox", () => {
  it("con images vacío no muestra el bloque Galería", () => {
    render(<ProjectGallery projectName="Proyecto X" images={[]} />);
    expect(
      screen.queryByRole("heading", { name: /^Galería$/ }),
    ).not.toBeInTheDocument();
  });

  it("cada miniatura tiene aria-label distinto con índice y pie", () => {
    render(<ProjectGallery projectName="Obra demo" images={threeImages} />);
    expect(
      screen.getByRole("button", {
        name: /Obra demo, imagen 1 de 3: Foto uno\. Ampliar/,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Obra demo, imagen 2 de 3: Foto dos\. Ampliar/,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Obra demo, imagen 3 de 3: Foto tres\. Ampliar/,
      }),
    ).toBeInTheDocument();
  });

  it("abre el lightbox en la miniatura elegida y muestra el contador", async () => {
    render(<ProjectGallery projectName="Obra demo" images={threeImages} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Obra demo, imagen 2 de 3: Foto dos\. Ampliar/,
      }),
    );

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    expect(screen.getByText("2 / 3")).toBeInTheDocument();
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByText("Foto dos")).toBeInTheDocument();
  });

  it("el botón siguiente en la última imagen vuelve a la primera", async () => {
    render(<ProjectGallery projectName="Obra demo" images={threeImages} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Obra demo, imagen 3 de 3: Foto tres\. Ampliar/,
      }),
    );

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    expect(screen.getByText("3 / 3")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /Imagen siguiente/i }));
    await waitFor(() => {
      expect(screen.getByText("1 / 3")).toBeInTheDocument();
    });
  });

  it("con el lightbox abierto, ArrowRight en window avanza la imagen", async () => {
    render(<ProjectGallery projectName="Obra demo" images={threeImages} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Obra demo, imagen 1 de 3: Foto uno\. Ampliar/,
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("1 / 3")).toBeInTheDocument();
    });

    fireEvent.keyDown(window, { key: "ArrowRight", bubbles: true });

    await waitFor(() => {
      expect(screen.getByText("2 / 3")).toBeInTheDocument();
    });
  });

  it("con el lightbox abierto, ArrowLeft desde la primera va a la última", async () => {
    render(<ProjectGallery projectName="Obra demo" images={threeImages} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Obra demo, imagen 1 de 3: Foto uno\. Ampliar/,
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("1 / 3")).toBeInTheDocument();
    });

    fireEvent.keyDown(window, { key: "ArrowLeft", bubbles: true });

    await waitFor(() => {
      expect(screen.getByText("3 / 3")).toBeInTheDocument();
    });
  });

  it("cierra el lightbox con el botón Cerrar galería", async () => {
    render(<ProjectGallery projectName="Obra demo" images={threeImages} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Obra demo, imagen 1 de 3: Foto uno\. Ampliar/,
      }),
    );

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /Cerrar galería/i }));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("con una sola imagen muestra 1 / 1 y no muestra flechas anterior ni siguiente", async () => {
    render(<ProjectGallery projectName="Solo obra" images={oneImage} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Solo obra, imagen 1 de 1: Única\. Ampliar/,
      }),
    );

    await waitFor(() => {
      expect(screen.getByText("1 / 1")).toBeInTheDocument();
    });

    expect(
      screen.queryByRole("button", { name: /Imagen anterior/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Imagen siguiente/i }),
    ).not.toBeInTheDocument();
  });

  it("cierra el lightbox con la tecla Escape", async () => {
    render(<ProjectGallery projectName="Obra demo" images={threeImages} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: /Obra demo, imagen 1 de 3: Foto uno\. Ampliar/,
      }),
    );

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument();
    });

    fireEvent.keyDown(screen.getByRole("dialog"), {
      key: "Escape",
      code: "Escape",
      bubbles: true,
    });

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });
});
