import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      required,
      placeholder,
      options,
      children,
      ...props
    },
    ref
  ) => {
    const selectId = React.useId();
    const errorId = error ? `${selectId}-error` : undefined;
    const helperId = helperText ? `${selectId}-helper` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-dark-teal mb-2"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <select
          id={selectId}
          className={cn(
            "flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error
              ? "border-error focus-visible:ring-error"
              : "border-stroke",
            className
          )}
          ref={ref}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : helperId}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options
            ? options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            : children}
        </select>
        {error && (
          <div
            id={errorId}
            className="mt-2 flex items-center gap-1.5 text-sm text-error"
            role="alert"
          >
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
        {!error && helperText && (
          <div id={helperId} className="mt-2 text-sm text-body-text">
            {helperText}
          </div>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };

