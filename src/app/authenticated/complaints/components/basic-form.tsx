"use client";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { TextareaInput } from "@/components/TextareaInput";
import useFetch from "@/hooks/usefetch";
import { API_URL } from "@/lib/apiEndPoints";

export default function BasicForm({
  data,
  setData,
  errors,
}: {
  data: any;
  setData: (data: any) => void;
  errors: any;
}) {
  return (
    <div >
      <div className="w-full space-y-2">
       
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
          <LabelInputContainer
            type="text"
            autoFocus
            id="applicant-name"
            placeholder="Applicant name"
            label="Name"
            value={data.applicant_name}
            onChange={(e) => setData({ ...data, applicant_name: e.target.value })}
            errorMessage={errors.applicant_name}
            required
          />
          <LabelInputContainer
            type="text"
            id="applicant-email"
            placeholder="Applicant email"
            label="Email"
            value={data.applicant_email}
            onChange={(e) => setData({ ...data, applicant_email: e.target.value })}
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
            onChange={(e) => setData({ ...data, applicant_phone: e.target.value })}
            errorMessage={errors.applicant_phone}
            required
          />
          <LabelInputContainer
            type="number"
            id="applicant-whatsapp"
            placeholder="Applicant whatsapp"
            label="Whatsapp"
            value={data.applicant_whatsapp}
            onChange={(e) => setData({ ...data, applicant_whatsapp: e.target.value })}
            errorMessage={errors.applicant_whatsapp}
          />
          <LabelInputContainer
            type="text"
            id="extra-numbers"
            placeholder="Extra phone numbers"
            label="Extra numbers"
            value={data.extra_numbers}
            onChange={(e) => setData({ ...data, extra_numbers: e.target.value })}
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
        </div>

        <TextareaInput
          label="Address"
          placeholder="Enter applicant address..."
          maxLength={250}
          value={data.applicant_adress}
          onChange={(e) => setData({ ...data, applicant_adress: e.target.value })}
          errorMessage={errors.applicant_adress}
          className="bg-gray-50"
        />
        <TextareaInput
          label="Description"
          placeholder="Descrbe the issue..."
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
