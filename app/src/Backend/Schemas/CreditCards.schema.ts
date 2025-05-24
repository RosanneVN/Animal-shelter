import { z } from "zod";

export const CreditCardsSchema = z.object({
  cardNumber: z.string().min(1, "El numero de tarjeta es obligatorio"),
  numberPhone: z
    .number()
    .int()
    .positive("El numero de telefono es obligatorio"),
    nameCard: z.string().min(1, "El nombre de la tarjeta es obligatorio")
});

export const deleteCreditCardsSchema = z.object({
  id: z.string().uuid("ID no válido"),
});

export type CreateCreditCardsInput = z.infer<typeof CreditCardsSchema>;

export const updateCreditCardsSchema = CreditCardsSchema.partial();
export type UpdateCreditCardsInput = z.infer<typeof updateCreditCardsSchema>;
