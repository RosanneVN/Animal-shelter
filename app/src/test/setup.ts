import { beforeEach, vi } from 'vitest';

// Configuración global para todos los tests
beforeEach(() => {
  // Limpiar todos los mocks antes de cada test
  vi.clearAllMocks();
  
  // Silenciar console.log durante tests
  vi.spyOn(console, 'log').mockImplementation(() => {});
  vi.spyOn(console, 'error').mockImplementation(() => {});
  vi.spyOn(console, 'warn').mockImplementation(() => {});
});