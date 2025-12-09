"use client";

import * as React from "react";
import { Upload, X, File } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export interface FileUploadProps {
  label?: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  value?: File[];
  onChange?: (files: File[]) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function FileUpload({
  label,
  accept,
  multiple = false,
  maxSize = 10,
  value = [],
  onChange,
  error,
  disabled,
  className,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<File[]>(value);
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setFiles(value);
  }, [value]);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }
    return null;
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;

    const fileArray = Array.from(newFiles);
    const validFiles: File[] = [];
    const errors: string[] = [];

    fileArray.forEach((file) => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      // Could show toast here
      console.error(errors);
    }

    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-main-text mb-2">
          {label}
        </label>
      )}
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          isDragging
            ? "border-dark-teal bg-soft-teal-bg"
            : "border-stroke hover:border-dark-teal",
          error && "border-error",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInputChange}
          disabled={disabled}
          className="hidden"
        />
        <Upload className="h-8 w-8 text-body-text mx-auto mb-2" />
        <p className="text-sm text-body-text mb-1">
          Drag and drop files here, or{" "}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled}
            className="text-dark-teal hover:text-primary-accent font-medium"
          >
            browse
          </button>
        </p>
        <p className="text-xs text-body-text">
          Maximum file size: {maxSize}MB
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-soft-bg rounded-lg"
            >
              <File className="h-5 w-5 text-body-text" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-main-text truncate">
                  {file.name}
                </p>
                <p className="text-xs text-body-text">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFile(index)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-error">{error}</p>
      )}
    </div>
  );
}

