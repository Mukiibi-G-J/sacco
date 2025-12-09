"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, ChevronDown } from "lucide-react";

export interface TableColumn<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  sortable?: boolean;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

type SortDirection = "asc" | "desc" | null;

export function Table<T extends Record<string, any>>({
  columns,
  data,
  onRowClick,
  sortable = false,
  loading = false,
  emptyMessage = "No data available",
  className,
}: TableProps<T>) {
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);

  const handleSort = (columnKey: string) => {
    if (!sortable) return;

    const column = columns.find((col) => col.key === columnKey);
    if (!column?.sortable) return;

    if (sortColumn === columnKey) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === bValue) return 0;

      const comparison = aValue > bValue ? 1 : -1;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [data, sortColumn, sortDirection]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-body-text">Loading...</div>
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full">
        <thead>
          <tr className="border-b border-stroke">
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "text-left py-3 px-4 text-sm font-semibold text-main-text",
                  column.className,
                  sortable && column.sortable && "cursor-pointer hover:bg-soft-bg"
                )}
                onClick={() => handleSort(column.key)}
              >
                <div className="flex items-center gap-2">
                  {column.label}
                  {sortable && column.sortable && sortColumn === column.key && (
                    <span className="text-dark-teal">
                      {sortDirection === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-8 text-center text-body-text"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((row, index) => (
              <tr
                key={index}
                className={cn(
                  "border-b border-stroke hover:bg-soft-bg transition-colors",
                  onRowClick && "cursor-pointer"
                )}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={cn("py-3 px-4 text-sm", column.className)}
                  >
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

