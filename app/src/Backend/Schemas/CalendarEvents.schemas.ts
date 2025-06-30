import { date } from "astro:schema";
import { z } from "zod";

export const CalendarEventsSchema = z.object({
    date: z.string().min(1, "La fecha es obligatoria"),
    title: z.string().min(1, "El título es obligatorio"),
    description: z.string().min(1, "La descripción es obligatoria"),
    location: z.string().min(1, "La ubicación es obligatoria"),
})

export const deleteCalendarEventsSchema = z.object({
     id: z.string().uuid("ID no válido").or(z.string()),
})

export type CreateCalendarEventsInput = z.infer<typeof CalendarEventsSchema>;
export const updateCalendarEventsSchema = CalendarEventsSchema.partial();
export type UpdateCalendarEventsInput = z.infer<typeof updateCalendarEventsSchema>;