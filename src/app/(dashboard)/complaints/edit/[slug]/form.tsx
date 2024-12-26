import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { ComplaintDetailsType, dataTypeIds, User } from "@/types";
import React from "react";
import BasicForm from "../../components/form";
import { COMPLAINTS } from "@/lib/apiEndPoints";
import { API_URL } from "@/lib/apiEndPoints";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import ComplaintDetailsForm from "./complaint-details-form";

interface ComplaintData {
  id: number;
  user_id: string;
  complain_num: string;
  complaint_heading: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  applicant_whatsapp: string;
  applicant_adress: string;
  description: string;
  status: string;
  created_at: string;
  updated_at: string;
  complaint_details: ComplaintDetailsType;
  user: User;
}

interface FormProps {
  complaint: ComplaintData;
  technicians: dataTypeIds[];
}

export default function Form({ complaint, technicians }: FormProps) {
  return (
    <div className="space-y-2 rounded-md border bg-white p-4 shadow dark:bg-gray-900">
      <h2 className="flex justify-between font-serif text-lg font-semibold">
        Update Complaint Details
        <span className="text-sm text-gray-500">
          Creted by {complaint.user.name} on {formatDate(complaint.created_at)}
        </span>
      </h2>
      <Collapsible>
        <div className="flex items-center justify-between rounded-md border bg-gray-100 p-2">
          <h3 className="font-serif text-lg font-semibold">Basic Details</h3>
          <CollapsibleTrigger className="">
            <ChevronDownIcon className="h-4 w-4" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <BasicForm
            complaint={complaint}
            endpoint={`${API_URL}${COMPLAINTS}/${complaint.id}`}
          />
        </CollapsibleContent>
      </Collapsible>
      <Separator />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
      <Collapsible defaultOpen={true}>
        <div className="flex items-center justify-between rounded-md border bg-gray-100 p-2">
          <h3 className="font-serif text-lg font-semibold">
            Complaint Details
          </h3>
          <CollapsibleTrigger className="">
            <ChevronDownIcon className="h-4 w-4" />
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <ComplaintDetailsForm complaint={complaint.complaint_details} technicians={technicians} />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
