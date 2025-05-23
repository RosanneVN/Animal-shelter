import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies }) => {
  // Eliminar la cookie de autenticación
  cookies.delete("auth_token", {
    path: "/", // Asegúrate de que el path coincida con el usado al crear la cookie
  });

  return new Response(JSON.stringify({ success: true, message: "Logout successful" }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};