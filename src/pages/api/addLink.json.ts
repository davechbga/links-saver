import type { Links } from "@/types/Links";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();

  // Remove spaces in all data json
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === "string") {
      data[key] = data[key].replace(/\s/g, "");
    }
  });

  if (!data.isRead) {
    data.isRead = false;
  } else {
    data.isRead = true;
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
          status: 201,
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
