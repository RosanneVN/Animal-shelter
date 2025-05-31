// src/test/api/adoption.test.ts
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { GET, POST, DELETE, PATCH } from '../../pages/api/adoption';

// ========================================
// MOCKS
// ========================================

// Mock de astro:db
const mockDb = {
  select: vi.fn(),
  insert: vi.fn(),
  delete: vi.fn(),
  update: vi.fn()
};

const mockEq = vi.fn();
const mockLike = vi.fn();
const mockCount = vi.fn(() => ({ count: 'mocked_count' }));

// Mock de las tablas
const mockPets = {
  id: 'pets_id',
  petname: 'pets_petname',
  species: 'pets_species',
  fileId: 'pets_fileId'
};

const mockAdoptionRequestsDB = {
  petId: 'adoption_petId'
};

// Mock de utilidades
const mockUploadImgs = vi.fn();
const mockDeleteImg = vi.fn();
const mockUuidv4 = vi.fn();

// Configurar todos los mocks
vi.mock('astro:db', () => ({
  db: mockDb,
  eq: mockEq,
  like: mockLike,
  count: mockCount,
  Pets: mockPets,
  AdoptionRequestsDB: mockAdoptionRequestsDB
}));

vi.mock('uuid', () => ({
  v4: mockUuidv4
}));

vi.mock('../../Backend/utils/uploadImgs', () => ({
  uploadImgs: mockUploadImgs
}));

vi.mock('../../Backend/utils/deleteImg', () => ({
  deleteImg: mockDeleteImg
}));

// ========================================
// HELPER FUNCTIONS
// ========================================

/**
 * Helper para crear un Request mock
 */
const createMockRequest = (
  url: string, 
  method: string = 'GET', 
  body?: any
): Request => {
  const init: RequestInit = {
    method,
    headers: { 'Content-Type': 'application/json' }
  };

  if (body) {
    init.body = JSON.stringify(body);
  }

  return new Request(url, init);
};

/**
 * Helper para crear datos válidos de mascota
 */
const createValidPetData = (overrides: any = {}) => ({
  petname: 'Max',
  age: 3,
  species: 'perro',
  gender: 'macho',
  img: 'data:image/jpeg;base64,validImageData',
  ...overrides
});

/**
 * Helper para crear respuesta de DB mock
 */
const createMockDbResponse = () => ({
  from: vi.fn().mockReturnThis(),
  where: vi.fn().mockReturnThis(),
  limit: vi.fn().mockReturnThis(),
  offset: vi.fn().mockReturnThis(),
  values: vi.fn().mockResolvedValue({ insertId: 'new-pet-id' }),
  set: vi.fn().mockReturnThis()
});

/**
 * Helper para simular paginación en select
 */
const createMockSelectChain = (mockData: any[] = []) => ({
  from: vi.fn().mockReturnValue({
    where: vi.fn().mockReturnValue({
      limit: vi.fn().mockReturnValue({
        offset: vi.fn().mockResolvedValue(mockData)
      })
    }),
    limit: vi.fn().mockReturnValue({
      offset: vi.fn().mockResolvedValue(mockData)
    })
  })
});

