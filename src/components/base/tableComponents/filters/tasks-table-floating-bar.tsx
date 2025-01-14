import * as React from "react";
import {
  ArrowUpIcon,
  CheckCircledIcon,
  Cross2Icon,
  DownloadIcon,
  ReloadIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { SelectTrigger } from "@radix-ui/react-select";
import { type Table } from "@tanstack/react-table";
import { toast } from "sonner";
import html2canvas from 'html2canvas';

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { exportTableToCSV } from "@/lib/export";
import { Kbd } from "@/components/ui/kbd";
import { ClipboardCopyIcon, FileImage } from "lucide-react";
import { ComplaintsType } from "@/types";

interface TasksTableFloatingBarProps {
  table: any;
}

export function TasksTableFloatingBar({ table }: TasksTableFloatingBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows;

  const [isPending, startTransition] = React.useTransition();
  const [method, setMethod] = React.useState<
    "update-status" | "update-priority" | "export" | "delete" | "generate-image"
  >();

  // Clear selection on Escape key press
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        table.toggleAllRowsSelected(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [table]);

  const copyToClipboard = (rows: any) => {
    const formattedText = rows
      .map((row: any) => {
        const data = row.original;
        return `
*Complaint Details*
------------------------
*Complaint Number*: ${data.complain_num}
*Brand Complaint No*: ${data.brand_complaint_no}

*Applicant Information*
          ------------------------
*Name*: ${data.applicant_name}
*Phone*: ${data.applicant_phone}
*Email*: ${data.applicant_email || "N/A"}
*WhatsApp*: ${data.applicant_whatsapp || "N/A"}
*Address*: ${data.applicant_adress}

*Product Information*
          ------------------------
*Product*: ${data.product || "N/A"}
*Brand Name*: ${data.brand_name || "N/A"}
*Branch Name*: ${data.branch_name || "N/A"}
*Model*: ${data.model || "N/A"}
*Serial Number IND*: ${data.serial_number_ind || "N/A"}
*Serial Number OTD*: ${data.serial_number_oud || "N/A"}
*MQ Number*: ${data.mq_nmb || "N/A"}
*Extra*: ${data.extra || "N/A"}

*Service Details*
------------------------
*Assigned Technition*: ${data.technition || "N/A"}
*Status*: ${data.status}
*Complaint Type*: ${data.complaint_type}
*Description:* ${data.description}
*Working Details*: ${data.working_details || "N/A"}

          ------------------------
Created: ${new Date(data.created_at).toLocaleDateString()}
    `;
      })
      .join("\n\n");

    navigator.clipboard.writeText(formattedText);
    toast.success("Formatted data copied to clipboard");
  };

  const generateImage = async (rows: any) => {
    setMethod("generate-image");
    startTransition(async () => {
      try {
        const tempDiv = document.createElement('div');
        tempDiv.style.padding = '40px';
        tempDiv.style.background = 'linear-gradient(to bottom right, #ffffff, #f8f9fa)';
        tempDiv.style.width = '800px';
        tempDiv.style.position = 'fixed';
        tempDiv.style.left = '-9999px';
        tempDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        
        rows.forEach((row: any) => {
          const data = row.original;
          tempDiv.innerHTML += `
            <div style="margin-bottom: 40px; font-family: 'Segoe UI', Arial, sans-serif; color: #2d3748;">
              <div style="background: linear-gradient(to right, #2563eb, #3b82f6); padding: 20px; border-radius: 10px; margin-bottom: 25px;">
                <h2 style="color: white; font-size: 24px; margin: 0;">Complaint Details</h2>
                <p style="color: #e2e8f0; margin: 5px 0 0 0;">Ref: ${data.complain_num}</p>
              </div>
              
              <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px;">
                <h3 style="color: #3b82f6; font-size: 18px; margin-bottom: 15px;">Applicant Information</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                  <p style="margin: 5px 0;"><strong style="color: #4b5563;">Name:</strong> ${data.applicant_name}</p>
                  <p style="margin: 5px 0;"><strong style="color: #4b5563;">Phone:</strong> ${data.applicant_phone}</p>
                  <p style="margin: 5px 0;"><strong style="color: #4b5563;">Email:</strong> ${data.applicant_email || "N/A"}</p>
                  <p style="margin: 5px 0;"><strong style="color: #4b5563;">WhatsApp:</strong> ${data.applicant_whatsapp || "N/A"}</p>
                </div>
                <p style="margin: 10px 0;"><strong style="color: #4b5563;">Address:</strong> ${data.applicant_adress}</p>
              </div>
              
              <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px;">
                <h3 style="color: #3b82f6; font-size: 18px; margin-bottom: 15px;">Product Information</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                  <p style="margin: 5px 0;"><strong style="color: #4b5563;">Product:</strong> ${data.product || "N/A"}</p>
                  <p style="margin: 5px 0;"><strong style="color: #4b5563;">Brand:</strong> ${data.brand_name || "N/A"}</p>
                  <p style="margin: 5px 0;"><strong style="color: #4b5563;">Model:</strong> ${data.model || "N/A"}</p>
                  <p style="margin: 5px 0;"><strong style="color: #4b5563;">Serial (IND):</strong> ${data.serial_number_ind || "N/A"}</p>
                  <p style="margin: 5px 0;"><strong style="color: #4b5563;">Serial (OTD):</strong> ${data.serial_number_oud || "N/A"}</p>
                </div>
              </div>
              
              <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h3 style="color: #3b82f6; font-size: 18px; margin-bottom: 15px;">Service Details</h3>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                  <p style="margin: 5px 0;"><strong style="color: #4b5563;">Technician:</strong> ${data.technition || "N/A"}</p>
                  <p style="margin: 5px 0;"><strong style="color: #4b5563;">Status:</strong> <span style="background: #dbeafe; color: #1e40af; padding: 2px 8px; border-radius: 4px;">${data.status}</span></p>
                </div>
                <p style="margin: 15px 0;"><strong style="color: #4b5563;">Description:</strong> ${data.description}</p>
                <p style="margin: 5px 0;"><strong style="color: #4b5563;">Working Details:</strong> ${data.working_details || "N/A"}</p>
              </div>
              
              <div style="text-align: right; margin-top: 15px; color: #6b7280; font-size: 12px;">
                Generated on: ${new Date(data.created_at).toLocaleDateString()}
              </div>
            </div>
          `;
        });

        document.body.appendChild(tempDiv);

        const canvas = await html2canvas(tempDiv);
        const image = canvas.toDataURL("image/png", 1.0);
        const link = document.createElement('a');
        link.download = `complaint-details-${new Date().getTime()}.png`;
        link.href = image;
        link.click();

        document.body.removeChild(tempDiv);
        toast.success("Job sheet generated successfully");
      } catch (error) {
        toast.error("Failed to generate job sheet");
        console.error(error);
      }
    });
  };

  return (
    <TooltipProvider>
      <div className="fixed inset-x-0 bottom-4 z-50 mx-auto w-fit px-4">
        <div className="w-full overflow-x-auto">
          <div className="mx-auto flex w-fit items-center gap-2 rounded-md border bg-card p-2 shadow-2xl">
            <div className="flex h-7 items-center rounded-md border border-dashed pl-2.5 pr-1">
              <span className="whitespace-nowrap text-xs">
                {rows.length} selected
              </span>
              <Separator orientation="vertical" className="ml-2 mr-1" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-5 hover:border"
                    onClick={() => table.toggleAllRowsSelected(false)}
                  >
                    <Cross2Icon
                      className="size-3.5 shrink-0"
                      aria-hidden="true"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="flex items-center border bg-accent px-2 py-1 font-semibold text-foreground dark:bg-zinc-900">
                  <p className="mr-2">Clear selection</p>
                  <Kbd abbrTitle="Escape" variant="outline">
                    Esc
                  </Kbd>
                </TooltipContent>
              </Tooltip>
            </div>
            <Separator orientation="vertical" className="hidden h-5 sm:block" />
            <div className="flex items-center gap-1.5">
              <Select>
                <Tooltip delayDuration={250}>
                  <SelectTrigger asChild>
                    <TooltipTrigger asChild>
                      <Button
                        variant="secondary"
                        size="icon"
                        className="size-7 border data-[state=open]:bg-accent data-[state=open]:text-accent-foreground"
                        disabled={isPending}
                      >
                        {isPending && method === "update-status" ? (
                          <ReloadIcon
                            className="size-3.5 animate-spin"
                            aria-hidden="true"
                          />
                        ) : (
                          <CheckCircledIcon
                            className="size-3.5"
                            aria-hidden="true"
                          />
                        )}
                      </Button>
                    </TooltipTrigger>
                  </SelectTrigger>
                  <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                    <p>Update status</p>
                  </TooltipContent>
                </Tooltip>
                <SelectContent align="center">
                  <SelectGroup>
                    {["active, inactive, pause, pending"].map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        className="capitalize"
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Tooltip delayDuration={250}>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 border"
                    onClick={() => {
                      setMethod("export");

                      startTransition(() => {
                        exportTableToCSV(table, {
                          excludeColumns: ["select", "actions"],
                          onlySelected: true,
                        });
                      });
                    }}
                    disabled={isPending}
                  >
                    {isPending && method === "export" ? (
                      <ReloadIcon
                        className="size-3.5 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <DownloadIcon className="size-3.5" aria-hidden="true" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                  <p>Export tasks</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={250}>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 border"
                    disabled={isPending}
                  >
                    {isPending && method === "delete" ? (
                      <ReloadIcon
                        className="size-3.5 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <TrashIcon className="size-3.5" aria-hidden="true" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                  <p>Delete tasks</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={250}>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 border"
                    onClick={() => copyToClipboard(rows)}
                    disabled={isPending}
                  >
                    <ClipboardCopyIcon
                      className="size-3.5"
                      aria-hidden="true"
                    />
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                  <p>Copy to clipboard</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip delayDuration={250}>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="size-7 border"
                    disabled={isPending}
                    onClick={() => generateImage(rows)}
                  >
                    {isPending && method === "generate-image" ? (
                      <ReloadIcon
                        className="size-3.5 animate-spin"
                        aria-hidden="true"
                      />
                    ) : (
                      <FileImage className="size-3.5" aria-hidden="true" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="border bg-accent font-semibold text-foreground dark:bg-zinc-900">
                  <p>Generate Job Sheet</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
