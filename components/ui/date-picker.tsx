"use client";

import * as React from "react";
import { Calendar } from "lucide-react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
  className?: string;
}

export function DatePicker({
  label,
  value,
  onChange,
  placeholder = "Select date",
  required,
  error,
  disabled,
  min,
  max,
  className,
}: DatePickerProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={className}>
      <Input
        ref={inputRef}
        label={label}
        type="date"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        error={error}
        disabled={disabled}
        leftIcon={<Calendar className="h-4 w-4" />}
        min={min}
        max={max}
      />
    </div>
  );
}

export interface DateRangePickerProps {
  startDate?: string;
  endDate?: string;
  onStartDateChange?: (date: string) => void;
  onEndDateChange?: (date: string) => void;
  label?: string;
  className?: string;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  label,
  className,
}: DateRangePickerProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <label className="text-sm font-medium text-main-text">{label}</label>
      )}
      <div className="grid grid-cols-2 gap-4">
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={onStartDateChange}
          max={endDate}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={onEndDateChange}
          min={startDate}
        />
      </div>
    </div>
  );
}

