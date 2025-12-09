"use client";

import * as React from "react";
import { Modal } from "./modal";
import { Button } from "./button";
import { AlertTriangle } from "lucide-react";

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger";
  loading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  loading = false,
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      closeOnOverlayClick={!loading}
    >
      <div className="space-y-4">
        {variant === "danger" && (
          <div className="flex items-center gap-3 p-3 bg-error/10 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-error flex-shrink-0" />
            <p className="text-sm text-error font-medium">{message}</p>
          </div>
        )}
        {variant === "default" && (
          <p className="text-base text-body-text">{message}</p>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            variant={variant === "danger" ? "destructive" : "primary"}
            onClick={handleConfirm}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

