"use client";
import useForm from "@/hooks/use-fom";
import useFetch from "@/hooks/usefetch";
import { API_URL, COMPLAINT_DETAILS } from "@/lib/apiEndPoints";
import {ComplaintsType, dataTypeIds } from "@/types";
import SearchSelect from "@/components/ui/search-select";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { TextareaInput } from "@/components/TextareaInput";
import { FileUpload } from "@/components/file-upload";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import SubmitBtn from "@/components/ui/submit-button";
import { useSession } from "next-auth/react";

export default function ComplaintDetailsForm({
  complaintId,
  complaint,
  technicians,
}: {
  complaintId: number;
  complaint: ComplaintsType;
  technicians: dataTypeIds[];
}) {
  const { data: branchesData, isLoading: branchesLoading } = useFetch<
    dataTypeIds[]
  >(`${API_URL}/fetch-branches`);
  const { data: brandsData, isLoading: brandsLoading } = useFetch<
    dataTypeIds[]
  >(`${API_URL}/fetch-authorized-brands`);

  const { data, setData, errors, put, processing, reset } = useForm({
    branch_id: complaint?.branch_id || "",
    brand_id: complaint?.brand_id || "",
    product: complaint?.product || "",
    model: complaint?.model || "",
    serial_number_ind: complaint?.serial_number_ind || "",
    serial_number_oud: complaint?.serial_number_oud || "",
    mq_nmb: complaint?.mq_nmb || "",
    p_date: complaint?.p_date || "",
    complete_date: complaint?.complete_date || "",
    amount: complaint?.amount || "",
    technician: complaint?.technician || "",
    status: complaint?.status || "",
    complaint_type: complaint?.complaint_type || "",
    provided_services: complaint?.provided_services || "",
    extra: complaint?.extra || "",
    files: [] as File[],
  });
  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      const updatedFiles = [...data.files, ...files];
      setData("files", updatedFiles);
    }
  };
  const router = useRouter();
  const session = useSession();
  const token = session.data?.token || ''
  const handleSubmit = (event: React.FormEvent) => {

    event.preventDefault();
    put(`${API_URL}${COMPLAINT_DETAILS}/${complaintId}`, {
      onSuccess: (response) => {
        toast.success(response.message);
        router.refresh();
      },
      onError: (error) => {
        toast.error(error.message);
      },
    }, token);
  };
  return (
    <form className="space-y-2 p-2" onSubmit={handleSubmit}>
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
          <div className="space-y-1 mt-2">
            <Skeleton className="h-3 w-[20%]" />
            <Skeleton className="h-10 w-full" />
          </div>
        )}
        <LabelInputContainer
          label="Product"
          placeholder="Product"
          onChange={(e) => setData("product", e.target.value)}
          value={data.product}
        />
        <LabelInputContainer
          label="Model"
          placeholder="Model"
          onChange={(e) => setData("model", e.target.value)}
          value={data.model}
        />
        <LabelInputContainer
          label="Serial Number In"
          placeholder="Serial Number In"
          onChange={(e) => setData("serial_number_ind", e.target.value)}
          value={data.serial_number_ind}
        />
        <LabelInputContainer
          label="Serial Number Out"
          placeholder="Serial Number Out"
          onChange={(e) => setData("serial_number_oud", e.target.value)}
          value={data.serial_number_oud}
        />
        <LabelInputContainer
          label="MQ Number"
          placeholder="MQ Number"
          onChange={(e) => setData("mq_nmb", e.target.value)}
          value={data.mq_nmb}
        />
        <LabelInputContainer
          type="date"
          label="P Date"
          placeholder="P Date"
          onChange={(e) => setData("p_date", e.target.value)}
          value={data.p_date}
        />
        <div className="col-span-2">
          <LabelInputContainer
            label="Amount"
            placeholder="Amount"
            onChange={(e) => setData("amount", e.target.value)}
            value={data.amount}
          />
        </div>
        <div className="col-span-2">
          {technicians ? (
            <SearchSelect
              options={technicians}
              label="Technician"
              value={data.technician}
              onChange={(e) => setData("technician", e)}
              description="Choose the Technician who will handle this complaint"
              width="full"
              className="mt-2"
            />
          ) : (
            <div className="space-y-1 mt-2">
              <Skeleton className="h-3 w-[20%]" />
              <Skeleton className="h-10 w-full" />
            </div>
          )}
        </div>
      </div>
      <TextareaInput
        label="Extra"
        placeholder="Extra"
        onChange={(e) => setData("extra", e.target.value)}
        value={data.extra}
      />
      <div className="rounded-lg border p-4">
        <div className="mb-4">
          <label className="block text-sm font-medium">Document Type</label>
          <select
            className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            onChange={(e) => {
              if (!data.files.some(f => f.name.includes(e.target.value))) {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png';
                fileInput.onchange = (event) => {
                  const files = (event.target as HTMLInputElement).files;
                  if (files && files[0]) {
                    const file = files[0];
                    const newFile = new File([file], `${e.target.value}_${file.name}`, {
                      type: file.type
                    });
                    setData("files", [...data.files, newFile]);
                  }
                };
                fileInput.click();
              } else {
                toast.error("This document type already exists");
              }
            }}
          >
            <option value="">Select document type</option>
            {!data.files.some(f => f.name.includes('warranty')) && (
              <option value="warranty">Warranty Card</option>
            )}
            {!data.files.some(f => f.name.includes('purchase')) && (
              <option value="purchase">Purchase Document</option>
            )}
            {!data.files.some(f => f.name.includes('inspection')) && (
              <option value="inspection">Inspection Report</option>
            )}
            {!data.files.some(f => f.name.includes('repair')) && (
              <option value="repair">Repair Document</option>
            )}
          </select>
        </div>

        {data.files.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">Selected Documents</label>
            <div className="divide-y divide-gray-200 rounded-md border">
              {data.files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    className="text-sm text-red-600 hover:text-red-800"
                    onClick={() => {
                      setData("files", data.files.filter((_, i) => i !== index));
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <FileUpload onFileSelect={handleFileSelect} isMulti={true} label="Files" description="Upload files related to this complaint" />
      <div className="flex justify-end items-cener gap-2">
        <Button onClick={() => reset()} type="button" variant="outline">
          Cancel
        </Button>
        <SubmitBtn label="Save" processing={processing} />
      </div>
    </form>
  );
}
