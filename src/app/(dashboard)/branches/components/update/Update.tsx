"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_URL, BRANCHES } from "@/lib/apiEndPoints";
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import SubmitBtn from "@/components/ui/submit-button";
import { Textarea } from "@/components/ui/textarea";
import useForm from "@/hooks/use-fom";
import { BranchesType } from "@/types";
import { toast } from "sonner";
import revalidate from "@/action/revalidate";
import { useSession } from "next-auth/react";

interface UpdateProps {
  token: string;
  domainEndpoint: string;
  rowCurrent: any;
}

interface UpdateState {
  name: string;
  status: string;
  users_ids: string;
}

interface Option {
  value: string;
  label: string;
}

interface UserType {
  unique_id: string;
  name: string;
}

export default function BranchUpdate({
  rowCurrent,
}: {
  rowCurrent: BranchesType;
}) {
  const session = useSession();
  const token = session.data?.token || "";
  const [updateOpen, setUpdateOpen] = useState(false);
  const { data, setData, put, processing, errors } = useForm({
    name: rowCurrent.name,
    branch_contact_no: rowCurrent.branch_contact_no,
    branch_address: rowCurrent.branch_address,
    status: rowCurrent.status,
  });

  const endPoint = `${API_URL + BRANCHES}/${rowCurrent.id}`;

  const update = async (event: React.FormEvent) => {
    event.preventDefault();
    put(
      endPoint,
      {
        onSuccess: (response) => {
          toast.success(response.message);
          revalidate();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
      token,
    );
  };
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="m-0 w-full py-1"
        onClick={() => setUpdateOpen(true)}
      >
        Edit
      </Button>
      <Credenza open={updateOpen} onOpenChange={setUpdateOpen}>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>{rowCurrent.name}</CredenzaTitle>
          </CredenzaHeader>
          <form className="w-full p-2 sm:p-0" onSubmit={update}>
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
              label={`Update Branch ${rowCurrent.name}`}
              className="w-full"
            />
          </form>
        </CredenzaContent>
      </Credenza>
    </>
  );
}
