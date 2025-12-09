import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = React.useId();
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-dark-teal mb-2"
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-body-text pointer-events-none z-10">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            id={inputId}
            className={cn(
              "flex h-10 w-full rounded-lg border border-stroke bg-white py-2 text-sm",
              "placeholder:text-body-text",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow focus-visible:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50",
              error
                ? "border-error focus-visible:ring-error"
                : "border-stroke",
              leftIcon ? "pl-11 pr-3" : "px-3",
              rightIcon ? "pr-11" : "",
              className
            )}
            ref={ref}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? errorId : helperId}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-body-text pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
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
Input.displayName = "Input";

export { Input };

