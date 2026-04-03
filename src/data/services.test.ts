import { describe, it, expect } from "vitest";
import { services } from "./services";

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
