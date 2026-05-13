import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { AppTestShell } from "@/test/wrapAppShell";
import Contact from "@/views/Contact";

describe("Contact — formulario", () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  it("al enviar muestra toast de éxito cuando la API responde ok", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true }),
    } as Response);

    render(
      <AppTestShell>
        <Contact />
      </AppTestShell>,
    );

    fireEvent.change(screen.getByLabelText(/^Nombre/i), {
      target: { value: "Usuario prueba" },
    });
    fireEvent.change(screen.getByLabelText(/^Correo electrónico/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Mensaje/i), {
      target: { value: "Mensaje de prueba" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Enviar mensaje/i }));

    await waitFor(
      () => {
        expect(screen.getByText("Mensaje enviado")).toBeInTheDocument();
      },
      { timeout: 4000 },
    );
    expect(
      screen.getByText("Nos pondremos en contacto con usted pronto."),
    ).toBeInTheDocument();

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    );
  });

  it("al enviar muestra toast de error cuando la API falla", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: false,
      status: 500,
      json: () => Promise.resolve({ ok: false, error: "Error del servidor" }),
    } as Response);

    render(
      <AppTestShell>
        <Contact />
      </AppTestShell>,
    );

    fireEvent.change(screen.getByLabelText(/^Nombre/i), {
      target: { value: "Usuario prueba" },
    });
    fireEvent.change(screen.getByLabelText(/^Correo electrónico/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Mensaje/i), {
      target: { value: "Mensaje de prueba" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Enviar mensaje/i }));

    await waitFor(
      () => {
        expect(screen.getByText("No se pudo enviar")).toBeInTheDocument();
      },
      { timeout: 4000 },
    );
    expect(screen.getByText("Error del servidor")).toBeInTheDocument();
  });

  it("el Select de tipo de proyecto muestra el placeholder tras envío exitoso", async () => {
    vi.mocked(globalThis.fetch).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true }),
    } as Response);

    render(
      <AppTestShell>
        <Contact />
      </AppTestShell>,
    );

    // Open the Radix Select and choose "Comercial"
    const trigger = screen.getByRole("combobox");
    await act(async () => { fireEvent.click(trigger); });

    const option = screen.queryByRole("option", { name: /Comercial/i });
    if (option) {
      await act(async () => { fireEvent.click(option); });
    }

    fireEvent.change(screen.getByLabelText(/^Nombre/i), {
      target: { value: "Usuario prueba" },
    });
    fireEvent.change(screen.getByLabelText(/^Correo electrónico/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Mensaje/i), {
      target: { value: "Mensaje de prueba" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Enviar mensaje/i }));

    await waitFor(
      () => {
        expect(screen.getByText("Mensaje enviado")).toBeInTheDocument();
      },
      { timeout: 4000 },
    );

    // After success, Select must show placeholder (controlled state reset to "")
    expect(screen.getByRole("combobox")).toHaveTextContent(
      "Seleccione una opción",
    );
  });
});
