"use client";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { TextareaInput } from "@/components/TextareaInput";
import { complaintTypeOptions } from "@/lib/otpions";
import { SelectInput } from "@/components/SelectInput";
import { Skeleton } from "@/components/ui/skeleton";
import { dataTypeIds } from "@/types";
import { API_URL } from "@/lib/apiEndPoints";
import useFetch from "@/hooks/usefetch";
import SearchSelect from "@/components/ui/search-select";
import { fetchSuggestions } from "@/lib/google";
import { useEffect, useState } from "react";
import { PlaceData } from "@googlemaps/google-maps-services-js";

export default function BasicForm({
  data,
  setData,
  errors,
}: {
  data: any;
  setData: (data: any) => void;
  errors: any;
}) {
  const { data: brandsData, isLoading: brandsLoading } = useFetch<
    dataTypeIds[]
  >(`${API_URL}/crm/fetch-authorized-brands`);
  const [suggestions, setSuggestions] = useState<Partial<PlaceData>[]>([]);
  useEffect(() => {
    const result = fetchSuggestions(data.applicant_adress);
    console.log(result);
  }, [data.applicant_adress]);
  return (
    <div>
      <div className="w-full space-y-2">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <LabelInputContainer
            type="text"
            id="brand_complaint_no"
            placeholder="eg: 123123sas"
            label="Brand Complaint No"
            value={data.brand_complaint_no}
            onChange={(e) =>
              setData({ ...data, brand_complaint_no: e.target.value })
            }
            errorMessage={errors.brand_complaint_no}
          />
          <LabelInputContainer
            type="text"
            autoFocus
            id="applicant-name"
            placeholder="Applicant name"
            label="Name"
            value={data.applicant_name}
            onChange={(e) =>
              setData({ ...data, applicant_name: e.target.value })
            }
            errorMessage={errors.applicant_name}
            required
          />
          <LabelInputContainer
            type="text"
            id="applicant-email"
            placeholder="Applicant email"
            label="Email"
            value={data.applicant_email}
            onChange={(e) =>
              setData({ ...data, applicant_email: e.target.value })
            }
            errorMessage={errors.applicant_email}
          />
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
          <LabelInputContainer
            type="number"
            id="applicant-phone"
            placeholder="Applicant phone"
            label="Phone"
            value={data.applicant_phone}
            onChange={(e) =>
              setData({ ...data, applicant_phone: e.target.value })
            }
            errorMessage={errors.applicant_phone}
            required
          />
          <LabelInputContainer
            type="number"
            id="applicant-whatsapp"
            placeholder="Applicant whatsapp"
            label="Whatsapp"
            value={data.applicant_whatsapp}
            onChange={(e) =>
              setData({ ...data, applicant_whatsapp: e.target.value })
            }
            errorMessage={errors.applicant_whatsapp}
          />
          <LabelInputContainer
            type="text"
            id="extra-numbers"
            placeholder="Extra phone numbers"
            label="Extra numbers"
            value={data.extra_numbers}
            onChange={(e) =>
              setData({ ...data, extra_numbers: e.target.value })
            }
            errorMessage={errors.extra_numbers}
          />
          <LabelInputContainer
            type="text"
            id="reference-by"
            placeholder="Reference by"
            label="Reference by"
            value={data.reference_by}
            onChange={(e) => setData({ ...data, reference_by: e.target.value })}
            errorMessage={errors.reference_by}
          />
          <LabelInputContainer
            label="Product"
            placeholder="Product"
            onChange={(e) => setData({ ...data, product: e.target.value })}
            value={data.product}
          />
          {!brandsLoading && brandsData ? (
            <SearchSelect
              options={brandsData}
              label="Brand"
              value={data.brand_id}
              onChange={(e) => setData({ ...data, brand_id: e })}
              width="full"
              className="mt-1 transition-all duration-200 hover:shadow-md"
              customizable
            />
          ) : (
            <div className="mt-1 space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
        </div>
        <SelectInput
          label="Complaint Type"
          placeholder="Complaint Type"
          options={complaintTypeOptions}
          onChange={(value) => setData({ ...data, complaint_type: value })}
          selected={data.complaint_type}
        />
        {suggestions.length > 0 && <div>{JSON.stringify(suggestions)}</div>}
        <TextareaInput
          label="Address"
          placeholder="Enter applicant address..."
          maxLength={250}
          value={data.applicant_adress}
          onChange={(e) =>
            setData({ ...data, applicant_adress: e.target.value })
          }
          errorMessage={errors.applicant_adress}
          className="bg-gray-50"
        />
        <TextareaInput
          label="Fault"
          placeholder="Describe the fault..."
          maxLength={250}
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          errorMessage={errors.description}
          className="bg-gray-50"
        />
      </div>
    </div>
  );
}
