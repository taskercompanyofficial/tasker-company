import React from "react";
import { API_URL, SERVICES } from "@/lib/apiEndPoints";
import { fetchData } from "@/app/dataFetch/fetchData";
import { getImageUrl } from "@/lib/utils";
import { description, keywords, title } from "@/lib/Meta";
import View from "./view";

// Function to dynamically generate metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  // Fetch the data for the slug
  const endPoint = `${API_URL}${SERVICES}/${slug}`;
  const response = await fetchData({ endPoint });

  const image = response?.data?.image
    ? response.data.image
    : response?.data?.hero_image
      ? response.data.hero_image
      : "/assets/images/og-image.webp";
  const imagePath = getImageUrl(image);
  const keywordsArray = response.data.keywords.split(",");
  return {
    title: `${response.data.name} | Services ${title}`, // Dynamic title
    description: response.data.description || { description },
    keywords: [keywords, keywordsArray],
    openGraph: {
      title: `${response.data.name} | Services ${title}`, // Dynamic title
      description: response.data.description || { description },
      url: `https://taskercompany.com/services/${slug}`, // Adjust URL to your app structure
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
      title: `${response.data.name} | Services ${title}`, // Dynamic title
      description: response.data.description || { description },
      images: [imagePath],
    },
  };
}

// Server component function
export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const endPoint = `${API_URL}${SERVICES}/${slug}`;
  const response = await fetchData({ endPoint });

  return <View data={response.data} />;
}
