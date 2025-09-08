import type { APIRoute } from "astro";
import { db, eq, UserAuth } from "astro:db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_seguro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { username, password } = await request.json();
    
    // Validar campos requeridos
    if (!username || !password) {
      return new Response("Usuario y contraseña son requeridos", { status: 400 });
    }
    
    const user = await db
      .select()
      .from(UserAuth)
      .where(eq(UserAuth.username, username));

    if (!user[0] || !(await bcrypt.compare(password, user[0].password))) {
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
    
  } catch (error) {
    console.error("Error en login:", error);
    return new Response("Error interno del servidor", { status: 500 });
  }
};
