import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    try {
      const res = await fetch(`http://localhost:3000/links/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const dbRes = await res.json();
      if (dbRes.id) {
        return new Response(
          JSON.stringify({
            data: dbRes,
            success: true,
          }),
          {
            status: 200,
          }
        );
      } else {
        throw new Error("Error adding link");
      }
    } catch (e) {
      console.error(e);
      return new Response(
        JSON.stringify({
          message: (e as Error).message,
          success: false,
        }),
        {
          status: 404,
        }
      );
    }
  }
  try {
    const res = await fetch(`http://localhost:3000/links`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const dbRes = await res.json();
    if (dbRes.length) {
      return new Response(
        JSON.stringify({
          data: dbRes,
          success: true,
        }),
        {
          status: 200,
        }
      );
    } else {
      throw new Error("Error adding link");
    }
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        message: (e as Error).message,
        success: false,
      }),
      {
        status: 404,
      }
    );
  }
};
