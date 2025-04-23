import { z } from "zod";

export const AdoptionReqSchema = z.object({
  fullname: z.string().min(1, "El nombre es obligatorio"),
  age: z.number().int().positive("La edad debe ser un número positivo"),
  cellPhone: z.number().int().positive("El numero de telefono es obligatorio"),
  alternativeCellPhone: z
    .number()
    .int()
    .positive("El teléfono alternativo es obligatorio"),
  address: z.string().min(1, "La dirección es obligatoria"),
  motivation: z.string().min(1, "Este campo es obligarorio"),
  forWho: z.string().min(1, "La persona es obligatoria"),
  petMoney: z.string().min(1, "Este campo es obligarorio"),
  petFollowing: z.string().min(1, "Este campo es obligarorio"),
  notAbandoned: z.string().min(1, "Este campo es obligarorio"),
  ownHouse: z.string().min(1, "Este campo es obligarorio"),
  agreeRent: z.string().min(1, "Este campo es obligarorio"),
  bigPlace: z.string().min(1, "Este campo es obligarorio"),
  sleepPlace: z.string().min(1, "Este campo es obligarorio"),
  houseNotScape: z.string().min(1, "Este campo es obligarorio"),
  childrens: z.string().min(1, "Este campo es obligarorio"),
  petAlergic: z.string().min(1, "Este campo es obligarorio"),
  family: z.string().min(1, "Este campo es obligarorio"),
  adoptionAgree: z.string().min(1, "Este campo es obligarorio"),
  howManyPets: z.number().int().positive("Este campo es obligarorio"),
  petsBefore: z.string().min(1, "Este campo es obligarorio"),
  petsBeforeAlive: z.string().min(1, "Este campo es obligarorio"),
  job: z.string().min(1, "Este campo es obligarorio"),
  iftravel: z.string().min(1, "Este campo es obligarorio"),
  petIfTravel: z.string().min(1, "Este campo es obligarorio"),
  otherHouse: z.string().min(1, "Este campo es obligarorio"),
  petDoctorClose: z.string().min(1, "Este campo es obligarorio"),
  vacunationSchema: z.string().min(1, "Este campo es obligarorio"),
  sterilizationOpinion: z.string().min(1, "Este campo es obligarorio"),
  youAgree: z.string().min(1, "Este campo es obligarorio"),
  petId: z.string().uuid("ID no válido"),
});

export const deleteAdoptionReqSchema = z.object({
  id: z.string().uuid("ID no válido"),
});

export type CreateAdoptionReqInput = z.infer<typeof AdoptionReqSchema>;

export const updateAdoptionReqSchema = AdoptionReqSchema.partial();
export type UpdateAdoptionReqInput = z.infer<typeof updateAdoptionReqSchema>;
