import * as React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export interface SuccessMessageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  inline?: boolean;
}

const SuccessMessage = React.forwardRef<HTMLDivElement, SuccessMessageProps>(
  ({ className, message, inline = false, ...props }, ref) => {
    if (inline) {
      return (
        <div
          ref={ref}
          className={cn(
            "flex items-center gap-1.5 text-sm text-success",
            className
          )}
          role="status"
          {...props}
        >
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>{message}</span>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "bg-green-50 border border-success rounded-lg p-4",
          className
        )}
        role="status"
        {...props}
      >
        <div className="flex items-center gap-1.5 text-sm text-success">
          <CheckCircle2 className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
          <span>{message}</span>
        </div>
      </div>
    );
  }
);
SuccessMessage.displayName = "SuccessMessage";

export { SuccessMessage };

