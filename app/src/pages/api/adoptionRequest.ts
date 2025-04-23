import type { APIRoute } from "astro";
import { AdoptionRequestsDB, db } from "astro:db";

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
