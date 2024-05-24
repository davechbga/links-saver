import type { APIRoute } from "astro";

export const DELETE: APIRoute = async ({ params }) => {
  const id = params.id;
  console.log(id);

  const res = await fetch(`http://localhost:3000/links/${id}`, {
    method: "DELETE",
  });

  if (res.ok) {
    return new Response(
      JSON.stringify({
        message: "Link deleted",
        success: true,
      }),
      {
        status: 200,
      }
    );
  }

  return new Response(
    JSON.stringify({
      message: "Error deleting link",
      success: false,
    }),
    {
      status: 404,
    }
  );
};

export const PATCH: APIRoute = async ({ request, params }) => {
  const data = await request.json();
  const id = params.id;

  data.isRead = data.isRead || false;
  data.rating = data.rating === "" ? null : data.rating;

  const res = await fetch(`http://localhost:3000/links/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const dbRes = await res.json();

  if (res.ok) {
    return new Response(
      JSON.stringify({
        message: "Link updated",
        success: true,
      }),
      {
        status: 200,
      }
    );
  }

  return new Response(
    JSON.stringify({
      message: "Error updating link",
      success: false,
    }),
    {
      status: 404,
    }
  );
};
