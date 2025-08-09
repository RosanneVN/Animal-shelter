// src/test/schemas/AdoptionReq.schemas.test.ts
import { describe, it, expect } from 'vitest';
import { 
  AdoptionReqSchema, 
  deleteAdoptionReqSchema, 
  updateAdoptionReqSchema,
  type CreateAdoptionReqInput,
  type UpdateAdoptionReqInput 
} from '../../Backend/Schemas/AdoptionReq.schemas';

// ========================================
// HELPER FUNCTION
// ========================================
/**
 * Helper para crear datos válidos de solicitud de adopción
 * @param overrides - Campos que quieres sobrescribir del objeto base
 * @returns Objeto con datos válidos para AdoptionReqSchema
 */
const createValidAdoptionData = (overrides: Partial<CreateAdoptionReqInput> = {}): CreateAdoptionReqInput => {
  const baseData: CreateAdoptionReqInput = {
    fullname: 'Juan Carlos Pérez',
    age: 28,
    cellPhone: 987654321,
    alternativeCellPhone: 123456789,
    address: 'Calle Falsa 123, Ciudad',
    motivation: 'Me encantan los animales y quiero darle una buena vida',
    forWho: 'Para mi familia',
    petMoney: 'Si, tengo recursos suficientes',
    petFollowing: 'Si, estoy comprometido',
    notAbandoned: 'Nunca abandonaré a la mascota',
    ownHouse: 'Casa propia',
    agreeRent: 'Si, el propietario está de acuerdo',
    bigPlace: 'Si, tengo espacio suficiente',
    sleepPlace: 'Cama especial para mascotas',
    houseNotScape: 'Si, está bien asegurada',
    childrens: 'Si, tengo 2 niños',
    petAlergic: 'No, nadie es alérgico',
    family: 'Esposa e hijos',
    adoptionAgree: 'Si, todos estamos de acuerdo',
    howManyPets: 1,
    petsBefore: 'Si, he tenido mascotas antes',
    petsBeforeAlive: 'Si, todavía están vivas',
    job: 'Ingeniero de Software',
    iftravel: 'Muy pocas veces',
    petIfTravel: 'Se quedaría con mi familia',
    otherHouse: 'No, no hay otras casas',
    petDoctorClose: 'Si, hay veterinario cerca',
    vacunationSchema: 'Si, mantendré las vacunas al día',
    sterilizationOpinion: 'Estoy de acuerdo',
    youAgree: 'Si, acepto todos los términos',
    CImgFront: 'data:image/jpeg;base64,validBase64Front',
    CImgBack: 'data:image/jpeg;base64,validBase64Back',
    petId: '123e4567-e89b-12d3-a456-426614174000'
  };

  return { ...baseData, ...overrides };
};

