import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const spinnerVariants = cva("animate-spin", {
  variants: {
    size: {
      sm: "h-4 w-4",
      default: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  centered?: boolean;
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, centered = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          centered && "flex items-center justify-center",
          className
        )}
        role="status"
        aria-label="Loading"
        {...props}
      >
        <Loader2
          className={cn(spinnerVariants({ size }), "text-dark-teal")}
          aria-hidden="true"
        />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);
LoadingSpinner.displayName = "LoadingSpinner";

export { LoadingSpinner, spinnerVariants };

