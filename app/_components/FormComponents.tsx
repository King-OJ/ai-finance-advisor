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
            <FormLabel className="capitalize">{label || name}</FormLabel>
          )}
          <FormControl>
            <Input
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
  placeholder: string;
  values: string[];
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  control?: Control<any>;
};

export function CustomSelectField({
  placeholder,
  values,
  control,
  name,
}: CustomFormSelectFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {values.map((value) => {
                return (
                  <SelectItem key={value} value={value} className="capitalize">
                    {value}
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
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  control?: Control<any>;
};

export function CustomDatePickerField({
  control,
  name,
  label,
}: CustomDatePickerFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col space-x-0 space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <FormLabel className="capitalize pt-3">{label || name}</FormLabel>
          <div className="space-y-1">
            <FormControl>
              <DatePicker value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