describe('Adoption API', () => {
  
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada test
    vi.clearAllMocks();
    
    // Configurar console.log como mock para evitar spam en tests
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restaurar console.log después de cada test
    vi.restoreAllMocks();
  });

  // ========================================
  // TESTS PARA GET (Obtener mascotas)
  // ========================================
  describe('GET /api/adoption', () => {
    
    // ✅ TEST 1: Obtener todas las mascotas sin filtros
    it('should return all pets without filters', async () => {
      // Arrange
      const mockPetsData = [
        { id: '1', petname: 'Max', species: 'perro', age: 3 },
        { id: '2', petname: 'Luna', species: 'gato', age: 2 }
      ];

      const mockCountData = [{ count: 2 }];

      // Configurar mocks para select de mascotas
      mockDb.select.mockReturnValueOnce(createMockSelectChain(mockPetsData));
      
      // Configurar mocks para count
      mockDb.select.mockReturnValueOnce({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue(mockCountData)
        })
      });

      const request = createMockRequest('http://localhost/api/adoption');

      // Act
      const response = await GET({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data.data).toEqual(mockPetsData);
      expect(data.pagination).toEqual({
        page: 1,
        limit: 10,
        totalPages: 1
      });
      expect(mockDb.select).toHaveBeenCalledTimes(2); // Una para mascotas, una para count
    });

    // ✅ TEST 2: Obtener mascotas con filtro de especie
    it('should return pets filtered by species', async () => {
      // Arrange
      const mockPetsData = [
        { id: '1', petname: 'Max', species: 'perro', age: 3 }
      ];
      const mockCountData = [{ count: 1 }];

      mockDb.select
        .mockReturnValueOnce(createMockSelectChain(mockPetsData))
        .mockReturnValueOnce({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockResolvedValue(mockCountData)
          })
        });

      const request = createMockRequest('http://localhost/api/adoption?species=perro');

      // Act
      const response = await GET({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data.data).toEqual(mockPetsData);
      expect(mockEq).toHaveBeenCalledWith(mockPets.species, 'perro');
    });

    // ✅ TEST 3: Obtener mascotas con búsqueda por nombre
    it('should return pets filtered by search query', async () => {
      // Arrange
      const mockPetsData = [
        { id: '1', petname: 'Max', species: 'perro', age: 3 }
      ];
      const mockCountData = [{ count: 1 }];

      mockDb.select
        .mockReturnValueOnce(createMockSelectChain(mockPetsData))
        .mockReturnValueOnce({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockResolvedValue(mockCountData)
          })
        });

      const request = createMockRequest('http://localhost/api/adoption?search=Max');

      // Act
      const response = await GET({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data.data).toEqual(mockPetsData);
      expect(mockLike).toHaveBeenCalledWith(mockPets.petname, '%max%');
    });

    // ✅ TEST 4: Paginación correcta
    it('should handle pagination correctly', async () => {
      // Arrange
      const mockPetsData = [
        { id: '3', petname: 'Buddy', species: 'perro', age: 4 }
      ];
      const mockCountData = [{ count: 25 }]; // 25 mascotas total

      mockDb.select
        .mockReturnValueOnce(createMockSelectChain(mockPetsData))
        .mockReturnValueOnce({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockResolvedValue(mockCountData)
          })
        });

      const request = createMockRequest('http://localhost/api/adoption?page=3&limit=5');

      // Act
      const response = await GET({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data.pagination).toEqual({
        page: 3,
        limit: 5,
        totalPages: 5 // Math.ceil(25/5) = 5
      });
    });

    // ✅ TEST 5: Límite máximo de paginación
    it('should enforce maximum limit of 100', async () => {
      // Arrange
      const mockPetsData:any = [];
      const mockCountData = [{ count: 0 }];

      mockDb.select
        .mockReturnValueOnce(createMockSelectChain(mockPetsData))
        .mockReturnValueOnce({
          from: vi.fn().mockReturnValue({
            where: vi.fn().mockResolvedValue(mockCountData)
          })
        });

      const request = createMockRequest('http://localhost/api/adoption?limit=200');

      // Act
      const response = await GET({ request } as any);
      const data = await response.json();

      // Assert
      expect(data.pagination.limit).toBe(100); // Limitado a 100
    });
  });

  // ========================================
  // TESTS PARA POST (Crear mascota)
  // ========================================
  describe('POST /api/adoption', () => {
    
    // ✅ TEST 6: Crear mascota con datos válidos
    it('should create pet with valid data', async () => {
      // Arrange
      const validPetData = createValidPetData();
      const mockImageResponse = {
        url: 'https://imagekit.io/uploaded-image.jpg',
        fileId: 'file-123'
      };

      mockUploadImgs.mockResolvedValue(mockImageResponse);
      mockUuidv4.mockReturnValue('new-pet-uuid');
      
      mockDb.insert.mockReturnValue({
        values: vi.fn().mockResolvedValue({ insertId: 'new-pet-id' })
      });

      const request = createMockRequest(
        'http://localhost/api/adoption', 
        'POST', 
        validPetData
      );

      // Act
      const response = await POST({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(mockUploadImgs).toHaveBeenCalledWith(
        validPetData.img, 
        validPetData.petname
      );
      expect(mockDb.insert).toHaveBeenCalledWith(mockPets);
    });

    // ❌ TEST 7: Rechazar datos inválidos
    it('should reject invalid pet data', async () => {
      // Arrange
      const invalidPetData = {
        petname: '', // ❌ Nombre vacío
        age: -1,     // ❌ Edad negativa
        species: 'invalid', // ❌ Especie inválida
        gender: 'invalid',  // ❌ Género inválido
        img: 'not-valid-url' // ❌ URL inválida
      };

      const request = createMockRequest(
        'http://localhost/api/adoption', 
        'POST', 
        invalidPetData
      );

      // Act
      const response = await POST({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(data.error).toBeDefined();
      expect(mockUploadImgs).not.toHaveBeenCalled();
      expect(mockDb.insert).not.toHaveBeenCalled();
    });

    // ❌ TEST 8: Error al subir imagen
    it('should handle image upload error', async () => {
      // Arrange
      const validPetData = createValidPetData();
      
      mockUploadImgs.mockResolvedValue(null); // Simular error en upload

      const request = createMockRequest(
        'http://localhost/api/adoption', 
        'POST', 
        validPetData
      );

      // Act
      const response = await POST({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(data.error).toBe('Error al subir la imagen');
      expect(mockDb.insert).not.toHaveBeenCalled();
    });

    // ❌ TEST 9: Error del servidor
    it('should handle server errors', async () => {
      // Arrange
      const validPetData = createValidPetData();
      
      mockUploadImgs.mockRejectedValue(new Error('Server error'));

      const request = createMockRequest(
        'http://localhost/api/adoption', 
        'POST', 
        validPetData
      );

      // Act
      const response = await POST({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(data.error).toBe('Error en el servidor');
    });

    // ❌ TEST 10: JSON inválido
    it('should handle invalid JSON', async () => {
      // Arrange - Request con JSON malformado
      const request = new Request('http://localhost/api/adoption', {
        method: 'POST',
        body: 'invalid-json',
        headers: { 'Content-Type': 'application/json' }
      });

      // Act
      const response = await POST({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(data.error).toBe('Error en el servidor');
    });
  });

  // ========================================
  // TESTS PARA DELETE (Eliminar mascota)
  // ========================================
  describe('DELETE /api/adoption', () => {
    
    // ✅ TEST 11: Eliminar mascota con ID válido
    it('should delete pet with valid ID', async () => {
      // Arrange
      const petId = '123e4567-e89b-12d3-a456-426614174000';
      const mockFileIdData = [{ fileId: 'file-123' }];

      mockDb.select.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue(mockFileIdData)
        })
      });

      mockDb.delete
        .mockReturnValueOnce({ // Para AdoptionRequestsDB
          where: vi.fn().mockResolvedValue({})
        })
        .mockReturnValueOnce({ // Para Pets
          where: vi.fn().mockResolvedValue({})
        });

      mockDeleteImg.mockResolvedValue(true);

      const request = createMockRequest(
        `http://localhost/api/adoption?id=${petId}`, 
        'DELETE'
      );

      // Act
      const response = await DELETE({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(data.message).toBe(`Michi con id ${petId} eliminado`);
      expect(mockDeleteImg).toHaveBeenCalledWith('file-123');
      expect(mockDb.delete).toHaveBeenCalledTimes(2);
    });

    // ❌ TEST 12: Eliminar sin ID
    it('should reject deletion without ID', async () => {
      // Arrange
      const request = createMockRequest(
        'http://localhost/api/adoption', 
        'DELETE'
      );

      // Act
      const response = await DELETE({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al procesar la solicitud');
    });

    // ❌ TEST 13: ID inválido
    it('should reject invalid ID format', async () => {
      // Arrange
      const invalidId = 'not-a-uuid';
      const request = createMockRequest(
        `http://localhost/api/adoption?id=${invalidId}`, 
        'DELETE'
      );

      // Act
      const response = await DELETE({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(data.errors).toBeDefined();
    });

    // ✅ TEST 14: Eliminar mascota sin imagen
    it('should delete pet without image', async () => {
      // Arrange
      const petId = '123e4567-e89b-12d3-a456-426614174000';
      const mockFileIdData = [{ fileId: null }]; // Sin imagen

      mockDb.select.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue(mockFileIdData)
        })
      });

      mockDb.delete
        .mockReturnValueOnce({
          where: vi.fn().mockResolvedValue({})
        })
        .mockReturnValueOnce({
          where: vi.fn().mockResolvedValue({})
        });

      const request = createMockRequest(
        `http://localhost/api/adoption?id=${petId}`, 
        'DELETE'
      );

      // Act
      const response = await DELETE({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(mockDeleteImg).not.toHaveBeenCalled(); // No se intentó eliminar imagen
    });

    // ❌ TEST 15: Error en eliminación de BD
    it('should handle database deletion error', async () => {
      // Arrange
      const petId = '123e4567-e89b-12d3-a456-426614174000';
      const mockFileIdData = [{ fileId: 'file-123' }];

      mockDb.select.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue(mockFileIdData)
        })
      });

      mockDb.delete.mockReturnValue({
        where: vi.fn().mockRejectedValue(new Error('DB Error'))
      });

      const request = createMockRequest(
        `http://localhost/api/adoption?id=${petId}`, 
        'DELETE'
      );

      // Act
      const response = await DELETE({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(data.error).toBe('Error al eliminar el pet');
    });
  });

  // ========================================
  // TESTS PARA PATCH (Actualizar mascota)
  // ========================================
  describe('PATCH /api/adoption', () => {
    
    // ✅ TEST 16: Actualizar mascota con datos válidos (sin imagen)
    it('should update pet with valid data without image', async () => {
      // Arrange
      const petId = '123e4567-e89b-12d3-a456-426614174000';
      const updateData = {
        petname: 'Nuevo Nombre',
        age: 5
      };

      mockDb.update.mockReturnValue({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue({ updated: true })
        })
      });

      const request = createMockRequest(
        `http://localhost/api/adoption?id=${petId}`, 
        'PATCH', 
        updateData
      );

      // Act
      const response = await PATCH({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(mockDb.update).toHaveBeenCalledWith(mockPets);
    });

    // ✅ TEST 17: Actualizar mascota con nueva imagen
    it('should update pet with new image', async () => {
      // Arrange
      const petId = '123e4567-e89b-12d3-a456-426614174000';
      const updateData = {
        petname: 'Nuevo Nombre',
        img: 'data:image/jpeg;base64,newImageData'
      };

      const mockOldFileId = [{ fileId: 'old-file-123' }];
      const mockNewImageResponse = {
        url: 'https://imagekit.io/new-image.jpg',
        fileId: 'new-file-456'
      };

      // Mock para obtener fileId anterior
      mockDb.select.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue(mockOldFileId)
        })
      });

      mockDeleteImg.mockResolvedValue(true);
      mockUploadImgs.mockResolvedValue(mockNewImageResponse);
      mockUuidv4.mockReturnValue('uuid-for-image');

      mockDb.update.mockReturnValue({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue({ updated: true })
        })
      });

      const request = createMockRequest(
        `http://localhost/api/adoption?id=${petId}`, 
        'PATCH', 
        updateData
      );

      // Act
      const response = await PATCH({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(200);
      expect(mockDeleteImg).toHaveBeenCalledWith('old-file-123');
      expect(mockUploadImgs).toHaveBeenCalledWith(updateData.img, 'uuid-for-image');
      expect(mockDb.update).toHaveBeenCalled();
    });

    // ❌ TEST 18: Actualizar sin ID
    it('should reject update without ID', async () => {
      // Arrange
      const updateData = { petname: 'Nuevo Nombre' };
      const request = createMockRequest(
        'http://localhost/api/adoption', 
        'PATCH', 
        updateData
      );

      // Act
      const response = await PATCH({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(500);
      expect(data.error).toBe('Error al procesar la solicitud');
    });

    // ❌ TEST 19: ID inválido para actualización
    it('should reject invalid ID for update', async () => {
      // Arrange
      const invalidId = 'not-a-uuid';
      const updateData = { petname: 'Nuevo Nombre' };
      
      const request = createMockRequest(
        `http://localhost/api/adoption?id=${invalidId}`, 
        'PATCH', 
        updateData
      );

      // Act
      const response = await PATCH({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(data.error).toBeDefined();
    });

    // ❌ TEST 20: Datos inválidos para actualización
    it('should reject invalid update data', async () => {
      // Arrange
      const petId = '123e4567-e89b-12d3-a456-426614174000';
      const invalidData = {
        petname: '', // ❌ Nombre vacío
        age: -1      // ❌ Edad negativa
      };

      const request = createMockRequest(
        `http://localhost/api/adoption?id=${petId}`, 
        'PATCH', 
        invalidData
      );

      // Act
      const response = await PATCH({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(data.error).toBeDefined();
    });

    // ❌ TEST 21: Error al subir nueva imagen
    it('should handle new image upload error', async () => {
      // Arrange
      const petId = '123e4567-e89b-12d3-a456-426614174000';
      const updateData = {
        img: 'data:image/jpeg;base64,newImageData'
      };

      const mockOldFileId = [{ fileId: 'old-file-123' }];

      mockDb.select.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue(mockOldFileId)
        })
      });

      mockDeleteImg.mockResolvedValue(true);
      mockUploadImgs.mockResolvedValue(null); // Error en upload
      mockUuidv4.mockReturnValue('uuid-for-image');

      const request = createMockRequest(
        `http://localhost/api/adoption?id=${petId}`, 
        'PATCH', 
        updateData
      );

      // Act
      const response = await PATCH({ request } as any);
      const data = await response.json();

      // Assert
      expect(response.status).toBe(400);
      expect(data.error).toBe('Error al subir la imagen');
      expect(mockDb.update).not.toHaveBeenCalled();
    });

    // ✅ TEST 22: Actualizar sin imagen anterior
    it('should update pet with new image when no previous image exists', async () => {
      // Arrange
      const petId = '123e4567-e89b-12d3-a456-426614174000';
      const updateData = {
        img: 'data:image/jpeg;base64,newImageData'
      };

      const mockNoFileId = [{ fileId: null }]; // Sin imagen anterior
      const mockNewImageResponse = {
        url: 'https://imagekit.io/new-image.jpg',
        fileId: 'new-file-456'
      };

      mockDb.select.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue(mockNoFileId)
        })
      });

      mockUploadImgs.mockResolvedValue(mockNewImageResponse);
      mockUuidv4.mockReturnValue('uuid-for-image');

      mockDb.update.mockReturnValue({
        set: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue({ updated: true })
        })
      });

      const request = createMockRequest(
        `http://localhost/api/adoption?id=${petId}`, 
        'PATCH', 
        updateData
      );

      // Act
      const response = await PATCH({ request } as any);

      // Assert
      expect(response.status).toBe(200);
      expect(mockDeleteImg).not.toHaveBeenCalled(); // No hay imagen anterior que eliminar
      expect(mockUploadImgs).toHaveBeenCalled();
    });
  });

  // ========================================
  // TESTS DE INTEGRACIÓN
  // ========================================
  describe('Integration Tests', () => {
    
    // ✅ TEST 23: Flujo completo - Crear y luego eliminar
    it('should create and then delete a pet', async () => {
      // Arrange - Crear mascota
      const validPetData = createValidPetData();
      const mockImageResponse = {
        url: 'https://imagekit.io/uploaded-image.jpg',
        fileId: 'file-123'
      };

      mockUploadImgs.mockResolvedValue(mockImageResponse);
      mockUuidv4.mockReturnValue('new-pet-uuid');
      
      mockDb.insert.mockReturnValue({
        values: vi.fn().mockResolvedValue({ insertId: 'new-pet-id' })
      });

      // Act - Crear
      const createRequest = createMockRequest(
        'http://localhost/api/adoption', 
        'POST', 
        validPetData
      );
      const createResponse = await POST({ request: createRequest } as any);

      // Assert - Creación exitosa
      expect(createResponse.status).toBe(200);

      // Arrange - Eliminar mascota
      const petId = 'new-pet-uuid';
      const mockFileIdData = [{ fileId: 'file-123' }];

      mockDb.select.mockReturnValue({
        from: vi.fn().mockReturnValue({
          where: vi.fn().mockResolvedValue(mockFileIdData)
        })
      });

      mockDb.delete
        .mockReturnValueOnce({
          where: vi.fn().mockResolvedValue({})
        })
        .mockReturnValueOnce({
          where: vi.fn().mockResolvedValue({})
        });

      mockDeleteImg.mockResolvedValue(true);

      // Act - Eliminar
      const deleteRequest = createMockRequest(
        `http://localhost/api/adoption?id=${petId}`, 
        'DELETE'
      );
      const deleteResponse = await DELETE({ request: deleteRequest } as any);

      // Assert - Eliminación exitosa
      expect(deleteResponse.status).toBe(200);
    });
  });
});