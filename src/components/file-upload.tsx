"use client";

import * as React from "react";
import Image from "next/image";
import { Upload, X } from "lucide-react";

interface FileUploadProps {
  onFileSelect?: (file: File | null) => void;
  accept?: string;
  maxSize?: number;
}

export function FileUpload({
  onFileSelect,
  accept = "image/svg+xml,image/png,image/jpeg,image/gif",
  maxSize = 5 * 1024 * 1024, // 5MB default
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [preview, setPreview] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFile = React.useCallback(
    (file: File) => {
      if (file.size > maxSize) {
        alert(`File size should not exceed ${maxSize / (1024 * 1024)}MB`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      if (onFileSelect) {
        onFileSelect(file);
      }
    },
    [maxSize, onFileSelect],
  );

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file && accept.split(",").includes(file.type)) {
        handleFile(file);
      } else {
        alert("Please upload a valid file type");
      }
    },
    [accept, handleFile],
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    if (onFileSelect) {
      onFileSelect(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative flex h-[200px] w-full cursor-pointer flex-col items-center justify-center rounded-xl bg-gray-50 text-slate-300 transition-colors duration-200 dark:bg-slate-800 ${isDragging ? "border-2 border-slate-600 bg-slate-700" : ""} `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative h-full w-full">
          <Image
            src={preview}
            alt="Uploaded file preview"
            fill
            className="rounded-xl object-contain"
          />
          <button
            onClick={handleRemove}
            className="absolute right-2 top-2 rounded-full bg-slate-800 p-1 text-slate-300 hover:bg-slate-700"
            aria-label="Remove uploaded file"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <>
          <Upload className="mb-3 h-8 w-8 text-slate-400" />
          <p className="mb-1 text-sm">Click to upload or drag and drop</p>
          <p className="text-xs text-slate-500">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </>
      )}
    </div>
  );
}
