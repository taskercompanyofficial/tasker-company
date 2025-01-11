"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate, getImageUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  User,
  FileText,
  Package,
  Wrench,
  FileCheck,
  Download,
  Printer,
} from "lucide-react";
import Link from "next/link";

export default function ViewComplaint({ complaint }: { complaint: any }) {
  const files = complaint.files ? JSON.parse(complaint.files) : [];

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([
      {
        "Complaint Number": complaint.complain_num,
        Status: complaint.status,
        Type: complaint.complaint_type,
        "Customer Name": complaint.applicant_name,
        Email: complaint.applicant_email,
        Phone: complaint.applicant_phone,
        WhatsApp: complaint.applicant_whatsapp,
        Address: complaint.applicant_adress,
        Product: complaint.product,
        Model: complaint.model,
        "Serial Number (IND)": complaint.serial_number_ind,
        "Serial Number (OUD)": complaint.serial_number_oud,
        Technician: complaint.technician,
        Amount: complaint.amount,
        "Created Date": formatDate(complaint.created_at),
        Description: complaint.description,
        "Provided Services": complaint.provided_services,
      },
    ]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Complaint Details");
    XLSX.writeFile(workbook, `Complaint-${complaint.complain_num}.xlsx`);
  };

  const printJobSheet = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4">
      <Card className="p-6 shadow-lg">
        {/* Header Section with Export Options */}
        <div className="mb-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <h2 className="text-3xl font-bold text-primary">
                Complaint #{complaint.complain_num}
              </h2>
              <Badge className="text-lg" variant="secondary">
                {complaint.status}
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={exportToExcel}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Excel
              </Button>
              <Button
                variant="outline"
                onClick={printJobSheet}
                className="flex items-center gap-2"
              >
                <Printer className="h-4 w-4" />
                Print Job Sheet
              </Button>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <Badge variant="outline" className="text-lg">
              {complaint.complaint_type}
            </Badge>
            <p className="text-sm text-muted-foreground">
              Reference ID: {complaint.id}
            </p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Main Content with Responsive Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {/* Customer Information */}
          <Card className="p-6 transition-shadow duration-300 hover:shadow-xl">
            <h3 className="mb-6 text-xl font-semibold text-primary">
              Customer Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50">
                <User className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Name
                  </p>
                  <p className="text-lg">{complaint.applicant_name}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50">
                <Mail className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="break-all text-lg">
                    {complaint.applicant_email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50">
                <Phone className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Contact Details
                  </p>
                  <p className="text-lg">Phone: {complaint.applicant_phone}</p>
                  <p className="text-lg">
                    WhatsApp: {complaint.applicant_whatsapp}
                  </p>
                  {complaint.extra_numbers && (
                    <p className="text-lg">
                      Additional: {complaint.extra_numbers}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50">
                <MapPin className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Address
                  </p>
                  <p className="text-lg">{complaint.applicant_adress}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Product Information */}
          <Card className="p-6 transition-shadow duration-300 hover:shadow-xl">
            <h3 className="mb-6 text-xl font-semibold text-primary">
              Product Details
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50">
                <Package className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Product Information
                  </p>
                  <p className="text-lg font-medium">
                    {complaint.product}{" "}
                    {complaint.model && `- ${complaint.model}`}
                  </p>
                  {complaint.serial_number_ind && (
                    <p className="mt-1 text-base">
                      Serial (IND): {complaint.serial_number_ind}
                    </p>
                  )}
                  {complaint.serial_number_oud && (
                    <p className="mt-1 text-base">
                      Serial (OUD): {complaint.serial_number_oud}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50">
                <Wrench className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Service Details
                  </p>
                  <p className="text-lg">
                    Technician: {complaint.technician || "Not Assigned"}
                  </p>
                  <p className="text-lg">
                    Amount: {complaint.amount || "Not Set"}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Information */}
          <Card className="p-6 transition-shadow duration-300 hover:shadow-xl">
            <h3 className="mb-6 text-xl font-semibold text-primary">
              Additional Details
            </h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50">
                <Calendar className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Important Dates
                  </p>
                  <p className="text-base">
                    Created: {formatDate(complaint.created_at)}
                  </p>
                  {complaint.p_date && (
                    <p className="text-base">
                      Purchase: {formatDate(complaint.p_date)}
                    </p>
                  )}
                  {complaint.complete_date && (
                    <p className="text-base">
                      Completed: {formatDate(complaint.complete_date)}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50">
                <MessageSquare className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Description
                  </p>
                  <p className="whitespace-pre-wrap text-lg">
                    {complaint.description}
                  </p>
                </div>
              </div>

              {complaint.provided_services && (
                <div className="flex items-start gap-4 rounded-lg p-2 transition-colors hover:bg-muted/50">
                  <FileCheck className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Services Provided
                    </p>
                    <p className="whitespace-pre-wrap text-lg">
                      {complaint.provided_services}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Files Section with Improved Gallery */}
        {files.length > 0 && (
          <>
            <Separator className="my-8" />
            <div>
              <h3 className="mb-6 text-xl font-semibold text-primary">
                Attached Files
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {files.map((file: any, index: number) => {
                  const isImage = file.document_path.match(
                    /\.(jpg|jpeg|png|gif)$/i,
                  );
                  return (
                    <Card
                      key={index}
                      className="group overflow-hidden transition-all duration-300 hover:shadow-xl"
                    >
                      <Link
                        href={getImageUrl(file.document_path)}
                        target="_blank"
                      >
                        {isImage ? (
                          <div className="relative aspect-video transition-transform duration-300 group-hover:scale-105">
                            <Image
                              src={getImageUrl(file.document_path)}
                              alt={file.document_type}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <p className="text-sm font-medium text-white">
                                {file.document_type}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4 p-4 transition-colors group-hover:bg-muted/50">
                            <FileText className="h-8 w-8 text-primary" />
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">
                                {file.document_type}
                              </p>
                              <p className="max-w-[200px] truncate font-medium">
                                {file.file_name}
                              </p>
                            </div>
                          </div>
                        )}
                      </Link>
                    </Card>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
