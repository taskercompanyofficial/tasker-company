"use client";
import useFetch from "@/hooks/usefetch";
import { API_URL } from "@/lib/apiEndPoints";
import { dataTypeIds } from "@/types";
import SearchSelect from "@/components/ui/search-select";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { TextareaInput } from "@/components/TextareaInput";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

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
          label="Model Number"
          placeholder="Model Number"
          onChange={(e) => setData({ ...data, model: e.target.value })}
          value={data.model}
          className="transition-all duration-200 hover:shadow-md"
        />
        <LabelInputContainer
          label="Extra Number"
          placeholder="Extra Number"
          onChange={(e) => setData({ ...data, extra_numbers: e.target.value })}
          value={data.extra_numbers}
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

        {technician ? (
          <SearchSelect
            options={technician}
            label="Technician"
            value={data.technician}
            onChange={(e) => setData({ ...data, technician: e })}
            width="full"
            className="transition-all duration-200 hover:shadow-md"
          />
        ) : (
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-full" />
          </div>
        )}
        <LabelInputContainer
          label="Amount"
          placeholder="Amount"
          onChange={(e) => setData({ ...data, amount: e.target.value })}
          value={data.amount}
          className="transition-all duration-200 hover:shadow-md"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TextareaInput
          label="Working Details"
          placeholder="Enter any additional details..."
          onChange={(e) =>
            setData({ ...data, working_details: e.target.value })
          }
          value={data.working_details}
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
      <div className="mt-6">
        <h3 className="mb-4 text-sm font-semibold">
          Lab/Service Provider Details
        </h3>
        <div className="flex flex-col gap-4">
          <Collapsible>
            <CollapsibleTrigger className="bg-gray-100 hover:bg-gray-50 flex w-full items-center justify-between rounded border p-1">
              <span>Service Provider #1</span>
              <ChevronDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                <SearchSelect
                  options={[
                    { value: "1", label: "Lab A" },
                    { value: "2", label: "Lab B" },
                    { value: "3", label: "Service Provider X" },
                    { value: "4", label: "Service Provider Y" },
                  ]}
                  label="Lab/Service Provider"
                  value={data.service_provider}
                  onChange={(e) => setData({ ...data, service_provider: e })}
                  width="full"
                  className="mt-2 transition-all duration-200 hover:shadow-md"
                />

                <SearchSelect
                  options={[
                    { value: "pcb", label: "PCB Repair" },
                    { value: "display", label: "Display Replacement" },
                    { value: "chip", label: "Chip Level Service" },
                    { value: "diagnostic", label: "Diagnostic Test" },
                  ]}
                  label="Work Type"
                  value={data.work_type}
                  onChange={(e) => setData({ ...data, work_type: e })}
                  width="full"
                  className="mt-2 transition-all duration-200 hover:shadow-md"
                />

                <LabelInputContainer
                  label="Service Amount"
                  placeholder="Enter amount to be paid"
                  type="number"
                  onChange={(e) =>
                    setData({ ...data, service_amount: e.target.value })
                  }
                  value={data.service_amount}
                  className="transition-all duration-200 hover:shadow-md"
                />

                <TextareaInput
                  label="Work Description"
                  placeholder="Enter details about the work to be done..."
                  onChange={(e) =>
                    setData({ ...data, work_description: e.target.value })
                  }
                  value={data.work_description}
                  className="transition-all duration-200 hover:shadow-md"
                />
              </div>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  /* Add logic to add more service providers */
                }}
              >
                Add Another Service Provider
              </Button>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </div>
  );
}
