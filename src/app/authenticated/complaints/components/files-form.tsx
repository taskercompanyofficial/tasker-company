import { Button } from "@/components/ui/button";
import { Trash2, Eye, Download, Loader2 } from "lucide-react";
import React, { useState } from "react";
import DocumentUploader from "@/components/document-uploader";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";
import { toast } from "sonner";

export default function FilesForm({
  data,
  setData,
  errors,
}: {
  data: any;
  setData: (data: any) => void;
  errors: any;
}) {
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const handleDocumentUpload = (files: any) => {
    if (files && files.length > 0) {
      // Parse files if they are JSON strings
      const existingFiles = Array.isArray(data.files)
        ? data.files
        : typeof data.files === "string"
          ? JSON.parse(data.files)
          : [];

      const updatedFiles = [...existingFiles, ...files];
      setData({ ...data, files: updatedFiles });
    }
  };

  const handleRemoveFile = (index: number) => {
    let currentFiles = data.files;
    if (typeof currentFiles === "string") {
      currentFiles = JSON.parse(currentFiles);
    }

    if (!Array.isArray(currentFiles)) return;

    const updatedFiles = currentFiles.filter(
      (_: any, i: number) => i !== index,
    );
    setData({ ...data, files: updatedFiles });
  };

  // Parse files if they are a JSON string
  const files =
    typeof data.files === "string" ? JSON.parse(data.files) : data.files || [];
  const [downloading, setDownloading] = useState(false);
  const handleDownloadFile = async (file: any) => {
    try {
      setDownloading(true);
      const response = await fetch(getImageUrl(file.document_path));
      if (!response.ok) {
        if (response.status === 403) {
          // Handle forbidden error
          console.error(
            "Access forbidden - you may not have permission to download this file",
          );
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.file_name || "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      toast.error(error?.message || "Failed to download file");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <DocumentUploader
        onDone={handleDocumentUpload}
        errorMessage={errors.files}
      />
      {Array.isArray(files) && files.length > 0 && (
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-xs">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-1.5 text-left font-medium">ID</th>
                  <th className="p-1.5 text-left font-medium">Document Type</th>
                  <th className="p-1.5 text-left font-medium">File Name</th>
                  <th className="p-1.5 text-left font-medium">Preview</th>
                  <th className="p-1.5 text-left font-medium">Size</th>
                  <th className="p-1.5 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {files.map((file: any, index: number) => (
                  <tr key={index} className="border-b last:border-0">
                    <td className="p-1.5">{index + 1}</td>
                    <td className="p-1.5">{file?.document_type || "N/A"}</td>
                    <td className="p-1.5 text-gray-600">
                      {file?.file_name || "N/A"}
                    </td>
                    <td className="p-1.5 text-gray-600">
                      {file?.document_path && (
                        <Link
                          href={getImageUrl(file.document_path)}
                          target="_blank"
                          className="flex w-fit items-center gap-1 rounded-lg bg-muted p-1"
                        >
                          Preview <Eye className="h-4 w-4" />
                        </Link>
                      )}
                    </td>
                    <td className="p-1.5 text-gray-600">
                      {file?.document_path && (
                        <button
                          onClick={() => handleDownloadFile(file)}
                          className="flex w-fit items-center gap-1 rounded-lg bg-muted p-1"
                          disabled={downloading}
                        >
                          {downloading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              Download <Download className="h-4 w-4" />
                            </>
                          )}
                        </button>
                      )}
                    </td>
                    <td className="p-1.5">
                      {file?.file_size
                        ? `${(file.file_size / 1024).toFixed(1)} KB`
                        : "N/A"}
                    </td>
                    <td className="space-x-1 p-1.5 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {Array.isArray(files) && files.length > 0 && (
          <Button
            variant="destructive"
            size="sm"
            className="text-xs"
            onClick={() => {
              setData({ ...data, files: [] });
            }}
          >
            Clear All Files
          </Button>
        )}
      </div>
    </div>
  );
}
