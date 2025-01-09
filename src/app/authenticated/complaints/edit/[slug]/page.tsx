import React from "react";
import { API_URL, COMPLAINTS } from "@/lib/apiEndPoints";
import { fetchData } from "@/app/dataFetch/fetchData";
import { getImageUrl } from "@/lib/utils";
import { description, keywords, title } from "@/lib/Meta";
import { notFound } from "next/navigation";
import Form from "../form";

// Function to dynamically generate metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  try {
    // Fetch the data for the slug
    const endPoint = `${API_URL}${COMPLAINTS}/${slug}`;
    const response = await fetchData({ endPoint });

    if (!response || !response.data) {
      throw new Error("Failed to fetch complaint data");
    }

    const image = response.data.image
      ? response.data.image
      : response.data.hero_image
        ? response.data.hero_image
        : "/assets/images/og-image.webp";
    const imagePath = getImageUrl(image);
    const keywordsArray = response.data.keywords?.split(",") || [];

    return {
      title: `${response.data.description} | Complaints ${title}`, // Dynamic title
      description: response.data.description || description,
      keywords: [keywords, keywordsArray],
      openGraph: {
        title: `${response.data.description} | Complaints ${title}`, // Dynamic title
        description: response.data.description || description,
        url: `https://taskercompany.com/complaints/${slug}`, // Adjust URL to your app structure
        siteName: "Tasker Company",
        images: [
          {
            url: imagePath,
            width: 1200,
            height: 630,
            alt: "Tasker Company - Comprehensive Services",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        site: "@taskercompany", // Replace with your Twitter handle
        title: `${response.data.description} | Complaints ${title}`, // Dynamic title
        description: response.data.description || description,
        images: [imagePath],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: `Complaints ${title}`,
      description: description,
      keywords: keywords,
    };
  }
}

// Server component function
export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  try {
    const endPoint = `${API_URL}${COMPLAINTS}/${slug}`;
    const response = await fetchData({ endPoint });

    if (!response || !response.data) {
      notFound();
    }

    return (
      <>
        <div className="mb-2">
          <h2 className="font-serif text-lg font-semibold uppercase">{slug}</h2>
          <p className="hidden font-serif text-sm text-gray-500 sm:block">
            {response.data.description}
          </p>
        </div>
        <Form complaint={response.data} />
      </>
    );
  } catch (error) {
    console.error("Error fetching complaint:", error);
    notFound();
  }
}
