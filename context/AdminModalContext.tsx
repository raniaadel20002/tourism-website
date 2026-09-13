"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

export type ModalVariant = "danger" | "warning" | "info" | "success" | "error";

export interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ModalVariant;
}

export interface AlertOptions {
  title?: string;
  message: string;
  buttonText?: string;
  variant?: ModalVariant;
}

interface ModalState {
  isOpen: boolean;
  type: "confirm" | "alert";
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  variant: ModalVariant;
}

interface AdminModalContextType {
  confirm: (optionsOrMessage: string | ConfirmOptions) => Promise<boolean>;
  alert: (optionsOrMessage: string | AlertOptions) => Promise<void>;
}

const AdminModalContext = createContext<AdminModalContextType | undefined>(
  undefined
);

export function AdminModalProvider({ children }: { children: ReactNode }) {
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    type: "confirm",
    title: "",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    variant: "info",
  });

  const resolverRef = useRef<((value: any) => void) | null>(null);

  const confirm = useCallback(
    (optionsOrMessage: string | ConfirmOptions): Promise<boolean> => {
      return new Promise<boolean>((resolve) => {
        resolverRef.current = resolve;

        if (typeof optionsOrMessage === "string") {
          const isDelete =
            optionsOrMessage.toLowerCase().includes("delete") ||
            optionsOrMessage.toLowerCase().includes("remove");
          setModalState({
            isOpen: true,
            type: "confirm",
            title: isDelete ? "Confirm Deletion" : "Confirm Action",
            message: optionsOrMessage,
            confirmText: isDelete ? "Delete" : "Confirm",
            cancelText: "Cancel",
            variant: isDelete ? "danger" : "info",
          });
        } else {
          setModalState({
            isOpen: true,
            type: "confirm",
            title: optionsOrMessage.title || "Confirm Action",
            message: optionsOrMessage.message,
            confirmText: optionsOrMessage.confirmText || "Confirm",
            cancelText: optionsOrMessage.cancelText || "Cancel",
            variant: optionsOrMessage.variant || "info",
          });
        }
      });
    },
    []
  );

  const alert = useCallback(
    (optionsOrMessage: string | AlertOptions): Promise<void> => {
      return new Promise<void>((resolve) => {
        resolverRef.current = resolve;

        if (typeof optionsOrMessage === "string") {
          const isError =
            optionsOrMessage.toLowerCase().includes("failed") ||
            optionsOrMessage.toLowerCase().includes("error");
          setModalState({
            isOpen: true,
            type: "alert",
            title: isError ? "Action Failed" : "Notice",
            message: optionsOrMessage,
            confirmText: "OK",
            cancelText: "",
            variant: isError ? "error" : "info",
          });
        } else {
          setModalState({
            isOpen: true,
            type: "alert",
            title: optionsOrMessage.title || "Notice",
            message: optionsOrMessage.message,
            confirmText: optionsOrMessage.buttonText || "OK",
            cancelText: "",
            variant: optionsOrMessage.variant || "info",
          });
        }
      });
    },
    []
  );

  const handleConfirm = () => {
    const resolver = resolverRef.current;
    resolverRef.current = null;
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (resolver) {
      resolver(true);
    }
  };

  const handleCancel = () => {
    const resolver = resolverRef.current;
    resolverRef.current = null;
    setModalState((prev) => ({ ...prev, isOpen: false }));
    if (resolver) {
      resolver(false);
    }
  };

  // Keyboard navigation: Escape cancels/dismisses, Enter confirms
  useEffect(() => {
    if (!modalState.isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCancel();
      } else if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleConfirm();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalState.isOpen]);

  return (
    <AdminModalContext.Provider value={{ confirm, alert }}>
      {children}
      {modalState.isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 backdrop-blur-[2px] p-4 transition-all duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleCancel();
            }
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 w-full max-w-md transform transition-all scale-100">
            <div className="flex items-start gap-4">
              {/* Icon badge */}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  modalState.variant === "danger" || modalState.variant === "error"
                    ? "bg-red-50 text-red-600"
                    : modalState.variant === "warning"
                    ? "bg-amber-50 text-amber-600"
                    : modalState.variant === "success"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-[#006993]/10 text-[#006993]"
                }`}
              >
                {modalState.variant === "danger" || modalState.variant === "error" ? (
                  <ExclamationTriangleIcon className="w-6 h-6" />
                ) : modalState.variant === "warning" ? (
                  <ExclamationTriangleIcon className="w-6 h-6" />
                ) : modalState.variant === "success" ? (
                  <CheckCircleIcon className="w-6 h-6" />
                ) : (
                  <InformationCircleIcon className="w-6 h-6" />
                )}
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <h3 className="font-bold text-[#004560] text-lg leading-snug mb-1.5">
                  {modalState.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line break-words">
                  {modalState.message}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-6 pt-2">
              {modalState.type === "confirm" && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-200 cursor-pointer"
                >
                  {modalState.cancelText}
                </button>
              )}
              <button
                type="button"
                autoFocus
                onClick={handleConfirm}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 cursor-pointer ${
                  modalState.variant === "danger" || modalState.variant === "error"
                    ? "bg-red-600 hover:bg-red-700 focus:ring-red-200"
                    : modalState.variant === "warning"
                    ? "bg-amber-600 hover:bg-amber-700 focus:ring-amber-200"
                    : modalState.variant === "success"
                    ? "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-200"
                    : "bg-[#006993] hover:bg-[#004560] focus:ring-sky-200"
                }`}
              >
                {modalState.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminModalContext.Provider>
  );
}

export function useAdminModal() {
  const context = useContext(AdminModalContext);
  if (!context) {
    throw new Error("useAdminModal must be used within an AdminModalProvider");
  }
  return context;
}

// ── SVG Icons ─────────────────────────────────────────────────────────────

function ExclamationTriangleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      />
    </svg>
  );
}

function InformationCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
      />
    </svg>
  );
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.75} stroke="currentColor" {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
