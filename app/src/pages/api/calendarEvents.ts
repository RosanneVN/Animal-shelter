import type { APIRoute } from "astro";
import { CalendarEvents, count, db, eq } from "astro:db";
import { v4 as uuidv4 } from "uuid";
import {
  CalendarEventsSchema,
  deleteCalendarEventsSchema,
  type CreateCalendarEventsInput,
  type UpdateCalendarEventsInput,
} from "../../Backend/Schemas/CalendarEvents.schemas";
import { uploadImgs } from "../../Backend/utils/uploadImgs";
import { deleteImg } from "../../Backend/utils/deleteImg";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const page = Math.max(parseInt(url.searchParams.get("page") || "1", 10), 1);
  const limit = Math.min(
    parseInt(url.searchParams.get("limit") || "10", 10),
    100
  );

  let calendarEvents = await db
    .select()
    .from(CalendarEvents)
    .limit(limit)
    .offset((page - 1) * limit);
  console.log("calendar", calendarEvents);

  let totalEvents: any;
  totalEvents = await db.select({ count: count() }).from(CalendarEvents);

  const totalPages: number = Math.ceil(totalEvents[0].count / limit);

  return new Response(
    JSON.stringify({
      data: calendarEvents,
      pagination: { page, limit, totalPages },
    }),
    {
      status: 200,
      statusText: "Michi encontrado",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
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
  const img = await uploadImgs(validationData.img, validationData.title);
  if (!img) {
    return new Response(
      JSON.stringify({
        error: "Error al subir la imagen",
      }),
      {
        status: 400,
        statusText: "Error al subir la imagen",
        headers: { "Content-Type": "application/json" },
      }
    );
  }
  const calendarEvents = await db.insert(CalendarEvents).values({
    id: uuidv4(),
    ...validationData,
    img: img.url,
    fileId: img.fileId,
  });
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
  const eventFileId = await db
    .select({ fileId: CalendarEvents.fileId })
    .from(CalendarEvents)
    .where(eq(CalendarEvents.id, id));
  if (eventFileId[0].fileId) {
    try {
      await deleteImg(eventFileId[0].fileId);
    } catch {
      console.log("not img deleted");
    }
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
  try {
    const validatedData: UpdateCalendarEventsInput = dataValidadtion.data;
    let fileId;
    if (validatedData.img) {
      const eventFileId = await db
        .select({ fileId: CalendarEvents.fileId })
        .from(CalendarEvents)
        .where(eq(CalendarEvents.id, id));
      if (eventFileId[0].fileId) {
        try {
          await deleteImg(eventFileId[0].fileId);
        } catch {
          console.log("not img deleted");
        }
      }
      const img = await uploadImgs(validatedData.img, uuidv4());
      if (!img) {
        return new Response(
          JSON.stringify({
            error: "Error al subir la imagen",
          }),
          {
            status: 400,
            statusText: "Error al subir la imagen",
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      validatedData.img = img.url;
      fileId = img.fileId;
    }

    const updateData = await db
      .update(CalendarEvents)
      .set({ ...validatedData, fileId })
      .where(eq(CalendarEvents.id, id));
    console.log(updateData);
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
