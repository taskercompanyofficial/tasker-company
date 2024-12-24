"use client";
import { toast } from "sonner";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import useForm from "@/hooks/use-fom";
import { API_URL, COMPLAINTS } from "@/lib/apiEndPoints";
import SubmitBtn from "@/components/ui/submit-button";
import { useSession } from "next-auth/react";
import { TextareaInput } from "@/components/TextareaInput";
import { useRouter } from "next/navigation";
import { ComplaintsType } from "@/types";
import { SelectInput } from "@/components/SelectInput";
import { ComplaintStatusOptions } from "@/lib/otpions";

export default function BasicForm({
  complaint,
  endpoint,
}: {
  complaint?: ComplaintsType;
  endpoint?: string;
}) {
  const router = useRouter();
  const session = useSession();
  const token = session.data?.token || "";
  const { data, setData, processing, post, errors, put } = useForm({
    complaint_heading: complaint?.complaint_heading || "",
    applicant_name: complaint?.applicant_name || "",
    applicant_email: complaint?.applicant_email || "",
    applicant_phone: complaint?.applicant_phone || "",
    applicant_whatsapp: complaint?.applicant_whatsapp || "",
    applicant_adress: complaint?.applicant_adress || "",
    description: complaint?.description || "",
    status: complaint?.status || "open",
  });
  const url = endpoint || API_URL + COMPLAINTS;
  const method = endpoint ? put : post;
  const createTracker = async (event: React.FormEvent) => {
    event.preventDefault();
    method(
      url,
      {
        onSuccess: (response) => {
          toast.success(
            `Complaint created successfully! by this ID ${response.data.complain_num} Redirecting to complaint page...`,
          );
          router.push(`/complaints/edit/${response.data.complain_num}`);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
      token,
    );
  };
  return (
    <div className="relative rounded bg-white p-2 dark:bg-slate-950">
      <form className="mt-2 space-y-2" onSubmit={createTracker}>
        <div className="w-full space-y-2">
          <LabelInputContainer
            type="text"
            autoFocus
            id="complaint-heading"
            placeholder="Complaint Heading"
            label="Complaint Heading"
            value={data.complaint_heading}
            onChange={(e) => setData("complaint_heading", e.target.value)}
            errorMessage={errors.complaint_heading}
            required
          />
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <LabelInputContainer
              type="text"
              autoFocus
              id="applicant-name"
              placeholder="Applicant name"
              label="Name"
              value={data.applicant_name}
              onChange={(e) => setData("applicant_name", e.target.value)}
              errorMessage={errors.applicant_name}
              required
            />
            <LabelInputContainer
              type="text"
              autoFocus
              id="applicant-email"
              placeholder="Applicant email"
              label="Email (optional)"
              value={data.applicant_email}
              onChange={(e) => setData("applicant_email", e.target.value)}
              errorMessage={errors.applicant_email}
            />
            <LabelInputContainer
              type="number"
              autoFocus
              id="applicant-phone"
              placeholder="Applicant phone"
              label="Phone"
              value={data.applicant_phone}
              onChange={(e) => setData("applicant_phone", e.target.value)}
              errorMessage={errors.applicant_phone}
              required
            />
            <LabelInputContainer
              type="number"
              autoFocus
              id="applicant-whatsapp"
              placeholder="Applicant whatsapp"
              label="Whatsapp (optional)"
              value={data.applicant_whatsapp}
              onChange={(e) => setData("applicant_whatsapp", e.target.value)}
              errorMessage={errors.applicant_whatsapp}
            />
          </div>

          <TextareaInput
            label="Address"
            placeholder="Enter applicant address..."
            maxLength={250}
            value={data.applicant_adress}
            onChange={(e) => setData("applicant_adress", e.target.value)}
            errorMessage={errors.applicant_adress}
            className="bg-gray-50"
          />
          <TextareaInput
            label="Description"
            placeholder="Descrbe the issue..."
            maxLength={250}
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            errorMessage={errors.description}
            className="bg-gray-50"
          />
        </div>
        {endpoint && (
          <SelectInput
            options={ComplaintStatusOptions}
            selected={data.status}
            onChange={(status) => setData({ ...data, status })}
            placeholder="Select Status"
            label="Select Status"
          />
        )}
        <SubmitBtn
          processing={processing}
          label={
            endpoint
              ? `Update ${complaint?.complaint_heading}`
              : "Create New Complaint"
          }
          className="w-full"
        />
      </form>
    </div>
  );
}
