import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoadingButton from "../forms/loading-button";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  submitText?: string;
  cancelText?: string;
  showFooter?: boolean;
  submitVariant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: string;
  className?: string;
  isLoading: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  title,
  description,
  isOpen,
  onClose,
  onSubmit,
  submitText = "Submit",
  cancelText = "Cancel",
  showFooter = true,
  submitVariant = "default",
  size,
  className = "",
  isLoading = false,
}) => {
  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${size} ${className}`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <div className="py-4">{children}</div>

        {showFooter && (
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              {cancelText}
            </Button>
            {onSubmit && (
              <LoadingButton
                isLoading={isLoading}
                onClick={handleSubmit}
                loadingText="Saving..."
              >
                {submitText}
              </LoadingButton>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
