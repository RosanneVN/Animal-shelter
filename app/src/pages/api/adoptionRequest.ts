import type { APIRoute } from "astro";
import { AdoptionRequestsDB, db, eq } from "astro:db";
import { v4 as uuidv4 } from "uuid";
import {
  AdoptionReqSchema,
  deleteAdoptionReqSchema,
  updateAdoptionReqSchema,
  type CreateAdoptionReqInput,
} from "../../Backend/Schemas/AdoptionReq.schemas";
import { AdoptionReqEnum } from "../../Const/AdoptionReqEnum";
import { uploadImgs } from "../../Backend/utils/uploadImgs";
import { deleteImg } from "../../Backend/utils/deleteImg";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const filterID = url.searchParams.get("id") || "";
  const readingFilter = url.searchParams.get("readingFilter") || "";
  const isApprovedFilter = url.searchParams.get("isApprovedFilter") || "";
  let adoptionReq;
  let readingFilterBoolean: boolean | undefined;
  let isApprovedFilterBoolean: boolean | undefined;

  if (readingFilter === AdoptionReqEnum.leidas) {
    readingFilterBoolean = true;
  } else if (readingFilter === AdoptionReqEnum.noLeidas) {
    readingFilterBoolean = false;
  }

  if (isApprovedFilter === AdoptionReqEnum.aprobadas) {
    isApprovedFilterBoolean = true;
  } else if (isApprovedFilter === AdoptionReqEnum.noAprobadas) {
    isApprovedFilterBoolean = false;
  }

  if (filterID && filterID !== undefined) {
    adoptionReq = await db
      .select()
      .from(AdoptionRequestsDB)
      .where(eq(AdoptionRequestsDB.id, filterID));

    if (adoptionReq[0].isRead === false && adoptionReq.length > 0) {
      await db
        .update(AdoptionRequestsDB)
        .set({ isRead: true })
        .where(eq(AdoptionRequestsDB.id, filterID));
    }
  } else if (
    readingFilter &&
    readingFilter !== undefined &&
    readingFilterBoolean !== undefined
  ) {
    adoptionReq = await db
      .select()
      .from(AdoptionRequestsDB)
      .where(eq(AdoptionRequestsDB.isRead, readingFilterBoolean));
  } else if (
    isApprovedFilter &&
    isApprovedFilter !== undefined &&
    isApprovedFilterBoolean !== undefined
  ) {
    adoptionReq = await db
      .select()
      .from(AdoptionRequestsDB)
      .where(eq(AdoptionRequestsDB.isApproved, isApprovedFilterBoolean));
  } else {
    adoptionReq = await db.select().from(AdoptionRequestsDB);
  }

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
    const imgFront = await uploadImgs(validationData.CImgFront, uuidv4());
    const imgBack = await uploadImgs(validationData.CImgBack, uuidv4());

    const adoptionReq = await db.insert(AdoptionRequestsDB).values({
      id: uuidv4(),
      ...validationData,
      isRead: false,
      isApproved: false,
      CImgFront: imgFront.url,
      CImgBack: imgBack.url,
      idImgCBack: imgBack.fileId,
      idImgCIFront: imgFront.fileId,
    });
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
    const CImgFrontFieldId = await db
      .select({ fileId: AdoptionRequestsDB.CImgFront })
      .from(AdoptionRequestsDB)
      .where(eq(AdoptionRequestsDB.id, id));
    const CImgBackFieldId = await db
      .select({ fileId: AdoptionRequestsDB.CImgBack })
      .from(AdoptionRequestsDB)
      .where(eq(AdoptionRequestsDB.id, id));

    if (CImgFrontFieldId[0].fileId && CImgBackFieldId[0].fileId) {
      try {
        await deleteImg(CImgFrontFieldId[0].fileId);
        await deleteImg(CImgBackFieldId[0].fileId);
      } catch {
        console.log("not img deleted");
      }
    }
    try {
      await db.delete(AdoptionRequestsDB).where(eq(AdoptionRequestsDB.id, id));
    } catch (error) {
      console.log(error);
    }

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
    console.log("id", id);

    if (!id) {
      throw new Error("ID not found");
    }

    const idValidation = deleteAdoptionReqSchema.safeParse({ id });
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
    const dataValidadtion = updateAdoptionReqSchema.safeParse(body);
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

    const updateData = await db
      .update(AdoptionRequestsDB)
      .set({ isApproved: dataValidadtion.data.isApproved })
      .where(eq(AdoptionRequestsDB.id, id));

    console.log("updateData", updateData);

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
