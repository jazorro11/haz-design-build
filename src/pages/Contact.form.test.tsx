import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AppTestShell } from "@/test/wrapAppShell";

describe("Contact — formulario", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it(
    "al enviar muestra toast de éxito tras la simulación (sin VITE_CONTACT_API_URL)",
    async () => {
      vi.stubEnv("VITE_CONTACT_API_URL", "");
      render(<AppTestShell initialPath="/contacto" />);

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
    },
    10_000,
  );

  it(
    "con VITE_CONTACT_API_URL hace POST JSON al endpoint /contact",
    async () => {
      vi.stubEnv("VITE_CONTACT_API_URL", "https://api.example.test");
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ ok: "true" }),
      });
      vi.stubGlobal("fetch", fetchMock);

      render(<AppTestShell initialPath="/contacto" />);

      fireEvent.change(screen.getByLabelText(/^Nombre/i), {
        target: { value: "Ana" },
      });
      fireEvent.change(screen.getByLabelText(/^Correo electrónico/i), {
        target: { value: "ana@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/^Mensaje/i), {
        target: { value: "Hola" },
      });

      fireEvent.click(screen.getByRole("button", { name: /Enviar mensaje/i }));

      await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1), {
        timeout: 4000,
      });

      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.example.test/contact",
        expect.objectContaining({
          method: "POST",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        }),
      );
      const init = fetchMock.mock.calls[0][1] as RequestInit;
      const body = JSON.parse(init.body as string) as Record<string, unknown>;
      expect(body.name).toBe("Ana");
      expect(body.email).toBe("ana@example.com");
      expect(body.message).toBe("Hola");

      await waitFor(() =>
        expect(screen.getByText("Mensaje enviado")).toBeInTheDocument(),
      );
    },
    10_000,
  );

  it("si el servidor responde error muestra toast destructivo", async () => {
    vi.stubEnv("VITE_CONTACT_API_URL", "https://api.example.test");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 502,
        json: async () => ({ detail: "No se pudo guardar el mensaje" }),
      }),
    );

    render(<AppTestShell initialPath="/contacto" />);

    fireEvent.change(screen.getByLabelText(/^Nombre/i), {
      target: { value: "Ana" },
    });
    fireEvent.change(screen.getByLabelText(/^Correo electrónico/i), {
      target: { value: "ana@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/^Mensaje/i), {
      target: { value: "Hola" },
    });
    fireEvent.click(screen.getByRole("button", { name: /Enviar mensaje/i }));

    await waitFor(() =>
      expect(screen.getByText("No se pudo enviar")).toBeInTheDocument(),
    );
    expect(
      screen.getByText("No se pudo guardar el mensaje"),
    ).toBeInTheDocument();
  });
});
