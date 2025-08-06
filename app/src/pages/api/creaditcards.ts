import type { APIRoute } from "astro";
import { CreditCardsDB, db, eq } from "astro:db";
import { v4 as uuidv4 } from "uuid";
import {
  CreditCardsSchema,
  deleteCreditCardsSchema,
  type CreateCreditCardsInput,
} from "../../Backend/Schemas/CreditCards.schema";

export const GET: APIRoute = async ({}) => {
  const creditCards = await db.select().from(CreditCardsDB);
  return new Response(JSON.stringify({ data: creditCards }), {
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
    const validationResults = CreditCardsSchema.safeParse(body);

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
    const validationData: CreateCreditCardsInput = validationResults.data;
    const creditCards = await db.insert(CreditCardsDB).values({...validationData,id: uuidv4(),});
    return new Response(JSON.stringify(creditCards), {
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
    console.log("id", id);

    if (!id) {
      throw new Error("ID not found");
    }

    const validationResult = deleteCreditCardsSchema.safeParse({ id });
    console.log("validationResult", validationResult);
    
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          errors: validationResult.error.flatten().fieldErrors,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    const creditCards = await db
      .delete(CreditCardsDB)
      .where(eq(CreditCardsDB.id, id));
    console.log("creditCards", creditCards);

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

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      throw new Error("ID not found");
    }
    const dataValidadtion = CreditCardsSchema.safeParse(body);
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
    const validatedData: CreateCreditCardsInput = dataValidadtion.data;
    const updateData = await db
      .update(CreditCardsDB)
      .set(validatedData)
      .where(eq(CreditCardsDB.id, id));
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
