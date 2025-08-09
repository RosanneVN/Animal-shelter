import type { APIRoute } from "astro";
import { db, eq, like, Pets, count, AdoptionRequestsDB } from "astro:db";
import { v4 as uuidv4 } from "uuid";
import {
  deletePetsSchema,
  PetsSchema,
  updatePetSchema,
  type CreatePetInput,
  type UpdatePetInput,
} from "../../Backend/Schemas/Adoption.schemas";
import { uploadImgs } from "../../Backend/utils/uploadImgs";
import { deleteImg } from "../../Backend/utils/deleteImg";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const speciesFilter = url.searchParams.get("species") || "";
  const searchQuery = url.searchParams.get("search") || "";
  const page = Math.max(parseInt(url.searchParams.get("page") || "1", 10), 1);
  const limit = Math.min(
    parseInt(url.searchParams.get("limit") || "10", 10),
    100
  );

  let pets;
  if (searchQuery) {
    pets = await db
      .select()
      .from(Pets)
      .where(like(Pets.petname, "%" + searchQuery.toLowerCase() + "%"))
      .limit(limit)
      .offset((page - 1) * limit);
  } else if (speciesFilter) {
    pets = await db
      .select()
      .from(Pets)
      .where(eq(Pets.species, speciesFilter))
      .limit(limit)
      .offset((page - 1) * limit);
  } else {
    pets = await db
      .select()
      .from(Pets)
      .limit(limit)
      .offset((page - 1) * limit);
  }

  let totalPets: any;
  if (searchQuery) {
    totalPets = await db
      .select({ count: count() })
      .from(Pets)
      .where(like(Pets.petname, "%" + searchQuery.toLowerCase() + "%"));
  } else if (speciesFilter) {
    totalPets = await db
      .select({ count: count() })
      .from(Pets)
      .where(eq(Pets.species, speciesFilter));
  } else {
    totalPets = await db.select({ count: count() }).from(Pets);
  }
  console.log(totalPets);
  const totalPages: number = Math.ceil(totalPets[0].count / limit);
  console.log("totalPages", totalPages);

  return new Response(
    JSON.stringify({ data: pets, pagination: { page, limit, totalPages } }),
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
    const img = await uploadImgs(validationData.img, validationData.petname);
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
    const pets = await db.insert(Pets).values({
      id: uuidv4(),
      ...validationData,
      img: img.url,
      fileId: img.fileId,
    });
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
    const petFileId = await db
      .select({ fileId: Pets.fileId })
      .from(Pets)
      .where(eq(Pets.id, id));
    if (petFileId[0].fileId) {
      try {
        await deleteImg(petFileId[0].fileId);
      } catch {
        console.log("not img deleted");
      }
    }
    try {
      await db
        .delete(AdoptionRequestsDB)
        .where(eq(AdoptionRequestsDB.petId, id));

      console.log(`Solicitudes de adopción eliminadas para mascota ID: ${id}`);

      await db.delete(Pets).where(eq(Pets.id, id));
    } catch (error) {
      console.log(error);
      return new Response(
        JSON.stringify({ error: "Error al eliminar el pet" }),
        {
          status: 400,
          statusText: "Error al eliminar el pet",
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    console.log("here");
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
    let fileId;
    if (validatedData.img) {
      const petFileId = await db
        .select({ fileId: Pets.fileId })
        .from(Pets)
        .where(eq(Pets.id, id));
      if (petFileId[0].fileId) {
        try {
          await deleteImg(petFileId[0].fileId);
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
    console.log(validatedData);

    const updateData = await db
      .update(Pets)
      .set({ ...validatedData, fileId })
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
