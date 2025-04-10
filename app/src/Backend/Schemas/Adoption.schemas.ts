import { z } from "zod";

export const PetsSchema = z.object({
  petname: z.string().min(1, "El nombre es obligatorio"),
  age: z.number().int().positive("La edad debe ser un número positivo"),
  species: z.enum(["perro", "gato"], { message: "El especie es obligatorio" }),
  gender: z.enum(["macho", "hembra"], { message: "El género es obligatorio" }),
});

export const deletePetsSchema = z.object({
  id: z.string().uuid("ID no válido"),
});

export type CreatePetInput = z.infer<typeof PetsSchema>;

export const updatePetSchema = PetsSchema.partial();
export type UpdatePetInput = z.infer<typeof updatePetSchema>;