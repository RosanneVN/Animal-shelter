import type { APIRoute } from "astro";
import { CalendarEvents, db, eq } from "astro:db";
import {
  CalendarEventsSchema,
  deleteCalendarEventsSchema,
  type CreateCalendarEventsInput,
  type UpdateCalendarEventsInput,
} from "../../Backend/Schemas/CalendarEvents.schemas";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);

  let calendarEvents = await db.select().from(CalendarEvents);
console.log("calendar", calendarEvents);

  return new Response(JSON.stringify({data: calendarEvents }), {
    status: 200,
    statusText: "Michi encontrado",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const validationResults = CalendarEventsSchema.safeParse(body);
  if (!validationResults.success) {
    return new Response(
      JSON.stringify({
        error: validationResults.error.flatten().fieldErrors,
      }),
      {
        status: 400,
        statusText: "Michi not found",
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const validationData: CreateCalendarEventsInput = validationResults.data;
  const calendarEvents = await db.insert(CalendarEvents).values(validationData);
  console.log(calendarEvents);

  return new Response(JSON.stringify(calendarEvents), {
    status: 200,
    statusText: "Michi created",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const DELETE: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    throw new Error("ID not found");
  }

  const validationResult = deleteCalendarEventsSchema.safeParse({ id });
  if (!validationResult.success) {
    return new Response(
      JSON.stringify({
        errors: validationResult.error.flatten().fieldErrors,
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  try {
    await db.delete(CalendarEvents).where(eq(CalendarEvents.id, id));
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: "Error al eliminar el evento" }),
      {
        status: 400,
        statusText: "Error al eliminar el evento",
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  return new Response(
    JSON.stringify({ message: `Evento con id ${id} eliminado` }),
    {
      status: 200,
      statusText: "Evento eliminado",
      headers: { "Content-Type": "application/json" },
    }
  );
};

export const PATCH: APIRoute = async ({ request }) => {
  const body = await request.json();
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    throw new Error("ID not found");
  }

  const idValidation = deleteCalendarEventsSchema.safeParse({ id });

  if (!idValidation.success) {
    return new Response(
      JSON.stringify({ error: idValidation.error.flatten().fieldErrors }),
      {
        status: 400,
        statusText: "Michi not found",
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const dataValidadtion = CalendarEventsSchema.safeParse(body);
  if (!dataValidadtion.success) {
    return new Response(
      JSON.stringify({ error: dataValidadtion.error.flatten().fieldErrors }),
      {
        status: 400,
        statusText: "Michi not found",
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  try{
  const validatedData: UpdateCalendarEventsInput = dataValidadtion.data;
  const updateData = await db
    .update(CalendarEvents)
    .set(validatedData)
    .where(eq(CalendarEvents.id, id));

    return new Response(JSON.stringify(updateData), {
      status: 200,
      statusText: "Michi actualizado",
      headers: { "Content-Type": "application/json" },
    });
} catch (error) {
  return new Response(
    JSON.stringify({ error: "Error al procesar la solicitud" }),
    {
      status: 500,
      statusText: "Error en el servidor",
      headers: { "Content-Type": "application/json" },
    }
  );
}
};
