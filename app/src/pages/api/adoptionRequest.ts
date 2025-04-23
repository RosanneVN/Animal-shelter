import type { APIRoute } from "astro";
import { AdoptionRequestsDB, db } from "astro:db";
import { v4 as uuidv4 } from "uuid";
import {
  AdoptionReqSchema,
  type CreateAdoptionReqInput,
} from "../../Backend/Schemas/AdoptionReq.schemas";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const adoptionReq = await db.select().from(AdoptionRequestsDB);
  console.log("adoptionReq", adoptionReq);

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
    const validationResults = AdoptionReqSchema.safeParse(body);
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
