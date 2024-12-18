"use client";
import React, { FormEventHandler } from "react";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useForm from "@/hooks/use-fom";
import { API_URL, BRANCHES } from "@/lib/apiEndPoints";
import revalidate from "@/action/revalidate";
import SubmitBtn from "@/components/ui/submit-button";
import { useSession } from "next-auth/react";
import { Textarea } from "@/components/ui/textarea";

export default function Form() {
  const session = useSession();
  const token = session.data?.token || "";
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    branch_contact_no: "",
    branch_address: "",
    status: "",
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post(
      API_URL + BRANCHES,
      {
        onSuccess: (response) => {
          toast.success(response.message);
          revalidate();
          reset();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
      token,
    ); // Pass the token as the third parameter
  };

  return (
    <form className="w-full p-2 sm:p-0" onSubmit={submit}>
      <div className="w-full">
        <LabelInputContainer
          label="Branch Name"
          type="text"
          value={data.name}
          onChange={(e) => setData("name", e.target.value)}
          required
          id="large-url"
          placeholder="Lahore Branch"
          errorMessage={errors.name}
        />
        <LabelInputContainer
          label="Branch Contact no"
          type="number"
          value={data.branch_contact_no}
          onChange={(e) => setData("branch_contact_no", e.target.value)}
          required
          id="contact-no"
          placeholder="eg: XXXXXXXXX"
          errorMessage={errors.branch_contact_no}
        />
        <Label>Address:</Label>
        <Textarea
          value={data.branch_address}
          placeholder="write the branch address..."
          onChange={(e) => setData("branch_address", e.target.value)}
        />
        <div className="mb-1">
          <Label>Status</Label>
          <Select
            value={data.status}
            onValueChange={(status) => setData({ ...data, status })}
          >
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent side="top">
              {["active", "inactive"].map((statusOption) => (
                <SelectItem key={statusOption} value={statusOption}>
                  {statusOption}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <SubmitBtn
        processing={processing}
        label="Create new domain"
        className="w-full"
      />
    </form>
  );
}
