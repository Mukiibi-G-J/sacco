import * as React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface ErrorMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  inline?: boolean;
}

const ErrorMessage = React.forwardRef<HTMLDivElement, ErrorMessageProps>(
  ({ className, message, inline = false, ...props }, ref) => {
    if (inline) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center gap-1.5 text-sm text-error", className)}
          role="alert"
          {...props}
        >
          <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>{message}</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "bg-red-50 border border-error rounded-lg p-4",
          className
        )}
        role="alert"
        {...props}
      >
        <div className="flex items-center gap-1.5 text-sm text-error">
          <AlertCircle className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>{message}</span>
        </div>
      </div>
    );
  }
);
ErrorMessage.displayName = "ErrorMessage";

export { ErrorMessage };

