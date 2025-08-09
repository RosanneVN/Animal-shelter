import { vi } from 'vitest';

// Mock de la base de datos
export const db = {
  select: vi.fn(),
  insert: vi.fn(),
  delete: vi.fn(),
  update: vi.fn(),
};

// Mock de las tablas
export const CreditCardsDB = {
  id: 'creditcards_id',
  cardNumber: 'creditcards_cardNumber',
  cardHolderName: 'creditcards_cardHolderName',
  expirationDate: 'creditcards_expirationDate',
  cvv: 'creditcards_cvv',
  creditLimit: 'creditcards_creditLimit',
  currentBalance: 'creditcards_currentBalance'
};

export const Pets = {
  id: 'pets_id',
  petname: 'pets_petname',
  species: 'pets_species',
  fileId: 'pets_fileId'
};

export const AdoptionRequestsDB = {
  petId: 'adoption_petId'
};

// Mock de funciones de query
export const eq = vi.fn();
export const like = vi.fn();
export const count = vi.fn(() => ({ count: 'mocked_count' }));