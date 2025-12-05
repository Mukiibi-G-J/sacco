import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-accent-yellow text-main-text hover:opacity-90",
        primary: "bg-dark-teal text-white hover:opacity-90",
        secondary: "bg-soft-bg text-main-text hover:opacity-80",
        outline:
          "border border-stroke bg-white text-main-text hover:bg-soft-bg",
        ghost: "bg-transparent text-main-text hover:bg-soft-bg",
        link: "bg-transparent text-dark-teal underline-offset-4 hover:underline",
        destructive: "bg-error text-white hover:opacity-90",
      },
      size: {
        sm: "h-9 rounded-md px-3 text-sm",
        default: "h-10 px-4 py-2",
        lg: "h-11 rounded-lg px-8 text-base",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {!loading && leftIcon && (
          <span className={cn("mr-2", children && "flex-shrink-0")}>{leftIcon}</span>
        )}
        {children}
        {!loading && rightIcon && (
          <span className={cn("ml-2", children && "flex-shrink-0")}>{rightIcon}</span>
        )}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

