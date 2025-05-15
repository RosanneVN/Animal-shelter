import type { APIRoute } from "astro";
import { db, eq, UserAuth } from "astro:db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "tu_secreto_seguro";

export const POST: APIRoute = async ({ request }) => {
  const { username, password } = await request.json();
  const user = await db
    .select()
    .from(UserAuth)
    .where(eq(UserAuth.username, username));

  if (!user || !(await bcrypt.compare(password, user[0].password))) {
    return new Response("Credenciales inválidas", { status: 401 });
  }
  //genera el token
  const token = jwt.sign(
    { id: user[0].id, username: user[0].username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  //Devuelve el token en una cookie HTTP-only
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `auth_token=${token}; Path=/; HttpOnly; Secure; Max-Age=3600`,
    },
  });
};
