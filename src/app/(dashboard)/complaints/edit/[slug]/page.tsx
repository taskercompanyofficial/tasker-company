import React from "react";
import { fetchData } from "@/app/dataFetch/fetchData";
import { API_URL, COMPLAINTS } from "@/lib/apiEndPoints";
import Form from "./form";
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
  const technicians = await fetchData({
    endPoint: `${API_URL}/fetch-workers?role=technician&status=active`,
  });
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Edit Complaint | {response.data.complain_num} -{" "}
        {response.data.complaint_heading}
      </h1>
      <p className="text-medium">{response.data.description}</p>

      <Form complaint={response.data} technicians={technicians.data} />
    </div>
  );
}
