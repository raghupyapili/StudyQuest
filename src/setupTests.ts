import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock matchMedia for components that use it (e.g., responsive design)
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock crypto.randomUUID
Object.defineProperty(globalThis.crypto, 'randomUUID', {
    value: () => 'test-uuid-' + Math.random().toString(36).substr(2, 9),
});

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock console.log to avoid clutter, but keep it available for debugging if needed
// global.console.log = vi.fn();
// global.console.error = vi.fn();
