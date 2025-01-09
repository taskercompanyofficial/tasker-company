import { Button } from "@/components/ui/button";
import { Trash2, Eye } from "lucide-react";
import React, { useState } from "react";
import DocumentUploader from "@/components/document-uploader";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils";

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
      const updatedFiles = [...(data.files || []), ...files];
      setData({ ...data, files: updatedFiles });
    }
  };

  const handleRemoveFile = (index: number) => {
    if (!data.files || !Array.isArray(data.files)) return;
    
    const updatedFiles = data.files.filter((_: any, i: number) => i !== index);
    setData({ ...data, files: updatedFiles });
  };

  // Ensure files is always an array
  const files = data.files || [];

  return (
    <div className="space-y-4">
      <DocumentUploader
        onDone={handleDocumentUpload}
        errorMessage={errors.files}
      />
      {Array.isArray(files) && files.length > 0 && (
        <div className="rounded-md border">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="p-1.5 text-left font-medium">ID</th>
                <th className="p-1.5 text-left font-medium">Document Type</th>
                <th className="p-1.5 text-left font-medium">File Name</th>
                <th className="p-1.5 text-left font-medium">Size</th>
                <th className="p-1.5 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {files.map((file: any, index: number) => (
                <tr key={index} className="border-b last:border-0">
                  <td className="p-1.5">{index + 1}</td>
                  <td className="p-1.5">{file?.document_type || "N/A"}</td>
                  <td className="p-1.5 text-gray-600">{file?.file_name || "N/A"}</td>
                  <td className="p-1.5 text-gray-600">
                    {file?.document_path && (
                      <Link
                        href={getImageUrl(file.document_path)}
                        target="_blank"
                        className="flex items-center gap-1"
                      >
                        Preview <Eye className="h-4 w-4" />
                      </Link>
                    )}
                  </td>
                  <td className="p-1.5">
                    {file?.file_size ? `${(file.file_size / 1024).toFixed(1)} KB` : "N/A"}
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
