// src/test/schemas/CreditCards.schema.test.ts
import { describe, it, expect } from 'vitest';
import { 
  CreditCardsSchema, 
  deleteCreditCardsSchema, 
  updateCreditCardsSchema,
  type CreateCreditCardsInput,
  type UpdateCreditCardsInput 
} from '../../Backend/Schemas/CreditCards.schema';

// ========================================
// HELPER FUNCTION
// ========================================
/**
 * Helper para crear datos válidos de tarjeta de crédito
 * @param overrides - Campos que quieres sobrescribir del objeto base
 * @returns Objeto con datos válidos para CreditCardsSchema
 */
const createValidCreditCardData = (overrides: Partial<CreateCreditCardsInput> = {}): CreateCreditCardsInput => {
  const baseData: CreateCreditCardsInput = {
    cardNumber: '4532015112830366', // Número de tarjeta válido (formato Visa)
    numberPhone: 987654321,
    nameCard: 'Juan Carlos Pérez'
  };

  return { ...baseData, ...overrides };
};

describe('CreditCards Schemas', () => {
  
  // ========================================
  // TESTS PARA CreditCardsSchema
  // ========================================
  describe('CreditCardsSchema', () => {
    
    // ✅ TEST 1: Datos válidos completos
    it('should validate complete valid credit card data', () => {
      // Arrange - Usar helper sin cambios
      const validCreditCardData = createValidCreditCardData();

      // Act
      const result = CreditCardsSchema.safeParse(validCreditCardData);

      // Assert
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.cardNumber).toBe('4532015112830366');
        expect(result.data.numberPhone).toBe(987654321);
        expect(result.data.nameCard).toBe('Juan Carlos Pérez');
      }
    });

    // ✅ TEST 2: Diferentes datos válidos
    it('should validate different valid credit card data', () => {
      // Arrange - Usar helper con cambios
      const validCreditCardData = createValidCreditCardData({
        cardNumber: '5555555555554444', // Mastercard
        numberPhone: 123456789,
        nameCard: 'María García López'
      });

      // Act
      const result = CreditCardsSchema.safeParse(validCreditCardData);

      // Assert
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.cardNumber).toBe('5555555555554444');
        expect(result.data.numberPhone).toBe(123456789);
        expect(result.data.nameCard).toBe('María García López');
      }
    });

    // ✅ TEST 3: Números de tarjeta con diferentes formatos
    it('should validate various valid card number formats', () => {
      const validCardNumbers = [
        '4532015112830366',     // Visa
        '5555555555554444',     // Mastercard
        '378282246310005',      // American Express
        '6011111111111117',     // Discover
        '4000 0000 0000 0002',  // Con espacios
        '4000-0000-0000-0002'   // Con guiones
      ];

      validCardNumbers.forEach(cardNumber => {
        const data = createValidCreditCardData({ cardNumber });
        const result = CreditCardsSchema.safeParse(data);
        
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.cardNumber).toBe(cardNumber);
        }
      });
    });

    // ❌ TEST 4: cardNumber vacío (debe fallar)
    it('should reject empty cardNumber', () => {
      // Arrange - Solo cambiar el campo que queremos testear
      const invalidData = createValidCreditCardData({ 
        cardNumber: '' // ❌ Número de tarjeta vacío
      });

      // Act
      const result = CreditCardsSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.cardNumber).toContain('El numero de tarjeta es obligatorio');
      }
    });

    // ❌ TEST 5: numberPhone negativo (debe fallar)
    it('should reject negative numberPhone', () => {
      // Arrange
      const invalidData = createValidCreditCardData({ 
        numberPhone: -123456789 // ❌ Teléfono negativo
      });

      // Act
      const result = CreditCardsSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.numberPhone).toContain('El numero de telefono es obligatorio');
      }
    });

    // ❌ TEST 6: numberPhone cero (debe fallar)
    it('should reject zero numberPhone', () => {
      // Arrange
      const invalidData = createValidCreditCardData({ 
        numberPhone: 0 // ❌ Teléfono cero
      });

      // Act
      const result = CreditCardsSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.numberPhone).toContain('El numero de telefono es obligatorio');
      }
    });

    // ❌ TEST 7: numberPhone decimal (debe fallar)
    it('should reject decimal numberPhone', () => {
      // Arrange
      const invalidData = createValidCreditCardData({ 
        numberPhone: 123456789.5 // ❌ Teléfono decimal
      });

      // Act
      const result = CreditCardsSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.numberPhone).toBeDefined(); // Error por no ser entero
      }
    });

    // ❌ TEST 8: nameCard vacío (debe fallar)
    it('should reject empty nameCard', () => {
      // Arrange
      const invalidData = createValidCreditCardData({ 
        nameCard: '' // ❌ Nombre vacío
      });

      // Act
      const result = CreditCardsSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.nameCard).toContain('El nombre de la tarjeta es obligatorio');
      }
    });

    // ❌ TEST 9: Múltiples campos inválidos (debe fallar)
    it('should reject multiple invalid fields', () => {
      // Arrange - Múltiples errores
      const invalidData = createValidCreditCardData({ 
        cardNumber: '', // ❌ Vacío
        numberPhone: -999, // ❌ Negativo
        nameCard: '' // ❌ Vacío
      });

      // Act
      const result = CreditCardsSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.cardNumber).toBeDefined();
        expect(errors.numberPhone).toBeDefined();
        expect(errors.nameCard).toBeDefined();
        expect(Object.keys(errors)).toHaveLength(3); // 3 errores
      }
    });

    // ❌ TEST 10: Campos faltantes (debe fallar)
    it('should reject missing required fields', () => {
      // Arrange - Objeto incompleto
      const incompleteData = {
        cardNumber: '4532015112830366'
        // ❌ Faltan: numberPhone, nameCard
      };

      // Act
      const result = CreditCardsSchema.safeParse(incompleteData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.numberPhone).toBeDefined();
        expect(errors.nameCard).toBeDefined();
      }
    });

    // ✅ TEST 11: Datos válidos mínimos
    it('should validate minimal valid data', () => {
      // Arrange - Usar helper con valores mínimos
      const minimalData = createValidCreditCardData({
        cardNumber: '1', // Mínimo: 1 carácter
        numberPhone: 1, // Mínimo: 1 (positivo)
        nameCard: 'A' // Mínimo: 1 carácter
      });

      // Act
      const result = CreditCardsSchema.safeParse(minimalData);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.cardNumber).toBe('1');
        expect(result.data.numberPhone).toBe(1);
        expect(result.data.nameCard).toBe('A');
      }
    });

    // ✅ TEST 12: Nombres con caracteres especiales válidos
    it('should validate names with special characters', () => {
      const validNames = [
        'José María',           // Con acentos
        'O\'Connor',           // Con apostrofe
        'García-López',        // Con guión
        'Van Der Berg',        // Con espacios múltiples
        'François',            // Con ç
        'João',               // Con tilde
        'Müller'              // Con diéresis
      ];

      validNames.forEach(name => {
        const data = createValidCreditCardData({ nameCard: name });
        const result = CreditCardsSchema.safeParse(data);
        
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.nameCard).toBe(name);
        }
      });
    });

    // ✅ TEST 13: Números de teléfono grandes válidos
    it('should validate large phone numbers', () => {
      const validPhoneNumbers = [
        1,                    // Mínimo
        123456789,           // Normal
        987654321,           // Normal
        1234567890,          // 10 dígitos
        12345678901,         // 11 dígitos
        999999999999         // Número grande
      ];

      validPhoneNumbers.forEach(phone => {
        const data = createValidCreditCardData({ numberPhone: phone });
        const result = CreditCardsSchema.safeParse(data);
        
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.numberPhone).toBe(phone);
        }
      });
    });
  });

  // ========================================
  // TESTS PARA deleteCreditCardsSchema
  // ========================================
  describe('deleteCreditCardsSchema', () => {
    
    // ✅ TEST 14: UUID válido
    it('should validate valid UUID for deletion', () => {
      // Arrange
      const validUUID = {
        id: '123e4567-e89b-12d3-a456-426614174000'
      };

      // Act
      const result = deleteCreditCardsSchema.safeParse(validUUID);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe('123e4567-e89b-12d3-a456-426614174000');
      }
    });

    // ✅ TEST 15: Diferentes UUIDs válidos
    it('should validate different valid UUIDs', () => {
      const validUUIDs = [
        '550e8400-e29b-41d4-a716-446655440000',
        'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
        '123E4567-E89B-41D4-A716-446655440000', // Uppercase
        'F47AC10B-58CC-4372-A567-0E02B2C3D479'  // Uppercase
      ];

      validUUIDs.forEach(uuid => {
        const result = deleteCreditCardsSchema.safeParse({ id: uuid });
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.id).toBe(uuid);
        }
      });
    });

    // ❌ TEST 16: UUID inválido
    it('should reject invalid UUID for deletion', () => {
      // Arrange
      const invalidUUID = {
        id: 'not-a-valid-uuid'
      };

      // Act
      const result = deleteCreditCardsSchema.safeParse(invalidUUID);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.id).toContain('ID no válido');
      }
    });

    // ❌ TEST 17: Varios UUIDs inválidos
    it('should reject various invalid UUIDs', () => {
      const invalidUUIDs = [
        'too-short',
        '123-456-789',
        'not-uuid-format',
        '123456789012345678901234567890123456', // Muy largo
        '',                                      // Vacío
        '123e4567-e89b-41d4-a716',              // Incompleto
        '123e4567-e89b-41d4-a716-44665544000g'  // Carácter inválido
      ];

      invalidUUIDs.forEach(invalidId => {
        const result = deleteCreditCardsSchema.safeParse({ id: invalidId });
        expect(result.success).toBe(false);
      });
    });

    // ❌ TEST 18: ID faltante
    it('should reject missing ID field', () => {
      // Arrange
      const noIdData = {};

      // Act
      const result = deleteCreditCardsSchema.safeParse(noIdData);

      // Assert
      expect(result.success).toBe(false);
    });
  });

  // ========================================
  // TESTS PARA updateCreditCardsSchema
  // ========================================
  describe('updateCreditCardsSchema', () => {
    
    // ✅ TEST 19: Actualización parcial con un campo
    it('should validate partial update with cardNumber only', () => {
      // Arrange
      const partialUpdate: UpdateCreditCardsInput = {
        cardNumber: '4000000000000002'
      };

      // Act
      const result = updateCreditCardsSchema.safeParse(partialUpdate);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.cardNumber).toBe('4000000000000002');
        expect(result.data.numberPhone).toBeUndefined();
        expect(result.data.nameCard).toBeUndefined();
      }
    });

    // ✅ TEST 20: Actualización parcial con múltiples campos
    it('should validate partial update with multiple fields', () => {
      // Arrange
      const partialUpdate = {
        cardNumber: '5555555555554444',
        nameCard: 'Nuevo Nombre'
      };

      // Act
      const result = updateCreditCardsSchema.safeParse(partialUpdate);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.cardNumber).toBe('5555555555554444');
        expect(result.data.nameCard).toBe('Nuevo Nombre');
        expect(result.data.numberPhone).toBeUndefined();
      }
    });

    // ✅ TEST 21: Actualización parcial solo con teléfono
    it('should validate partial update with numberPhone only', () => {
      // Arrange
      const partialUpdate = {
        numberPhone: 555123456
      };

      // Act
      const result = updateCreditCardsSchema.safeParse(partialUpdate);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.numberPhone).toBe(555123456);
        expect(result.data.cardNumber).toBeUndefined();
        expect(result.data.nameCard).toBeUndefined();
      }
    });

    // ✅ TEST 22: Objeto vacío válido (todos opcionales)
    it('should validate empty object (all fields optional)', () => {
      // Arrange
      const emptyUpdate = {};

      // Act
      const result = updateCreditCardsSchema.safeParse(emptyUpdate);

      // Assert
      expect(result.success).toBe(true);
    });

    // ✅ TEST 23: Actualización completa válida
    it('should validate complete update', () => {
      // Arrange - Usar helper para actualización completa
      const completeUpdate = createValidCreditCardData({
        cardNumber: '6011111111111117',
        numberPhone: 777888999,
        nameCard: 'Tarjeta Actualizada'
      });

      // Act
      const result = updateCreditCardsSchema.safeParse(completeUpdate);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.cardNumber).toBe('6011111111111117');
        expect(result.data.numberPhone).toBe(777888999);
        expect(result.data.nameCard).toBe('Tarjeta Actualizada');
      }
    });

    // ❌ TEST 24: Datos inválidos en actualización parcial
    it('should reject invalid data in partial update', () => {
      // Arrange
      const invalidUpdate = {
        cardNumber: '', // ❌ Vacío
        numberPhone: -1, // ❌ Negativo
        nameCard: '' // ❌ Vacío
      };

      // Act
      const result = updateCreditCardsSchema.safeParse(invalidUpdate);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.cardNumber).toBeDefined();
        expect(errors.numberPhone).toBeDefined();
        expect(errors.nameCard).toBeDefined();
      }
    });

    // ❌ TEST 25: Solo campos inválidos individuales
    it('should reject individual invalid fields in updates', () => {
      // Test cardNumber vacío
      let result = updateCreditCardsSchema.safeParse({ cardNumber: '' });
      expect(result.success).toBe(false);

      // Test numberPhone negativo
      result = updateCreditCardsSchema.safeParse({ numberPhone: -123 });
      expect(result.success).toBe(false);

      // Test nameCard vacío
      result = updateCreditCardsSchema.safeParse({ nameCard: '' });
      expect(result.success).toBe(false);
    });
  });

  // ========================================
  // TESTS PARA TIPOS TypeScript
  // ========================================
  describe('TypeScript Types', () => {
    
    // ✅ TEST 26: Verificar tipo CreateCreditCardsInput
    it('should have correct CreateCreditCardsInput type', () => {
      // Arrange & Act - Usar helper para verificar tipo
      const creditCardData: CreateCreditCardsInput = createValidCreditCardData({
        cardNumber: 'Type Test Card',
        numberPhone: 123456789,
        nameCard: 'Type Test Name'
      });

      // Assert - Si compila, el tipo es correcto
      expect(creditCardData.cardNumber).toBe('Type Test Card');
      expect(typeof creditCardData.cardNumber).toBe('string');
      expect(typeof creditCardData.numberPhone).toBe('number');
      expect(typeof creditCardData.nameCard).toBe('string');
    });

    // ✅ TEST 27: Verificar tipo UpdateCreditCardsInput
    it('should have correct UpdateCreditCardsInput type', () => {
      // Arrange & Act
      const updateData: UpdateCreditCardsInput = {
        cardNumber: 'Updated Card'
        // Otros campos son opcionales
      };

      // Assert - Si compila, el tipo es correcto
      expect(updateData.cardNumber).toBe('Updated Card');
      expect(updateData.numberPhone).toBeUndefined();
      expect(updateData.nameCard).toBeUndefined();
    });

    // ✅ TEST 28: Verificar que helper funciona con partial
    it('should verify helper works with partial overrides', () => {
      // Arrange & Act
      const partialOverride = createValidCreditCardData({
        nameCard: 'Partial Test'
        // Otros campos mantienen valores por defecto
      });

      // Assert
      expect(partialOverride.nameCard).toBe('Partial Test');
      expect(partialOverride.cardNumber).toBe('4532015112830366'); // Valor por defecto
      expect(partialOverride.numberPhone).toBe(987654321); // Valor por defecto
    });
  });

  // ========================================
  // TESTS EDGE CASES
  // ========================================
  describe('Edge Cases', () => {
    
    // ✅ TEST 29: Números de teléfono en el límite
    it('should validate edge case phone numbers', () => {
      // Arrange
      const edgeCaseData = createValidCreditCardData({
        numberPhone: 1 // Mínimo positivo
      });

      // Act
      const result = CreditCardsSchema.safeParse(edgeCaseData);

      // Assert
      expect(result.success).toBe(true);
    });

    // ❌ TEST 30: Strings con solo espacios (deben fallar)
    it('should reject strings with only whitespace', () => {
      // Arrange
      const whitespaceData = createValidCreditCardData({
        cardNumber: '   ', // Solo espacios
        nameCard: '\t\t' // Solo tabs
      });

      // Act
      const result = CreditCardsSchema.safeParse(whitespaceData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.cardNumber).toBeDefined();
        expect(errors.nameCard).toBeDefined();
      }
    });

    // ❌ TEST 31: Tipos incorrectos
    it('should reject incorrect data types', () => {
      const incorrectTypes = [
        { cardNumber: 123456789 }, // Number en lugar de string
        { numberPhone: '123456789' }, // String en lugar de number
        { nameCard: 123 }, // Number en lugar de string
        { cardNumber: null }, // Null
        { numberPhone: undefined }, // Undefined
        { nameCard: true } // Boolean
      ];

      incorrectTypes.forEach(incorrectData => {
        const data = createValidCreditCardData(incorrectData as any);
        const result = CreditCardsSchema.safeParse(data);
        expect(result.success).toBe(false);
      });
    });
  });
});