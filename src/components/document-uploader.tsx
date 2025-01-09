"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { useSession } from "next-auth/react";
import { warrantyTypeOptions } from "@/lib/otpions";
import axios from "axios";
import { API_URL } from "@/lib/apiEndPoints";
import { toast } from "sonner";
import SubmitButton from "./ui/submit-button";

interface DocumentUploaderProps {
  onDone: (files: any) => void;
  errorMessage: string;
}

export default function DocumentUploader({
  onDone,
  errorMessage,
}: DocumentUploaderProps) {
  const session = useSession();
  const token = session.data?.user?.token || "";
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    files: [] as File[],
    document_type: "",
  });

  const handleFileUpload = async () => {
    setIsUploading(true);
    setError(null);

    try {
      if (!token) {
        throw new Error("Authentication token is missing");
      }

      const uploadData = new FormData();
      formData.files.forEach((file) => {
        uploadData.append("files[]", file);
      });
      uploadData.append("document_type", formData.document_type);

      const response = await axios.post(API_URL + "/upload-image", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.data && response.data.data[0]) {
        onDone(response.data.data);
        toast.success("File uploaded successfully");
        // Reset form after successful upload
        setFormData({
          files: [],
          document_type: "",
        });
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred during upload";
      setError(errorMessage);
      toast.error(errorMessage);
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Validate file size
      const maxSize = 100 * 1024 * 1024; // 100MB
      const invalidFiles = Array.from(files).filter(
        (file) => file.size > maxSize,
      );

      if (invalidFiles.length > 0) {
        setError("Some files exceed the maximum size limit of 10MB");
        toast.error("Some files exceed the maximum size limit of 10MB");
        event.target.value = "";
        return;
      }

      setFormData((prev) => ({
        ...prev,
        files: Array.from(files),
      }));
      setError(null);
    }
  };

  const handleCancelUpload = () => {
    setFormData({
      files: [],
      document_type: "",
    });
    setError(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Select
          value={formData.document_type}
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              document_type: value,
            }))
          }
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Document type" />
          </SelectTrigger>
          <SelectContent>
            {warrantyTypeOptions.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
            <SelectItem value="other">Other Document</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="file"
          onChange={handleFileSelect}
          multiple
          accept="image/*,application/pdf,.doc,.docx,.xls,.xlsx"
        />

        <SubmitButton
          processing={isUploading}
          disabled={isUploading || !formData.document_type}
          label="Upload"
          onClick={handleFileUpload}
        />

        {formData.files.length > 0 && (
          <Button
            variant="outline"
            onClick={handleCancelUpload}
            disabled={isUploading}
          >
            Cancel
          </Button>
        )}
      </div>

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
    </div>
  );
}
