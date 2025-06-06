import type { APIRoute } from "astro";
import { BlogPostsDB, db, eq, count, desc } from "astro:db";
import { v4 as uuidv4 } from "uuid";
import {
  BlogPostSchema,
  deleteBlogPostSchema,
  updateBlogPostSchema,
  type CreateBlogPostInput,
  type UpdateBlogPostInput,
} from "../../Backend/Schemas/Blog.schemas";
import { uploadImgs } from "../../Backend/utils/uploadImgs";
import { deleteImg } from "../../Backend/utils/deleteImg";

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const page = Math.max(parseInt(url.searchParams.get("page") || "1", 10), 1);
    const limit = Math.min(
      parseInt(url.searchParams.get("limit") || "10", 10),
      100
    );

    const blogPosts = await db
      .select()
      .from(BlogPostsDB)
      .orderBy(desc(BlogPostsDB.createdAt))
      .offset((page - 1) * limit)
      .limit(limit);

    // Obtener el total de posts para calcular las páginas
    const totalPosts = await db.select({ count: count() }).from(BlogPostsDB);
    const totalPages = Math.ceil(totalPosts[0].count / limit);
    console.log("blog", blogPosts);

    return new Response(
      JSON.stringify({
        data: blogPosts,
        pagination: { page, limit, totalPages },
      }),
      {
        status: 200,
        statusText: "Posts encontrados",
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al obtener posts" }), {
      status: 500,
      statusText: "Error en el servidor",
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const validationResults = BlogPostSchema.safeParse(body);

    if (!validationResults.success) {
      return new Response(
        JSON.stringify({
          error: validationResults.error.flatten().fieldErrors,
        }),
        {
          status: 400,
          statusText: "Datos inválidos",
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const validationData: CreateBlogPostInput = validationResults.data;
    
    // Handle image upload if img is provided
    let imageUrl = validationData.imageUrl;
    let fileId = validationData.fileId;
    
    if (validationData.img) {
      const img = await uploadImgs(validationData.img, validationData.title || uuidv4());
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
      imageUrl = img.url;
      fileId = img.fileId;
    }

    const newPost = await db.insert(BlogPostsDB).values({
      id: uuidv4(),
      title: validationData.title,
      content: validationData.content,
      excerpt: validationData.excerpt,
      imageUrl,
      fileId,
      publishedDate: validationData.publishedDate,
      isPublished: validationData.isPublished,
      createdAt: new Date().toISOString(),
    });

    return new Response(JSON.stringify(newPost), {
      status: 201,
      statusText: "Post creado",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al crear post" }), {
      status: 500,
      statusText: "Error en el servidor",
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      throw new Error("ID no encontrado");
    }

    const validationResult = deleteBlogPostSchema.safeParse({ id });
    if (!validationResult.success) {
      return new Response(
        JSON.stringify({
          errors: validationResult.error.flatten().fieldErrors,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Delete associated image from CDN if exists
    const postFileId = await db
      .select({ fileId: BlogPostsDB.fileId })
      .from(BlogPostsDB)
      .where(eq(BlogPostsDB.id, id));
    
    if (postFileId[0]?.fileId) {
      try {
        await deleteImg(postFileId[0].fileId);
      } catch {
        console.log("Image not deleted from CDN");
      }
    }

    await db.delete(BlogPostsDB).where(eq(BlogPostsDB.id, id));

    return new Response(
      JSON.stringify({ message: `Post con id ${id} eliminado` }),
      {
        status: 200,
        statusText: "Post eliminado",
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al eliminar post" }), {
      status: 500,
      statusText: "Error en el servidor",
      headers: { "Content-Type": "application/json" },
    });
  }
};

export const PATCH: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      throw new Error("ID no encontrado");
    }

    const dataValidation = updateBlogPostSchema.safeParse(body);
    if (!dataValidation.success) {
      return new Response(
        JSON.stringify({ error: dataValidation.error.flatten().fieldErrors }),
        {
          status: 400,
          statusText: "Datos inválidos",
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const validatedData: UpdateBlogPostInput = dataValidation.data;
    let fileId;
    
    // Handle image upload if new image is provided
    if (validatedData.img) {
      // Delete old image from CDN if exists
      const postFileId = await db
        .select({ fileId: BlogPostsDB.fileId })
        .from(BlogPostsDB)
        .where(eq(BlogPostsDB.id, id));
      
      if (postFileId[0]?.fileId) {
        try {
          await deleteImg(postFileId[0].fileId);
        } catch {
          console.log("Old image not deleted from CDN");
        }
      }
      
      // Upload new image
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
      validatedData.imageUrl = img.url;
      fileId = img.fileId;
    }

    const updateData = await db
      .update(BlogPostsDB)
      .set({ ...validatedData, fileId, updatedAt: new Date().toISOString() })
      .where(eq(BlogPostsDB.id, id));

    return new Response(JSON.stringify(updateData), {
      status: 200,
      statusText: "Post actualizado",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al actualizar post" }), {
      status: 500,
      statusText: "Error en el servidor",
      headers: { "Content-Type": "application/json" },
    });
  }
};
