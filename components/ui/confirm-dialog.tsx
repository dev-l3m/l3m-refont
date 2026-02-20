"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: "default" | "destructive";
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirmer",
  cancelText = "Annuler",
  onConfirm,
  variant = "default",
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const isDestructive = variant === "destructive";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="space-y-4">
          <div className="flex items-start gap-4">
            {isDestructive && (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            )}
            <div className="flex-1 space-y-2">
              <DialogTitle className={cn(
                "text-xl font-semibold leading-6",
                isDestructive && "text-red-900"
              )}>
                {title}
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-gray-600">
                {description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <DialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            className={cn(
              "w-full sm:w-auto",
              isDestructive
                ? "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600 active:bg-red-800"
                : ""
            )}
            variant={isDestructive ? undefined : "default"}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
