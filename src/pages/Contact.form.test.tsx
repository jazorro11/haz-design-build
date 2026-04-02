import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AppTestShell } from "@/test/wrapAppShell";

describe("Contact — formulario", () => {
  it(
    "al enviar muestra toast de éxito tras la simulación",
    async () => {
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
});
