import { z } from "zod";

export const PetsSchema = z.object({
  petname: z.string().min(1, "El nombre es obligatorio"),
  age: z.string().min(1, "La edad es obligatoria"),
  species: z.enum(["perro", "gato"], { message: "La especie es obligatoria" }),
  gender: z.enum(["macho", "hembra"], { message: "El género es obligatorio" }),
  img: z.string().url({ message: "La imagen es obligatoria" }),
});

export const deletePetsSchema = z.object({
  id: z.string().uuid("ID no válido").or(z.string()),
});

export type CreatePetInput = z.infer<typeof PetsSchema>;

export const updatePetSchema = PetsSchema.partial();
export type UpdatePetInput = z.infer<typeof updatePetSchema>;