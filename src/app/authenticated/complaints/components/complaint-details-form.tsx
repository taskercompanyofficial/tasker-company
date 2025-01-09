"use client";
import useFetch from "@/hooks/usefetch";
import { API_URL } from "@/lib/apiEndPoints";
import { dataTypeIds } from "@/types";
import SearchSelect from "@/components/ui/search-select";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { TextareaInput } from "@/components/TextareaInput";

export default function ComplaintDetailsForm({
  data,
  setData,
  errors,
  technician,
}: {
  data: any;
  setData: (data: any) => void;
  errors: any;
  technician?: dataTypeIds[];
}) {
  const { data: branchesData, isLoading: branchesLoading } = useFetch<
    dataTypeIds[]
  >(`${API_URL}/crm/fetch-branches`);
  const { data: techniciansData, isLoading: techniciansLoading } = useFetch<
    dataTypeIds[]
  >(`${API_URL}/crm/fetch-workers`);
  const { data: brandsData, isLoading: brandsLoading } = useFetch<
    dataTypeIds[]
  >(`${API_URL}/crm/fetch-authorized-brands`);

  return (
    <div className="space-y-6 rounded-lg bg-white p-4 shadow-sm dark:bg-slate-900">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <LabelInputContainer
          type="text"
          autoFocus
          id="brand-complaint-no"
          placeholder="Brand Complaint No"
          label="Brand Complaint No"
          value={data.brand_complaint_no}
          onChange={(e) =>
            setData({ ...data, brand_complaint_no: e.target.value })
          }
          errorMessage={errors.brand_complaint_no}
          className="transition-all duration-200 hover:shadow-md"
        />
        <LabelInputContainer
          label="Serial Number In"
          placeholder="Serial Number In"
          onChange={(e) =>
            setData({ ...data, serial_number_ind: e.target.value })
          }
          value={data.serial_number_ind}
          className="transition-all duration-200 hover:shadow-md"
        />
        <LabelInputContainer
          label="Serial Number Out"
          placeholder="Serial Number Out"
          onChange={(e) =>
            setData({ ...data, serial_number_oud: e.target.value })
          }
          value={data.serial_number_oud}
          className="transition-all duration-200 hover:shadow-md"
        />
        <LabelInputContainer
          label="Extra Number"
          placeholder="Extra Number"
          onChange={(e) => setData({ ...data, extra: e.target.value })}
          value={data.extra}
          className="transition-all duration-200 hover:shadow-md"
        />
        <LabelInputContainer
          type="date"
          label="Date of Purchase"
          placeholder="Date of Purchase"
          onChange={(e) => setData({ ...data, p_date: e.target.value })}
          value={data.p_date}
          className="transition-all duration-200 hover:shadow-md"
        />
        <LabelInputContainer
          label="Product Type"
          placeholder="Product Type"
          onChange={(e) => setData({ ...data, product_type: e.target.value })}
          value={data.product_type}
          className="transition-all duration-200 hover:shadow-md"
        />
        <LabelInputContainer
          label="MQ Number"
          placeholder="MQ Number"
          onChange={(e) => setData({ ...data, mq_nmb: e.target.value })}
          value={data.mq_nmb}
          className="transition-all duration-200 hover:shadow-md"
        />
        <LabelInputContainer
          label="Amount"
          placeholder="Amount"
          onChange={(e) => setData({ ...data, amount: e.target.value })}
          value={data.amount}
          className="transition-all duration-200 hover:shadow-md"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {!branchesLoading && branchesData ? (
          <SearchSelect
            options={branchesData}
            label="Branch"
            value={data.branch_id}
            onChange={(e) => setData({ ...data, branch_id: e })}
            width="full"
            className="transition-all duration-200 hover:shadow-md"
          />
        ) : (
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-full" />
          </div>
        )}

        {!brandsLoading && brandsData ? (
          <SearchSelect
            options={brandsData}
            label="Brand"
            value={data.brand_id}
            onChange={(e) => setData({ ...data, brand_id: e })}
            width="full"
            className="transition-all duration-200 hover:shadow-md"
          />
        ) : (
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-full" />
          </div>
        )}

        {!techniciansLoading && techniciansData ? (
          <SearchSelect
            options={techniciansData}
            label="Technician"
            value={data.technician_id}
            onChange={(e) => setData({ ...data, technician_id: e })}
            width="full"
            className="transition-all duration-200 hover:shadow-md"
          />
        ) : (
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-full" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TextareaInput
          label="Extra Details"
          placeholder="Enter any additional details..."
          onChange={(e) => setData({ ...data, extra: e.target.value })}
          value={data.extra}
          className="min-h-[120px] transition-all duration-200 hover:shadow-md"
        />
        <TextareaInput
          label="Happy Call Remarks"
          placeholder="Enter happy call remarks..."
          onChange={(e) =>
            setData({ ...data, happy_call_remarks: e.target.value })
          }
          value={data.happy_call_remarks}
          className="min-h-[120px] transition-all duration-200 hover:shadow-md"
        />
      </div>
    </div>
  );
}
