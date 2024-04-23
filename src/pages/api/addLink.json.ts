import type { Links } from "@/types/Links";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  

  if (data.isRead) {
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
    const json = await res.json();
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({
        message: (e as Error).message,
      }),

      {
        status: 500,
      }
    );
  }

  return new Response(
    JSON.stringify({
      message: "This was a POST!",
    })
  );
};
