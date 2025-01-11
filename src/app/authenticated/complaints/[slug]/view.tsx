"use client"
import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate, getImageUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import * as XLSX from 'xlsx';
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

export default function ViewComplaint({ complaint }: { complaint: any }) {
  const files = complaint.files ? JSON.parse(complaint.files) : [];

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet([{
      'Complaint Number': complaint.complain_num,
      'Status': complaint.status,
      'Type': complaint.complaint_type,
      'Customer Name': complaint.applicant_name,
      'Email': complaint.applicant_email,
      'Phone': complaint.applicant_phone,
      'WhatsApp': complaint.applicant_whatsapp,
      'Address': complaint.applicant_adress,
      'Product': complaint.product,
      'Model': complaint.model,
      'Serial Number (IND)': complaint.serial_number_ind,
      'Serial Number (OUD)': complaint.serial_number_oud,
      'Technician': complaint.technician,
      'Amount': complaint.amount,
      'Created Date': formatDate(complaint.created_at),
      'Description': complaint.description,
      'Provided Services': complaint.provided_services
    }]);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Complaint Details");
    XLSX.writeFile(workbook, `Complaint-${complaint.complain_num}.xlsx`);
  };

  const printJobSheet = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4">
      <Card className="p-6 shadow-lg">
        {/* Header Section with Export Options */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <h2 className="text-3xl font-bold text-primary">
                Complaint #{complaint.complain_num}
              </h2>
              <Badge className="text-lg" variant="secondary">{complaint.status}</Badge>
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
          <div className="mt-4 flex justify-between items-center">
            <Badge variant="outline" className="text-lg">
              {complaint.complaint_type}
            </Badge>
            <p className="text-sm text-muted-foreground">Reference ID: {complaint.id}</p>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Main Content with Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Customer Information */}
          <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-6 text-primary">Customer Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <User className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Name</p>
                  <p className="text-lg">{complaint.applicant_name}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Mail className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-lg break-all">{complaint.applicant_email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Phone className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Contact Details</p>
                  <p className="text-lg">Phone: {complaint.applicant_phone}</p>
                  <p className="text-lg">WhatsApp: {complaint.applicant_whatsapp}</p>
                  {complaint.extra_numbers && (
                    <p className="text-lg">Additional: {complaint.extra_numbers}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <MapPin className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Address</p>
                  <p className="text-lg">{complaint.applicant_adress}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Product Information */}
          <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-6 text-primary">Product Details</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Package className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Product Information</p>
                  <p className="text-lg font-medium">
                    {complaint.product} {complaint.model && `- ${complaint.model}`}
                  </p>
                  {complaint.serial_number_ind && (
                    <p className="text-base mt-1">Serial (IND): {complaint.serial_number_ind}</p>
                  )}
                  {complaint.serial_number_oud && (
                    <p className="text-base mt-1">Serial (OUD): {complaint.serial_number_oud}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Wrench className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Service Details</p>
                  <p className="text-lg">Technician: {complaint.technician || "Not Assigned"}</p>
                  <p className="text-lg">Amount: {complaint.amount || "Not Set"}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Additional Information */}
          <Card className="p-6 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-6 text-primary">Additional Details</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Calendar className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Important Dates</p>
                  <p className="text-base">Created: {formatDate(complaint.created_at)}</p>
                  {complaint.p_date && (
                    <p className="text-base">Purchase: {formatDate(complaint.p_date)}</p>
                  )}
                  {complaint.complete_date && (
                    <p className="text-base">Completed: {formatDate(complaint.complete_date)}</p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <MessageSquare className="h-6 w-6 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">Description</p>
                  <p className="text-lg whitespace-pre-wrap">{complaint.description}</p>
                </div>
              </div>

              {complaint.provided_services && (
                <div className="flex items-start gap-4 hover:bg-muted/50 p-2 rounded-lg transition-colors">
                  <FileCheck className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">Services Provided</p>
                    <p className="text-lg whitespace-pre-wrap">{complaint.provided_services}</p>
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
              <h3 className="text-xl font-semibold mb-6 text-primary">Attached Files</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {files.map((file: any, index: number) => {
                  const isImage = file.document_path.match(/\.(jpg|jpeg|png|gif)$/i);
                  return (
                    <Card 
                      key={index} 
                      className="overflow-hidden hover:shadow-xl transition-all duration-300 group"
                    >
                      {isImage ? (
                        
                        <div className="relative aspect-video group-hover:scale-105 transition-transform duration-300">
                          <Image
                            src={getImageUrl(file.document_path)}
                            alt={file.document_type}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <p className="text-white text-sm font-medium">{file.document_type}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 p-4 group-hover:bg-muted/50 transition-colors">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              {file.document_type}
                            </p>
                            <p className="font-medium truncate max-w-[200px]">{file.file_name}</p>
                          </div>
                        </div>
                      )}
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
