"use client";
import { SelectInput } from "@/components/SelectInput";
import useForm from "@/hooks/use-fom";
import useFetch from "@/hooks/usefetch";
import { API_URL } from "@/lib/apiEndPoints";
import { ComplaintDetailsType, dataTypeIds } from "@/types";
import SearchSelect from "@/components/ui/search-select";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { TextareaInput } from "@/components/TextareaInput";
import { FileUpload } from "@/components/file-upload";

export default function ComplaintDetailsForm({
  complaint,
}: {
  complaint: ComplaintDetailsType;
}) {
  const { data: branchesData, isLoading: branchesLoading } = useFetch<
    dataTypeIds[]
  >(`${API_URL}/fetch-branches`);
  const { data: brandsData, isLoading: brandsLoading } = useFetch<
    dataTypeIds[]
  >(`${API_URL}/fetch-authorized-brands`);
  const { data, setData, errors, put } = useForm({
    branch_id: complaint.branch_id || "",
    brand_id: complaint.brand_id || "",
    product: complaint.product || "",
    model: complaint.model || "",
    serial_number_ind: complaint.serial_number_ind || "",
    serial_number_oud: complaint.serial_number_oud || "",
    mq_nmb: complaint.mq_nmb || "",
    p_date: complaint.p_date || "",
    complete_date: complaint.complete_date || "",
    amount: complaint.amount || "",
    technician: complaint.technician || "",
    status: complaint.status || "",
    complaint_type: complaint.complaint_type || "",
    provided_services: complaint.provided_services || "",
    extra: complaint.extra || "",
    images: [] as File[],
  });
  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setData("images", files);
    }
  };
  return (
    <div className="space-y-2 p-2">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {!branchesLoading && branchesData ? (
          <SearchSelect
            options={branchesData}
            label="Branch"
            value={data.branch_id}
            onChange={(e) => setData("branch_id", e)}
            description="Choose the Branch where you want to add this complaint"
            width="full"
            className="mt-2"
          />
        ) : (
          <div className="mt-2 space-y-1">
            <Skeleton className="h-3 w-[20%]" />
            <Skeleton className="h-10 w-full" />
          </div>
        )}
        {!brandsLoading && brandsData ? (
          <SearchSelect
            options={brandsData}
            label="Brand"
            value={data.brand_id}
            onChange={(e) => setData("brand_id", e)}
            description="Choose the Brand where you want to add this complaint"
            width="full"
            className="mt-2"
          />
        ) : (
          <div className="space-y- mt-2">
            <Skeleton className="h-3 w-[20%]" />
            <Skeleton className="h-10 w-full" />
          </div>
        )}
        <LabelInputContainer
          label="Product"
          placeholder="Product"
          onChange={(e) => setData("product", e.target.value)}
          value={data.product}
          required
        />
        <LabelInputContainer
          label="Model"
          placeholder="Model"
          onChange={(e) => setData("model", e.target.value)}
          value={data.model}
          required
        />
        <LabelInputContainer
          label="Serial Number In"
          placeholder="Serial Number In"
          onChange={(e) => setData("serial_number_ind", e.target.value)}
          value={data.serial_number_ind}
          required
        />
        <LabelInputContainer
          label="Serial Number Out"
          placeholder="Serial Number Out"
          onChange={(e) => setData("serial_number_oud", e.target.value)}
          value={data.serial_number_oud}
          required
        />
        <LabelInputContainer
          label="MQ Number"
          placeholder="MQ Number"
          onChange={(e) => setData("mq_nmb", e.target.value)}
          value={data.mq_nmb}
          required
        />
        <LabelInputContainer
          label="P Date"
          placeholder="P Date"
          onChange={(e) => setData("p_date", e.target.value)}
          value={data.p_date}
          required
        />
        <div className="col-span-2">
          <LabelInputContainer
            label="Amount"
            placeholder="Amount"
            onChange={(e) => setData("amount", e.target.value)}
            value={data.amount}
            required
          />
        </div>
        <div className="col-span-2">
          <LabelInputContainer
            label="Technician"
            placeholder="Technician"
            onChange={(e) => setData("technician", e.target.value)}
            value={data.technician}
            required
          />
        </div>
      </div>
      <TextareaInput
        label="Extra"
        placeholder="Extra"
        onChange={(e) => setData("extra", e.target.value)}
        value={data.extra}
      />
      <FileUpload onFileSelect={handleFileSelect} />
    </div>
  );
}
