import { describe, it, expect } from "vitest";
import { processSteps, services } from "./services";

describe("services data", () => {
  it("hay servicios definidos", () => {
    expect(services.length).toBeGreaterThan(0);
  });

  it("cada servicio tiene id, título y lista de features", () => {
    for (const s of services) {
      expect(s.id).toBeTruthy();
      expect(s.title).toBeTruthy();
      expect(Array.isArray(s.features)).toBe(true);
      expect(s.features.length).toBeGreaterThan(0);
    }
  });

  it("los ids de servicio son únicos", () => {
    const ids = services.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("processSteps (Cómo trabajamos)", () => {
  it("hay cinco pasos con número, título, descripción y duración", () => {
    expect(processSteps).toHaveLength(5);
    for (const step of processSteps) {
      expect(step.number).toMatch(/^\d{2}$/);
      expect(step.title.length).toBeGreaterThan(0);
      expect(step.description.length).toBeGreaterThan(0);
      expect(step.duration.length).toBeGreaterThan(0);
    }
  });

  it("los números de paso son únicos", () => {
    const nums = processSteps.map((s) => s.number);
    expect(new Set(nums).size).toBe(nums.length);
  });
});
