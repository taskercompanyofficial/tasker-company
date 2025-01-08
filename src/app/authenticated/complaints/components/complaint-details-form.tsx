"use client";
import useFetch from "@/hooks/usefetch";
import { API_URL } from "@/lib/apiEndPoints";
import { dataTypeIds } from "@/types";
import SearchSelect from "@/components/ui/search-select";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { TextareaInput } from "@/components/TextareaInput";
import { toast } from "sonner";

export default function ComplaintDetailsForm({
  data,
  setData,
  errors,
  technician
}: {
  data: any;
  setData: (data: any) => void;
  errors: any;
  technician?: dataTypeIds[]
}) {
  const { data: branchesData, isLoading: branchesLoading } = useFetch<
    dataTypeIds[]
  >(`${API_URL}/fetch-branches`);
  const { data: brandsData, isLoading: brandsLoading } = useFetch<
    dataTypeIds[]
  >(`${API_URL}/fetch-authorized-brands`);


  return (
    <>


      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <LabelInputContainer
          type="text"
          autoFocus
          id="brand-complaint-no"
          placeholder="Brand Complaint No"
          label="Brand Complaint No "
          value={data.brand_complaint_no}
          onChange={(e) => setData({ ...data, brand_complaint_no: e.target.value })}
          errorMessage={errors.brand_complaint_no}
        />
        <LabelInputContainer
          label="Serial Number In"
          placeholder="Serial Number In"
          onChange={(e) => setData({ ...data, serial_number_ind: e.target.value })}
          value={data.serial_number_ind}
        />
        <LabelInputContainer
          label="Serial Number Out"
          placeholder="Serial Number Out"
          onChange={(e) => setData({ ...data, serial_number_oud: e.target.value })}
          value={data.serial_number_oud}
        />
        <LabelInputContainer
          label="Extra number"
          placeholder="Extra number"
          onChange={(e) => setData({ ...data, extra: e.target.value })}
          value={data.extra}
        />
        <LabelInputContainer
          type="date"
          label="Date of Purchase"
          placeholder="Date of Purchase"
          onChange={(e) => setData({ ...data, p_date: e.target.value })}
          value={data.p_date}
        />
        <div className="col-span-2">
          <LabelInputContainer
            label="Amount"
            placeholder="Amount"
            onChange={(e) => setData({ ...data, amount: e.target.value })}
            value={data.amount}
          />
        </div>
      </div>  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">

        {!branchesLoading && branchesData ? (
          <SearchSelect
            options={branchesData}
            label="Branch"
            value={data.branch_id}
            onChange={(e) => setData({ ...data, branch_id: e })}
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
            onChange={(e) => setData({ ...data, brand_id: e })}
            width="full"
            className="mt-2"
          />
        ) : (
          <div className="space-y-1 mt-2">
            <Skeleton className="h-3 w-[20%]" />
            <Skeleton className="h-10 w-full" />
          </div>
        )}
        {technician ? (
          <SearchSelect
            options={technician}
            label="Technician"
            value={data.technician_id}
            onChange={(e) => setData({ ...data, technician_id: e })}
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
      <TextareaInput
        label="Extra"
        placeholder="Extra"
        onChange={(e) => setData({ ...data, extra: e.target.value })}
        value={data.extra}
      />
      <TextareaInput
        label="Happy Call Remarks"
        placeholder="Happy Call Remarks"
        onChange={(e) => setData({ ...data, happy_call_remarks: e.target.value })}
        value={data.happy_call_remarks}
      />
    </>
  );
}
