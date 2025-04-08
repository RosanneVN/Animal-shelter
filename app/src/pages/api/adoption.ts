import type { APIRoute } from "astro";
import { db, eq, like, Pets, sql } from "astro:db";
import { v4 as uuidv4 } from "uuid";
import {
  deletePetsSchema,
  PetsSchema,
  updatePetSchema,
  type CreatePetInput,
  type UpdatePetInput,
} from "../../Backend/Schemas/Adoption.schemas";

export const GET: APIRoute = async ({ params, request }) => {
  const url = new URL(request.url);
  const speciesFilter = url.searchParams.get("species") || "";
  const searchQuery = url.searchParams.get("search") || "";

  let pets;
  if (searchQuery) {
    pets = await db
      .select()
      .from(Pets)
      .where(
        like(Pets.petname, "%" + searchQuery.toLowerCase() + "%")
      );
  } else if (speciesFilter) {
    pets = await db.select().from(Pets).where(eq(Pets.species, speciesFilter));
  } else {
    pets = await db.select().from(Pets);
  }

  console.log(pets);

  return new Response(JSON.stringify(pets), {
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
    const validationResults = PetsSchema.safeParse(body);
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

    const validationData: CreatePetInput = validationResults.data;
    const pets = await db
      .insert(Pets)
      .values({ id: uuidv4(), ...validationData });
    console.log(pets);
    console.log(validationData);

    return new Response(JSON.stringify(pets), {
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

    const validationResult = deletePetsSchema.safeParse({ id });
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          errors: validationResult.error.flatten().fieldErrors,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const pets = await db.delete(Pets).where(eq(Pets.id, id));
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

    const idValidation = deletePetsSchema.safeParse({ id });
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
    const dataValidadtion = updatePetSchema.safeParse(body);
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

    const validatedData: UpdatePetInput = dataValidadtion.data;
    const updateData = await db
      .update(Pets)
      .set(validatedData)
      .where(eq(Pets.id, id));
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
