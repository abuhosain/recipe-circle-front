"use client";
import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";
import { IInput } from "@/src/types";

interface IProps extends IInput {
  name: string;  // The field name that ties the input to react-hook-form
  label?: string;  // Optional label for the input field
}

export default function RcInput({
  variant = "bordered", // Default to bordered variant
  size = "md",         // Default input size
  required = false,    // Required by default is false
  type = "text",       // Input type (text by default)
  label,               // Optional label
  name,                // Field name for form registration
}: IProps) {
  const {
    register,          // Register function to tie input to form
    formState: { errors },  // To capture and show errors
  } = useFormContext(); // Get form context from react-hook-form

  return (
    <Input
      {...register(name, { required })} // Register with validation (e.g., required)
      label={label}                    // Label for the input field
      type={type}                      // Input type (text, email, password, etc.)
      variant={variant}                // Custom variant styling
      size={size}                      // Control input size
      isInvalid={!!errors[name]}       // Mark as invalid if there's an error
      errorMessage={errors[name]?.message as string} // Show error message if there's one
    />
  );
}
