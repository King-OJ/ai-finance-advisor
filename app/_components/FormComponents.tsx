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

type CustomFormInputFieldProps = {
  name: string;
  placeholder?: string;
  type?: string;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  control: Control<any>;
};

export function CustomFormInputField({
  control,
  name,
  type,
  placeholder,
}: CustomFormInputFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{name}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              {...field}
              onChange={(e) =>
                type == "number"
                  ? field.onChange(Number(e.target.value))
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
