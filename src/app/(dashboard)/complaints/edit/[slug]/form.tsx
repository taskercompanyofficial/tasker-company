import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { ComplaintsType, User } from "@/types";
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
import { Button } from "@/components/ui/button";
interface ComplaintDetails {
  // Add complaint details fields as needed
}

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
  complaint_details: ComplaintDetails[];
  user: User;
}

interface FormProps {
  complaint: ComplaintData;
}

export default function Form({ complaint }: FormProps) {
  return (
    <div className="space-y-2 rounded-md border bg-white p-4 shadow dark:bg-gray-900">
      <h2 className="flex justify-between font-serif text-lg font-semibold">
        Update Complaint Details
        <span className="text-sm text-gray-500">
          Creted by {complaint.user.name} on {formatDate(complaint.created_at)}
        </span>
      </h2>
      <Collapsible>
        <CollapsibleTrigger>
          <Button>View Details</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <BasicForm
            complaint={complaint}
            endpoint={`${API_URL}${COMPLAINTS}/${complaint.id}`}
          />
        </CollapsibleContent>
      </Collapsible>
      <Separator />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"></div>
    </div>
  );
}
