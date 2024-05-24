import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request, redirect }) => {
  const data = await request.json();
  data.isRead = data.isRead || false;
  data.rating = data.rating === "" ? null : data.rating;

  const res = await fetch("http://localhost:3000/links", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const dbRes = await res.json();

  if (dbRes.id) {
    return new Response(
      JSON.stringify({
        message: "success",
        success: true,
      })
    );
  }

  return new Response(
    JSON.stringify({
      message: "error",
      success: false,
    }),
    {
      status: 404,
    }
  );
};
