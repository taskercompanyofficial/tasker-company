import React from "react";
import Step1 from "../forms/step-1";
import { fetchData } from "@/app/dataFetch/fetchData";
import { API_URL, COMPLAINTS } from "@/lib/apiEndPoints";
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const endPoint = `${API_URL}${COMPLAINTS}/${slug}`;
  const response = await fetchData({ endPoint });
  const title = response.data.complaint_heading;
  const description = response.data.description;

  return {
    title: `${title} | Complaint ${title}`,
    description: description,
  };
}

export default async function page({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const endPoint = `${API_URL}${COMPLAINTS}/${slug}`;
  const response = await fetchData({ endPoint });
  return (
    <div>
      <h1>Complaint ID: {params.slug}</h1>
      <Step1 />
    </div>
  );
}
