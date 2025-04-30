import type { APIRoute } from "astro";
import { AdoptionRequestsDB, db, eq } from "astro:db";
import { v4 as uuidv4 } from "uuid";
import {
  AdoptionReqSchema,
  deleteAdoptionReqSchema,
  type CreateAdoptionReqInput,
} from "../../Backend/Schemas/AdoptionReq.schemas";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const adoptionReq = await db.select().from(AdoptionRequestsDB);

  return new Response(JSON.stringify({ data: adoptionReq }), {
    status: 200,
    statusText: "Michi encontrado",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    console.log("body", body);
    const validationResults = AdoptionReqSchema.safeParse(body);
    console.log("validationResults", validationResults);
    console.log(
      "validationResults.error",
      JSON.stringify({
        error: validationResults?.error?.flatten().fieldErrors,
      })
    );
    console.log("validationResults.success", validationResults.success);

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

    const validationData: CreateAdoptionReqInput = validationResults.data;
    const adoptionReq = await db
      .insert(AdoptionRequestsDB)
      .values({ id: uuidv4(), ...validationData });
    console.log("adoptionReq", adoptionReq);

    return new Response(JSON.stringify(adoptionReq), {
      status: 200,
      statusText: "Michi created",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error en el servidor" }), {
      status: 500,
      statusText: "Error en el servidor",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      throw new Error("ID not found");
    }
    const validationResult = deleteAdoptionReqSchema.safeParse({ id });
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          errors: validationResult.error.flatten().fieldErrors,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const adoptionReq = await db
      .delete(AdoptionRequestsDB)
      .where(eq(AdoptionRequestsDB.id, id));
    return new Response(
      JSON.stringify({ message: `Michi con id ${id} eliminado` }),
      {
        status: 200,
        statusText: "Michi eliminado",
        headers: { "Content-Type": "application/json" },
      }
    );
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
