import { ComplaintStatusOptions } from "@/lib/otpions";
import React from "react";

export default function Status({ status }: { status: string }) {
  const statusOption =
    ComplaintStatusOptions.find((option) => option.value === status) ||
    ComplaintStatusOptions[0];

  return (
    <div
      className="rounded px-2 py-0.5 text-xs text-white shadow"
      style={{ backgroundColor: `rgb(${statusOption.color})` }}
    >
      <span className="text-xs text-white">{statusOption.label}</span>
    </div>
  );
}
