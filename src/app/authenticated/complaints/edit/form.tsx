"use client";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React, { useState } from "react";
import BasicForm from "../components/basic-form";
import { ComplaintsType, dataTypeIds } from "@/types";
import useForm from "@/hooks/use-fom";
import ComplaintDetailsForm from "../components/complaint-details-form";
import { Button, buttonVariants } from "@/components/ui/button";
import SubmitBtn from "@/components/ui/submit-button";
import FilesForm from "../components/files-form";
import { SelectInput } from "@/components/SelectInput";
import { ComplaintStatusOptions } from "@/lib/otpions";
import { Undo2, Redo2, Info } from "lucide-react";
import { COMPLAINTS } from "@/lib/apiEndPoints";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Form({
  complaint,
  technician,
}: {
  complaint?: ComplaintsType;
  technician?: dataTypeIds[];
}) {
  const [tab, setTab] = useState("advanced");
  const session = useSession();
  const token = session.data?.user?.token || "";
  const [history, setHistory] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const { data, setData, processing, put, errors } = useForm({
    brand_complaint_no: complaint?.brand_complaint_no || "",
    applicant_name: complaint?.applicant_name || "",
    applicant_email: complaint?.applicant_email || "",
    applicant_phone: complaint?.applicant_phone || "",
    applicant_whatsapp: complaint?.applicant_whatsapp || "",
    applicant_adress: complaint?.applicant_adress || "",
    extra_numbers: complaint?.extra_numbers || "",
    reference_by: complaint?.reference_by || "",
    extra: complaint?.extra || "",
    description: complaint?.description || "",
    branch_id: complaint?.branch_id || "",
    brand_id: complaint?.brand_id || "",
    product: complaint?.product || "",
    model: complaint?.model || "",
    working_details: complaint?.working_details || "",
    serial_number_ind: complaint?.serial_number_ind || "",
    serial_number_oud: complaint?.serial_number_oud || "",
    mq_nmb: complaint?.mq_nmb || "",
    p_date: complaint?.p_date || "",
    complete_date: complaint?.complete_date || "",
    amount: complaint?.amount || "",
    product_type: complaint?.product_type || "",
    technician: complaint?.technician || "",
    status: complaint?.status || "",
    complaint_type: complaint?.complaint_type || "",
    provided_services: complaint?.provided_services || "",
    warranty_type: complaint?.warranty_type || "",
    happy_call_remarks: complaint?.happy_call_remarks || "",
    files: complaint?.files || [],
  });
  const router = useRouter();
  const onSubmit = () => {
    put(
      `${COMPLAINTS}/${complaint?.id}`,
      {
        onSuccess: (response) => {
          toast.success(response.message);
          router.refresh();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
      token,
    );
  };
  // Function to update data with history tracking
  const updateData = (newData: any) => {
    // Add current state to history
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(data);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setData(newData);
  };

  // Undo function
  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setData(history[currentIndex - 1]);
    }
  };

  // Redo function
  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setData(history[currentIndex + 1]);
    }
  };

  return (
    <div className="rounded-lg bg-white p-2 shadow-md dark:bg-slate-950 md:p-4">
      <Tabs defaultValue="basic" value={tab} onValueChange={setTab}>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <TabsList className="">
            {["basic", "advanced", "files", "remarks", "history"].map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="flex gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={currentIndex <= 0}
              >
                <Undo2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={currentIndex >= history.length - 1}
              >
                <Redo2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-grow md:flex-grow-0">
              <SelectInput
                options={ComplaintStatusOptions}
                selected={data.status}
                onChange={(e) => updateData({ ...data, status: e })}
              />
            </div>
            <SubmitBtn
              className={`${buttonVariants({ effect: "shineHover" })} w-full md:w-auto`}
              processing={processing}
              size={"sm"}
              label={complaint ? "Save Changes" : "Create Complaint"}
              onClick={onSubmit}
            />
          </div>
        </div>
        <Separator className="my-2" />
        <TabsContent value="basic">
          <BasicForm data={data} setData={updateData} errors={errors} />
        </TabsContent>
        <TabsContent value="advanced">
          <ComplaintDetailsForm
            data={data}
            setData={updateData}
            errors={errors}
            technician={technician}
          />
        </TabsContent>
        <TabsContent value="files">
          <FilesForm data={data} setData={updateData} errors={errors} />
        </TabsContent>
      </Tabs>

      {/* Impressive Footer */}
      <div className="mt-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:from-slate-800 dark:to-slate-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Changes saved: {history.length}
            </div>
            <div className="h-4 w-px bg-gray-300 dark:bg-gray-700" />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Form completion: {Object.values(data).filter(Boolean).length}/
              {Object.keys(data).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
