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
import { API_URL, BRANDS } from "@/lib/apiEndPoints";
import {
  Credenza,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza";
import { LabelInputContainer } from "@/components/ui/LabelInputContainer";
import SubmitBtn from "@/components/ui/submit-button";
import useForm from "@/hooks/use-fom";
import { BrandsType } from "@/types";
import { toast } from "sonner";
import revalidate from "@/action/revalidate";
import { useSession } from "next-auth/react";
import { FileUpload } from "@/components/file-upload";

export default function BrandsUpdate({
  rowCurrent,
}: {
  rowCurrent: BrandsType;
}) {
  const session = useSession();
  const token = session.data?.token || "";
  const [updateOpen, setUpdateOpen] = useState(false);
  const { data, setData, put, processing, errors } = useForm({
    name: rowCurrent.name,
    image: null as File | null,
    status: rowCurrent.status,
  });

  const endPoint = `${API_URL + BRANDS}/${rowCurrent.id}`;

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
  const handleFileSelect = (files: File[]) => {
    if (files.length > 0) {
      setData({ ...data, image: files[0] });
    }
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
              <Label>Brand Logo</Label>
              <FileUpload onFileSelect={handleFileSelect} />
              <LabelInputContainer
                label="Brand Name"
                type="text"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                required
                id="large-url"
                placeholder="Brand Name"
                errorMessage={errors.name}
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
              label={`Update Brand ${rowCurrent.name}`}
              className="w-full"
            />
          </form>
        </CredenzaContent>
      </Credenza>
    </>
  );
}
