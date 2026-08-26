interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

/**
 * Generic form field wrapper — label + control slot.
 */
export default function FormField({ label, required = false, children }: FormFieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-700 font-roboto mb-1.5">
        {label}{required && " *"}
      </label>
      {children}
    </div>
  );
}
