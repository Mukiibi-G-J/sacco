import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, className }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn("flex items-center text-sm", className)}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <ChevronRight
                    className="h-4 w-4 text-body-text mx-1"
                    aria-hidden="true"
                  />
                )}
                {isLast ? (
                  <span
                    className={cn(
                      "flex items-center font-medium text-main-text",
                      isFirst && "gap-1"
                    )}
                    aria-current="page"
                  >
                    {isFirst && <Home className="h-4 w-4" aria-hidden="true" />}
                    {item.icon && !isFirst && (
                      <span className="mr-1">{item.icon}</span>
                    )}
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href || "#"}
                    className={cn(
                      "flex items-center text-body-text hover:text-main-text transition-colors",
                      isFirst && "gap-1"
                    )}
                  >
                    {isFirst && <Home className="h-4 w-4" aria-hidden="true" />}
                    {item.icon && !isFirst && (
                      <span className="mr-1">{item.icon}</span>
                    )}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }
);
Breadcrumb.displayName = "Breadcrumb";

export { Breadcrumb };

