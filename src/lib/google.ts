"use server";
import { Client } from "@googlemaps/google-maps-services-js";

const client = new Client();

export const fetchSuggestions = async (query: string) => {
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || !query) {
    return [];
  }

  try {
    const response = await client.placeAutocomplete({
      params: {
        input: query,
        key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      },
    });

    if (!response.data.predictions) {
      return [];
    }

    return response.data.predictions;
  } catch (error) {
    console.error("Error fetching Google Places suggestions:", error);
    return [];
  }
};
