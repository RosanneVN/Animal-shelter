import { z } from "zod";

export const AuthSchema = z.object({
  username: z.string().min(1, "El nombre es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export type CreateAuthInput = z.infer<typeof AuthSchema>;
