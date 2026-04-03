import { vi } from "vitest";

/** Mutable pathname for tests; reset in `beforeEach` when needed. */
export const mockUsePathname = vi.fn(() => "/");
