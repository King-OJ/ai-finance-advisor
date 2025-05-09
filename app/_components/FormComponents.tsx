import { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePicker from "./DatePicker";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

type CustomFormTextareaProps = {
  name: string;
  label?: string;
  rows?: number;
  className?: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  control: Control<any>;
};

export function CustomFormTextarea({
  control,
  name,
  label,
  rows,
  className,
}: CustomFormTextareaProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="capitalize" htmlFor={name}>
              {label || name}
            </FormLabel>
          )}
          <FormControl>
            <Textarea
              id={name}
              className={className}
              value={field.value}
              onChange={field.onChange}
              rows={rows}
            />
          </FormControl>
          {/* <FormDescription>This is your public display name.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type CustomFormInputFieldProps = {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  control: Control<any>;
};

export function CustomFormInputField({
  control,
  name,
  type,
  label,
  placeholder,
  className,
}: CustomFormInputFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel htmlFor={name} className="capitalize">
              {label || name}
            </FormLabel>
          )}
          <FormControl>
            <Input
              id={name}
              placeholder={placeholder}
              type={type}
              {...field}
              value={
                type == "number"
                  ? field.value === undefined || field.value === null
                    ? ""
                    : field.value
                  : field.value || ""
              }
              className={className}
              onChange={(e) =>
                type == "number"
                  ? field.onChange(
                      e.target.value && parseInt(e.target.value, 10)
                    )
                  : field.onChange(e.target.value)
              }
            />
          </FormControl>
          {/* <FormDescription>This is your public display name.</FormDescription> */}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type CustomFormSelectFieldProps = {
  name: string;
  placeholder?: string;
  label?: string;
  options: Array<{ name: string; value: string }>;
  onChange?: (value: string) => void;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  control?: Control<any>;
};

export function CustomSelectField({
  placeholder,
  options,
  control,
  name,
  label,
  onChange,
}: CustomFormSelectFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel htmlFor={name} className="capitalize">
              {label}
            </FormLabel>
          )}
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              onChange?.(value);
            }}
            value={field.value ?? undefined}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => {
                return (
                  <SelectItem
                    key={option.name}
                    value={option.value}
                    className="capitalize"
                  >
                    {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type CustomDatePickerFieldProps = {
  name: string;
  label?: string;
  title?: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  control?: Control<any>;
};

export function CustomDatePickerField({
  control,
  name,
  title,
  label,
}: CustomDatePickerFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel className="capitalize">{label}</FormLabel>}
          <div className="space-y-1">
            <FormControl>
              <DatePicker
                title={title}
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}

type CheckboxWithTextProps = {
  name: string;
  description?: string;
  title?: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  control?: Control<any>;
};

export function CheckboxWithText({
  name,
  title,
  description,
  control,
}: CheckboxWithTextProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="items-top flex space-x-2">
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              value={field.value}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor={name}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {title}
              </label>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
}
