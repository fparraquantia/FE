import { BACKEND_URL } from "@/core/constants";

export async function fetchAPI<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
): Promise<any> {
  try {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    };

    if (body) {
      options.body = JSON.stringify(body);
    }

    console.log(`${BACKEND_URL}${url}`, options);
    const res = await fetch(`${BACKEND_URL}${url}`, options);

    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }
    try {
      return await res.json();
    } catch (error) {
      // Devuelve null silenciosamente si la respuesta no es JSON
      return null;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`An error occurred: ${error.message}`);
    }
    throw new Error("An unknown error occurred.");
  }
}
