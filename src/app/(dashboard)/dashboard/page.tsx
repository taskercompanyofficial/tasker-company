import FirstChart from "@/components/dashboard/charts/FirstChart";
import { auth } from "auth";
import React from "react";

export default async function page() {
  const session = await auth();
  return (
    <div className="">
      <FirstChart />
    </div>
  );
}