describe('AdoptionReq Schemas', () => {
  
  // ========================================
  // TESTS PARA AdoptionReqSchema
  // ========================================
  describe('AdoptionReqSchema', () => {
    
    // ✅ TEST 1: Datos válidos completos
    it('should validate complete valid adoption request data', () => {
      // Arrange - Usar helper sin cambios
      const validAdoptionData = createValidAdoptionData();

      // Act
      const result = AdoptionReqSchema.safeParse(validAdoptionData);

      // Assert
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.fullname).toBe('Juan Carlos Pérez');
        expect(result.data.age).toBe(28);
        expect(result.data.cellPhone).toBe(987654321);
        expect(result.data.petId).toBe('123e4567-e89b-12d3-a456-426614174000');
      }
    });

    // ✅ TEST 2: Datos válidos con diferentes valores
    it('should validate adoption request with different valid values', () => {
      // Arrange - Usar helper con algunos cambios
      const validAdoptionData = createValidAdoptionData({
        fullname: 'María García López',
        age: 35,
        cellPhone: 555123456,
        motivation: 'Busco compañía para mi hogar',
        ownHouse: 'Alquilada',
        childrens: 'No tengo hijos',
        howManyPets: 0
      });

      // Act
      const result = AdoptionReqSchema.safeParse(validAdoptionData);

      // Assert
      expect(result.success).toBe(true);
      
      if (result.success) {
        expect(result.data.fullname).toBe('María García López');
        expect(result.data.age).toBe(35);
        expect(result.data.howManyPets).toBe(0);
      }
    });

    // ❌ TEST 3: Nombre vacío (debe fallar)
    it('should reject empty fullname', () => {
      // Arrange - Solo cambiar el campo que queremos testear
      const invalidData = createValidAdoptionData({ 
        fullname: '' // ❌ Nombre vacío
      });

      // Act
      const result = AdoptionReqSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.fullname).toContain('El nombre es obligatorio');
      }
    });

    // ❌ TEST 4: Edad negativa (debe fallar)
    it('should reject negative age', () => {
      // Arrange
      const invalidData = createValidAdoptionData({ 
        age: -5 // ❌ Edad negativa
      });

      // Act
      const result = AdoptionReqSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.age).toContain('La edad debe ser un número positivo');
      }
    });

    // ❌ TEST 5: Edad cero (debe fallar)
    it('should reject zero age', () => {
      // Arrange
      const invalidData = createValidAdoptionData({ 
        age: 0 // ❌ Edad cero
      });

      // Act
      const result = AdoptionReqSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.age).toContain('La edad debe ser un número positivo');
      }
    });

    // ❌ TEST 6: Teléfono negativo (debe fallar)
    it('should reject negative cellPhone', () => {
      // Arrange
      const invalidData = createValidAdoptionData({ 
        cellPhone: -123456789 // ❌ Teléfono negativo
      });

      // Act
      const result = AdoptionReqSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.cellPhone).toContain('El numero de telefono es obligatorio');
      }
    });

    // ❌ TEST 7: Teléfono alternativo negativo (debe fallar)
    it('should reject negative alternativeCellPhone', () => {
      // Arrange
      const invalidData = createValidAdoptionData({ 
        alternativeCellPhone: -987654321 // ❌ Teléfono alternativo negativo
      });

      // Act
      const result = AdoptionReqSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.alternativeCellPhone).toContain('El numero de telefono es obligatorio');
      }
    });

    // ❌ TEST 8: howManyPets negativo (debe fallar)
    it('should reject negative howManyPets', () => {
      // Arrange
      const invalidData = createValidAdoptionData({ 
        howManyPets: -1 // ❌ Número negativo
      });

      // Act
      const result = AdoptionReqSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.howManyPets).toContain('Este campo es obligarorio');
      }
    });

    // ❌ TEST 9: petId inválido (debe fallar)
    it('should reject invalid petId UUID', () => {
      // Arrange
      const invalidData = createValidAdoptionData({ 
        petId: 'not-a-valid-uuid' // ❌ UUID inválido
      });

      // Act
      const result = AdoptionReqSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.petId).toContain('ID no válido');
      }
    });

    // ❌ TEST 10: Múltiples campos vacíos (debe fallar)
    it('should reject multiple empty fields', () => {
      // Arrange - Cambiar múltiples campos a vacío
      const invalidData = createValidAdoptionData({ 
        fullname: '', // ❌ Vacío
        address: '', // ❌ Vacío
        motivation: '', // ❌ Vacío
        job: '', // ❌ Vacío
        CImgFront: '', // ❌ Vacío
        CImgBack: '' // ❌ Vacío
      });

      // Act
      const result = AdoptionReqSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.fullname).toBeDefined();
        expect(errors.address).toBeDefined();
        expect(errors.motivation).toBeDefined();
        expect(errors.job).toBeDefined();
        expect(errors.CImgFront).toBeDefined();
        expect(errors.CImgBack).toBeDefined();
      }
    });

    // ❌ TEST 11: Múltiples errores de números negativos
    it('should handle multiple negative number errors', () => {
      // Arrange - Múltiples números negativos
      const invalidData = createValidAdoptionData({ 
        age: -25, // ❌ Edad negativa
        cellPhone: -123456789, // ❌ Teléfono negativo
        alternativeCellPhone: -987654321, // ❌ Teléfono alternativo negativo
        howManyPets: -5 // ❌ Número de mascotas negativo
      });

      // Act
      const result = AdoptionReqSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.age).toBeDefined();
        expect(errors.cellPhone).toBeDefined();
        expect(errors.alternativeCellPhone).toBeDefined();
        expect(errors.howManyPets).toBeDefined();
      }
    });

    // ✅ TEST 12: Datos válidos mínimos (valores más cortos)
    it('should validate minimal valid data', () => {
      // Arrange - Usar helper con valores mínimos
      const minimalData = createValidAdoptionData({
        fullname: 'A',
        address: 'X',
        motivation: 'B',
        forWho: 'C',
        petMoney: 'D',
        petFollowing: 'E',
        notAbandoned: 'F',
        ownHouse: 'G',
        agreeRent: 'H',
        bigPlace: 'I',
        sleepPlace: 'J',
        houseNotScape: 'K',
        childrens: 'L',
        petAlergic: 'M',
        family: 'N',
        adoptionAgree: 'O',
        petsBefore: 'P',
        petsBeforeAlive: 'Q',
        job: 'R',
        iftravel: 'S',
        petIfTravel: 'T',
        otherHouse: 'U',
        petDoctorClose: 'V',
        vacunationSchema: 'W',
        sterilizationOpinion: 'X',
        youAgree: 'Y',
        CImgFront: 'Z',
        CImgBack: 'AA',
        age: 1,
        cellPhone: 1,
        alternativeCellPhone: 1,
        howManyPets: 0
      });

      // Act
      const result = AdoptionReqSchema.safeParse(minimalData);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.fullname).toBe('A');
        expect(result.data.age).toBe(1);
      }
    });

    // ❌ TEST 13: Campos específicos vacíos uno por uno
    it('should reject empty address', () => {
      const invalidData = createValidAdoptionData({ address: '' });
      const result = AdoptionReqSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.address).toBeDefined();
      }
    });

    it('should reject empty motivation', () => {
      const invalidData = createValidAdoptionData({ motivation: '' });
      const result = AdoptionReqSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.motivation).toBeDefined();
      }
    });

    it('should reject empty job', () => {
      const invalidData = createValidAdoptionData({ job: '' });
      const result = AdoptionReqSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.job).toBeDefined();
      }
    });
  });

  // ========================================
  // TESTS PARA deleteAdoptionReqSchema
  // ========================================
  describe('deleteAdoptionReqSchema', () => {
    
    // ✅ TEST 14: UUID válido
    it('should validate valid UUID for deletion', () => {
      // Arrange
      const validUUID = {
        id: '123e4567-e89b-12d3-a456-426614174000'
      };

      // Act
      const result = deleteAdoptionReqSchema.safeParse(validUUID);

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
        '6ba7b810-9dad-11d1-80b4-00c04fd430c8'
      ];

      validUUIDs.forEach(uuid => {
        const result = deleteAdoptionReqSchema.safeParse({ id: uuid });
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
      const result = deleteAdoptionReqSchema.safeParse(invalidUUID);

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
        ''
      ];

      invalidUUIDs.forEach(invalidId => {
        const result = deleteAdoptionReqSchema.safeParse({ id: invalidId });
        expect(result.success).toBe(false);
      });
    });

    // ❌ TEST 18: ID faltante
    it('should reject missing ID field', () => {
      // Arrange
      const noIdData = {};

      // Act
      const result = deleteAdoptionReqSchema.safeParse(noIdData);

      // Assert
      expect(result.success).toBe(false);
    });
  });

  // ========================================
  // TESTS PARA updateAdoptionReqSchema
  // ========================================
  describe('updateAdoptionReqSchema', () => {
    
    // ✅ TEST 19: isApproved true válido
    it('should validate isApproved true', () => {
      // Arrange
      const approveData: UpdateAdoptionReqInput = {
        isApproved: true
      };

      // Act
      const result = updateAdoptionReqSchema.safeParse(approveData);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.isApproved).toBe(true);
      }
    });

    // ✅ TEST 20: isApproved false válido
    it('should validate isApproved false', () => {
      // Arrange
      const rejectData = {
        isApproved: false
      };

      // Act
      const result = updateAdoptionReqSchema.safeParse(rejectData);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.isApproved).toBe(false);
      }
    });

    // ❌ TEST 21: isApproved no booleano
    it('should reject non-boolean isApproved values', () => {
      const invalidValues = [
        'true',  // String
        'false', // String
        1,       // Number
        0,       // Number
        'yes',   // String
        'no',    // String
        null,    // Null
        undefined // Undefined
      ];

      invalidValues.forEach(invalidValue => {
        const result = updateAdoptionReqSchema.safeParse({ 
          isApproved: invalidValue 
        });
        expect(result.success).toBe(false);
      });
    });

    // ❌ TEST 22: Campo faltante
    it('should reject missing isApproved field', () => {
      // Arrange
      const emptyData = {};

      // Act
      const result = updateAdoptionReqSchema.safeParse(emptyData);

      // Assert
      expect(result.success).toBe(false);
    });
  });

  // ========================================
  // TESTS PARA TIPOS TypeScript
  // ========================================
  describe('TypeScript Types', () => {
    
    // ✅ TEST 23: Verificar tipo CreateAdoptionReqInput
    it('should have correct CreateAdoptionReqInput type', () => {
      // Arrange & Act - Usar helper para verificar tipo
      const adoptionData: CreateAdoptionReqInput = createValidAdoptionData({
        fullname: 'Type Test User',
        age: 25
      });

      // Assert - Si compila, el tipo es correcto
      expect(adoptionData.fullname).toBe('Type Test User');
      expect(typeof adoptionData.age).toBe('number');
      expect(typeof adoptionData.cellPhone).toBe('number');
      expect(typeof adoptionData.howManyPets).toBe('number');
    });

    // ✅ TEST 24: Verificar tipo UpdateAdoptionReqInput
    it('should have correct UpdateAdoptionReqInput type', () => {
      // Arrange & Act
      const updateData: UpdateAdoptionReqInput = {
        isApproved: true
      };

      // Assert - Si compila, el tipo es correcto
      expect(updateData.isApproved).toBe(true);
      expect(typeof updateData.isApproved).toBe('boolean');
    });

    // ✅ TEST 25: Verificar que helper funciona con partial
    it('should verify helper works with partial overrides', () => {
      // Arrange & Act - Helper acepta Partial<CreateAdoptionReqInput>
      const partialOverride = createValidAdoptionData({
        fullname: 'Partial Test',
        age: 30
        // Otros campos mantienen valores por defecto
      });

      // Assert
      expect(partialOverride.fullname).toBe('Partial Test');
      expect(partialOverride.age).toBe(30);
      expect(partialOverride.cellPhone).toBe(987654321); // Valor por defecto
      expect(partialOverride.address).toBe('Calle Falsa 123, Ciudad'); // Valor por defecto
    });
  });

  // ========================================
  // TESTS EDGE CASES
  // ========================================
  describe('Edge Cases', () => {
    
    // ✅ TEST 26: Números en el límite
    it('should validate edge case numbers', () => {
      // Arrange
      const edgeCaseData = createValidAdoptionData({
        age: 1, // Mínimo positivo
        cellPhone: 1, // Mínimo positivo
        alternativeCellPhone: 1, // Mínimo positivo
        howManyPets: 0 // Mínimo (incluye cero)
      });

      // Act
      const result = AdoptionReqSchema.safeParse(edgeCaseData);

      // Assert
      expect(result.success).toBe(true);
    });

    // ❌ TEST 27: Strings con solo espacios (deben fallar)
    it('should reject strings with only whitespace', () => {
      // Arrange
      const whitespaceData = createValidAdoptionData({
        fullname: '   ', // Solo espacios
        address: '\t\t', // Solo tabs
        motivation: '\n\n' // Solo saltos de línea
      });

      // Act
      const result = AdoptionReqSchema.safeParse(whitespaceData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.fullname).toBeDefined();
        expect(errors.address).toBeDefined();
        expect(errors.motivation).toBeDefined();
      }
    });

    // ✅ TEST 28: UUIDs con diferentes formatos válidos
    it('should validate UUID with different valid formats', () => {
      const validUUIDs = [
        '123e4567-e89b-41d4-a716-446655440000', // Lowercase
        '123E4567-E89B-41D4-A716-446655440000', // Uppercase
        'F47AC10B-58CC-4372-A567-0E02B2C3D479'  // Mixed case
      ];

      validUUIDs.forEach(uuid => {
        const data = createValidAdoptionData({ petId: uuid });
        const result = AdoptionReqSchema.safeParse(data);
        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.petId).toBe(uuid);
        }
      });
    });
  });
});