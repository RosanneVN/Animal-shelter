import jwt from "jsonwebtoken";

const JWT_SECRET = "tu_secreto_seguro";

export const vertifyToken =(token: string | null)=>{
    if (!token) return null;
    try {
      return jwt.verify(token, JWT_SECRET);
    } catch {
      return null;
    }
}