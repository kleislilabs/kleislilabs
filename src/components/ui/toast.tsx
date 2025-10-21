"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

interface ToastProps {
  message: string;
  description?: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export function Toast({ message, description, type = "success", onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-600" />,
    error: <AlertCircle className="w-5 h-5 text-red-600" />,
    info: <Info className="w-5 h-5 text-blue-600" />,
  };

  const backgrounds = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    info: "bg-blue-50 border-blue-200",
  };

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50",
        "min-w-[350px] max-w-[500px]",
        "animate-in slide-in-from-top-2 fade-in duration-300"
      )}
    >
      <div
        className={cn(
          "rounded-lg border p-4 shadow-lg",
          "bg-background",
          backgrounds[type]
        )}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">{icons[type]}</div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{message}</p>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-md p-1 hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Toast Context and Provider
interface ToastContextType {
  showToast: (message: string, description?: string, type?: "success" | "error" | "info") => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = React.useState<{
    message: string;
    description?: string;
    type?: "success" | "error" | "info";
  } | null>(null);

  const showToast = React.useCallback(
    (message: string, description?: string, type: "success" | "error" | "info" = "success") => {
      setToast({ message, description, type });
    },
    []
  );

  const closeToast = React.useCallback(() => {
    setToast(null);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast
          message={toast.message}
          description={toast.description}
          type={toast.type}
          onClose={closeToast}
        />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}