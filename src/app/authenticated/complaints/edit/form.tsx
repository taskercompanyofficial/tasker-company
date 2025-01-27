"use client";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import React, { useEffect, useState, useCallback } from "react";
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
import Remarks from "../components/remarks";
import History from "../components/history";
import Store from "../components/strore";
import { Checkbox } from "@/components/ui/checkbox";
import SendMessageCustomerBtn from "../components/send-message-cutomer-btn";

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
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(Date.now());
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("autoSaveEnabled") !== "false";
    }
    return true;
  });

  const { data, setData, processing, put, errors } = useForm({
    complain_num: complaint?.complain_num,
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
    comments_for_technician: complaint?.technician || "",
    files: complaint?.files || [],
    send_message_to_technician: false,
    message_type: "update_complaint",
  });

  const router = useRouter();

  const onSubmit = useCallback(() => {
    if (!hasUnsavedChanges) return;

    put(
      `${COMPLAINTS}/${complaint?.id}`,
      {
        onSuccess: (response) => {
          toast.success(response.message);
          setHasUnsavedChanges(false);
          setLastSaveTime(Date.now());
          router.refresh();
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
      token,
    );
  }, [hasUnsavedChanges, put, complaint?.id, token, router]);

  // Toggle autosave
  const toggleAutoSave = useCallback(() => {
    setAutoSaveEnabled((prev) => {
      const newValue = !prev;
      localStorage.setItem("autoSaveEnabled", String(newValue));
      return newValue;
    });
  }, []);

  // Auto-save every 10 seconds if enabled and there are changes
  useEffect(() => {
    if (!autoSaveEnabled) return;

    const autoSaveInterval = setInterval(() => {
      if (hasUnsavedChanges && Date.now() - lastSaveTime >= 10000) {
        onSubmit();
      }
    }, 1000);

    return () => clearInterval(autoSaveInterval);
  }, [hasUnsavedChanges, lastSaveTime, onSubmit, autoSaveEnabled]);

  useEffect(() => {
    setData({
      ...data,
      send_message_to_technician:
        complaint?.technician === data.technician ? true : false,
    });
  }, [data.technician]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Function to update data with history tracking
  const updateData = (newData: any) => {
    // Add current state to history
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(data);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
    setData(newData);
    setHasUnsavedChanges(true);
  };

  // Undo function
  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setData(history[currentIndex - 1]);
      setHasUnsavedChanges(true);
    }
  };

  // Redo function
  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setData(history[currentIndex + 1]);
      setHasUnsavedChanges(true);
    }
  };

  return (
    <div className="rounded-lg bg-white p-2 shadow-md dark:bg-slate-950 md:p-4">
      <Tabs defaultValue="basic" value={tab} onValueChange={setTab}>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="overflow-x-auto">
            <TabsList className="min-w-max">
              {[
                "basic",
                "advanced",
                "attachments",
                "store",
                "remarks",
                "history",
              ].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="min-w-[100px] flex-1"
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="flex flex-wrap gap-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm text-muted-foreground">
                  {complaint?.complain_num}
                </p>
              </div>
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
            </div>
            <div className="w-full md:w-auto">
              <SelectInput
                options={ComplaintStatusOptions}
                selected={data.status}
                onChange={(e) => updateData({ ...data, status: e })}
              />
            </div>
            <div className="flex items-center gap-2">
              <SendMessageCustomerBtn complaint={data} to={data.applicant_whatsapp} />
              <div className="flex items-center gap-1">
                <Checkbox
                  id="auto-save"
                  checked={autoSaveEnabled}
                  onCheckedChange={toggleAutoSave}
                />
                <label
                  htmlFor="auto-save"
                  className="text-sm text-muted-foreground"
                >
                  Auto Save
                </label>
              </div>
              <SubmitBtn
                className={`${buttonVariants({ effect: "shineHover" })} w-full md:w-auto ${hasUnsavedChanges ? "animate-pulse" : ""}`}
                processing={processing}
                size={"sm"}
                label={
                  hasUnsavedChanges
                    ? "Save Changes*"
                    : complaint
                      ? "Save Changes"
                      : "Create Complaint"
                }
                onClick={onSubmit}
              />
            </div>
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
        <TabsContent value="attachments">
          <FilesForm data={data} setData={updateData} errors={errors} />
        </TabsContent>
        <TabsContent value="store">
          <Store />
        </TabsContent>
        <TabsContent value="remarks">
          <Remarks />
        </TabsContent>
        <TabsContent value="history">
          <History />
        </TabsContent>
      </Tabs>

      {/* Impressive Footer */}
      <div className="mt-6 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-4 dark:from-slate-800 dark:to-slate-900">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-2">
            <Info className="h-5 w-5 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Last updated: {new Date(lastSaveTime).toLocaleString()}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Changes saved: {history.length}
            </div>
            <div className="hidden h-4 w-px bg-gray-300 dark:bg-gray-700 sm:block" />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Form completion: {Object.values(data).filter(Boolean).length}/
              {Object.keys(data).length}
            </div>
            {hasUnsavedChanges && autoSaveEnabled && (
              <div className="text-sm text-red-500">
                * Unsaved changes (Auto-saving in{" "}
                {Math.max(
                  0,
                  Math.ceil((10000 - (Date.now() - lastSaveTime)) / 1000),
                )}
                s)
              </div>
            )}
            {hasUnsavedChanges && !autoSaveEnabled && (
              <div className="text-sm text-red-500">
                * Unsaved changes (Auto-save disabled)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
