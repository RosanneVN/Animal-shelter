// src/test/schemas/Adoption.schemas.test.ts
import { describe, it, expect } from 'vitest';
import { 
  PetsSchema, 
  deletePetsSchema, 
  updatePetSchema,
  type CreatePetInput,
  type UpdatePetInput 
} from '../../Backend/Schemas/Adoption.schemas';

describe('Adoption Schemas', () => {
  // ========================================
  // TESTS PARA PetsSchema
  // ========================================
  describe('PetsSchema', () => {
    
    //  TEST 1: Datos válidos completos
    it('should validate complete valid pet data', () => {
      // Arrange (Preparar datos de prueba)
      const validPetData: CreatePetInput = {
        petname: 'Max',
        age: 3,
        species: 'perro',
        gender: 'macho',
        img: 'https://example.com/max.jpg'
      };

      // Act (Ejecutar la validación)
      const result = PetsSchema.safeParse(validPetData);

      // Assert (Verificar resultados)
      expect(result.success).toBe(true);
      
      // Verificación adicional: si es exitoso, verificar los datos
      if (result.success) {
        expect(result.data.petname).toBe('Max');
        expect(result.data.age).toBe(3);
        expect(result.data.species).toBe('perro');
        expect(result.data.gender).toBe('macho');
        expect(result.data.img).toBe('https://example.com/max.jpg');
      }
    });

    //  TEST 2: Datos válidos con gato hembra
    it('should validate cat female data', () => {
      // Arrange
      const validCatData = {
        petname: 'Luna',
        age: 2,
        species: 'gato' as const, // 'as const' para type safety
        gender: 'hembra' as const,
        img: 'https://example.com/luna.jpg'
      };

      // Act
      const result = PetsSchema.safeParse(validCatData);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.species).toBe('gato');
        expect(result.data.gender).toBe('hembra');
      }
    });

    //  TEST 3: Nombre vacío (debe fallar)
    it('should reject empty petname', () => {
      // Arrange
      const invalidData = {
        petname: '', //  Nombre vacío
        age: 3,
        species: 'perro',
        gender: 'macho',
        img: 'https://example.com/test.jpg'
      };

      // Act
      const result = PetsSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.petname).toContain('El nombre es obligatorio');
      }
    });

    //  TEST 4: Edad negativa (debe fallar)
    it('should reject negative age', () => {
      // Arrange
      const invalidData = {
        petname: 'Max',
        age: -1, //  Edad negativa
        species: 'perro',
        gender: 'macho',
        img: 'https://example.com/test.jpg'
      };

      // Act
      const result = PetsSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.age).toContain('La edad debe ser un número positivo');
      }
    });

    //  TEST 5: Edad cero (debe fallar)
    it('should reject zero age', () => {
      // Arrange
      const invalidData = {
        petname: 'Max',
        age: 0, //  Edad cero
        species: 'perro',
        gender: 'macho',
        img: 'https://example.com/test.jpg'
      };

      // Act
      const result = PetsSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.age).toContain('La edad debe ser un número positivo');
      }
    });

    //  TEST 6: Edad decimal (debe fallar porque requiere entero)
    it('should reject decimal age', () => {
      // Arrange
      const invalidData = {
        petname: 'Max',
        age: 2.5, //  Edad decimal
        species: 'perro',
        gender: 'macho',
        img: 'https://example.com/test.jpg'
      };

      // Act
      const result = PetsSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.age).toBeDefined();
      }
    });

    //  TEST 7: Especie inválida (debe fallar)
    it('should reject invalid species', () => {
      // Arrange
      const invalidData = {
        petname: 'Max',
        age: 3,
        species: 'pájaro', //  Especie no permitida
        gender: 'macho',
        img: 'https://example.com/test.jpg'
      };

      // Act
      const result = PetsSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.species).toContain('La especie es obligatoria');
      }
    });

    //  TEST 8: Género inválido (debe fallar)
    it('should reject invalid gender', () => {
      // Arrange
      const invalidData = {
        petname: 'Max',
        age: 3,
        species: 'perro',
        gender: 'neutro', //  Género no permitido
        img: 'https://example.com/test.jpg'
      };

      // Act
      const result = PetsSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.gender).toContain('El género es obligatorio');
      }
    });

    //  TEST 9: URL de imagen inválida (debe fallar)
    it('should reject invalid image URL', () => {
      // Arrange
      const invalidData = {
        petname: 'Max',
        age: 3,
        species: 'perro',
        gender: 'macho',
        img: 'not-a-valid-url' //  URL inválida
      };

      // Act
      const result = PetsSchema.safeParse(invalidData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.img).toContain('La imagen es obligatoria');
      }
    });

    //  TEST 10: Campos faltantes (debe fallar)
    it('should reject missing required fields', () => {
      // Arrange
      const incompleteData = {
        petname: 'Max'
        //  Faltan: age, species, gender, img
      };

      // Act
      const result = PetsSchema.safeParse(incompleteData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.age).toBeDefined();
        expect(errors.species).toBeDefined();
        expect(errors.gender).toBeDefined();
        expect(errors.img).toBeDefined();
      }
    });

    //  TEST 11: Múltiples errores a la vez
    it('should handle multiple validation errors', () => {
      // Arrange
      const multipleErrorsData = {
        petname: '', //  Vacío
        age: -5,     //  Negativo
        species: 'invalid', //  No permitido
        gender: 'invalid',  //  No permitido
        img: 'not-url'      //  URL inválida
      };

      // Act
      const result = PetsSchema.safeParse(multipleErrorsData);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(Object.keys(errors)).toHaveLength(5); // 5 errores
        expect(errors.petname).toBeDefined();
        expect(errors.age).toBeDefined();
        expect(errors.species).toBeDefined();
        expect(errors.gender).toBeDefined();
        expect(errors.img).toBeDefined();
      }
    });
  });

  // ========================================
  // TESTS PARA deletePetsSchema
  // ========================================
  describe('deletePetsSchema', () => {
    
    // TEST 12: UUID válido
    it('should validate valid UUID', () => {
      // Arrange
      const validUUID = {
        id: '123e4567-e89b-12d3-a456-426614174000'
      };

      // Act
      const result = deletePetsSchema.safeParse(validUUID);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe('123e4567-e89b-12d3-a456-426614174000');
      }
    });

    //  TEST 13: String válido (tu schema acepta ambos)
    it('should validate regular string ID', () => {
      // Arrange
      const validStringId = {
        id: 'pet-123'
      };

      // Act
      const result = deletePetsSchema.safeParse(validStringId);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.id).toBe('pet-123');
      }
    });

    //  TEST 14: ID vacío (debe fallar)
    it('should reject empty ID', () => {
      // Arrange
      const emptyId = {
        id: ''
      };

      // Act
      const result = deletePetsSchema.safeParse(emptyId);

      // Assert
      expect(result.success).toBe(false);
    });

    //  TEST 15: Sin campo ID (debe fallar)
    it('should reject missing ID field', () => {
      // Arrange
      const noIdData = {};

      // Act
      const result = deletePetsSchema.safeParse(noIdData);

      // Assert
      expect(result.success).toBe(false);
    });
  });

  // ========================================
  // TESTS PARA updatePetSchema
  // ========================================
  describe('updatePetSchema', () => {
    
    //  TEST 16: Actualización parcial válida
    it('should validate partial update with one field', () => {
      // Arrange
      const partialUpdate: UpdatePetInput = {
        petname: 'Nuevo Nombre'
      };

      // Act
      const result = updatePetSchema.safeParse(partialUpdate);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.petname).toBe('Nuevo Nombre');
        expect(result.data.age).toBeUndefined();
      }
    });

    //  TEST 17: Actualización de múltiples campos
    it('should validate partial update with multiple fields', () => {
      // Arrange
      const partialUpdate = {
        petname: 'Buddy',
        age: 5
      };

      // Act
      const result = updatePetSchema.safeParse(partialUpdate);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.petname).toBe('Buddy');
        expect(result.data.age).toBe(5);
        expect(result.data.species).toBeUndefined();
      }
    });

    //  TEST 18: Objeto vacío válido (todos opcionales)
    it('should validate empty object (all fields optional)', () => {
      // Arrange
      const emptyUpdate = {};

      // Act
      const result = updatePetSchema.safeParse(emptyUpdate);

      // Assert
      expect(result.success).toBe(true);
    });

    //  TEST 19: Datos inválidos en actualización parcial
    it('should reject invalid data in partial update', () => {
      // Arrange
      const invalidUpdate = {
        petname: '', // Nombre vacío
        age: -1      // Edad negativa
      };

      // Act
      const result = updatePetSchema.safeParse(invalidUpdate);

      // Assert
      expect(result.success).toBe(false);
      
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        expect(errors.petname).toBeDefined();
        expect(errors.age).toBeDefined();
      }
    });

    // TEST 20: Actualización completa válida
    it('should validate complete update', () => {
      // Arrange
      const completeUpdate = {
        petname: 'Rocky',
        age: 4,
        species: 'gato' as const,
        gender: 'hembra' as const,
        img: 'https://example.com/rocky.jpg'
      };

      // Act
      const result = updatePetSchema.safeParse(completeUpdate);

      // Assert
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.petname).toBe('Rocky');
        expect(result.data.age).toBe(4);
        expect(result.data.species).toBe('gato');
        expect(result.data.gender).toBe('hembra');
      }
    });
  });

  // ========================================
  // TESTS PARA TIPOS TypeScript
  // ========================================
  describe('TypeScript Types', () => {
    
    //  TEST 21: Verificar tipo CreatePetInput
    it('should have correct CreatePetInput type', () => {
      // Arrange & Act
      const petData: CreatePetInput = {
        petname: 'Test',
        age: 1,
        species: 'perro',
        gender: 'macho',
        img: 'https://test.com/img.jpg'
      };

      // Assert - Si compila, el tipo es correcto
      expect(petData.petname).toBe('Test');
      expect(typeof petData.age).toBe('number');
    });

    // TEST 22: Verificar tipo UpdatePetInput
    it('should have correct UpdatePetInput type', () => {
      // Arrange & Act
      const updateData: UpdatePetInput = {
        petname: 'Updated Name'
        // Otros campos son opcionales
      };

      // Assert - Si compila, el tipo es correcto
      expect(updateData.petname).toBe('Updated Name');
      expect(updateData.age).toBeUndefined();
    });
  });
});