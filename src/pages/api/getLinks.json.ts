import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  try {
    const res = await fetch(`http://localhost:3000/links/${id || ""}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Network response was not ok");
    }

    const dbRes = await res.json();

    return new Response(
      JSON.stringify({
        data: dbRes,
        success: true,
      }),
      {
        status: 200,
      }
    );
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
