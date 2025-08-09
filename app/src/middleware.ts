import { defineMiddleware } from 'astro:middleware';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "tu_secreto_seguro";
// Define the base paths for your administration area
const adminPathPrefixes = ['/admin']; 

// Define the path to your login page
const loginPath = '/login'; // Adjust if your login page is at a different path

export const onRequest = defineMiddleware(async (context, next) => {
  const currentPath = new URL(context.request.url).pathname;

  // Check if the current path is an administration path
  const isAdminPath = adminPathPrefixes.some(prefix => currentPath.startsWith(prefix));

  if (isAdminPath) {
    const tokenCookie = context.cookies.get('auth_token');
    const token = tokenCookie?.value;

    if (!token) {
      // No token found, redirect to the login page
      // Preserve the intended destination via a query parameter (optional)
      const redirectTo = new URL(loginPath, context.url.origin);
      redirectTo.searchParams.set('redirect', currentPath);
      return Response.redirect(redirectTo, 307); // 307 Temporary Redirect
    }

    try {
      // Verify the token
      jwt.verify(token, JWT_SECRET);
      // Token is valid, proceed to the requested page
      return next();
    } catch (error) {
      // Token is invalid (e.g., expired, malformed)
      console.error("Token verification failed:", error);
      
      // Clear the invalid cookie to prevent redirect loops if the cookie is malformed
      context.cookies.delete('auth_token', { path: '/' });
      
      // Redirect to the login page
      const redirectTo = new URL(loginPath, context.url.origin);
      // Optionally, you could add an error message to the query params
      // redirectTo.searchParams.set('error', 'session_expired');
      return Response.redirect(redirectTo, 307);
    }
  }

  // Not an admin path, or an issue with the setup, proceed normally
  return next();
});
