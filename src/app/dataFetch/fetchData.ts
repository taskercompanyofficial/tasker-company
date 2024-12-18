import { auth } from "auth";

export async function fetchData({ endPoint }: { endPoint: string }) {
  try {
    const session = await auth();
    const token = session?.token;
    const res = await fetch(endPoint, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return {
        data: null,
        message: "Failed to fetch data. Please try again later.",
      };
    }

    const data = await res.json();
    return { data };
  } catch (error) {
    return {
      data: null,
      message: "Unknown error occurred. Please try again later.",
    };
  }
}
