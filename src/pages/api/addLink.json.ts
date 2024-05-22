import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  if (!data.isRead) {
    data.isRead = false;
  }

  if (data.rating === "") {
    data.rating = null;
  }

  try {
    const res = await fetch("http://localhost:3000/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dbRes = await res.json();
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        message: "Error adding link",
      }),
      {
        status: 500,
      }
    );
  }

  return new Response(
    JSON.stringify({
      message: "Link added",
    })
  );
};
