"use client"
import { IInput } from "@/src/types";
import { Input } from "@nextui-org/input";

import { useFormContext } from "react-hook-form";

interface IProps extends IInput {}

export default function FXInput({
  variant = "bordered",
  size = "md",
  required = false,
  type = "text",
  label,
  name,
}: IProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Input
      {...register(name)}
      errorMessage={errors[name] ? (errors[name].message as string) : ""}
      isInvalid={!!errors[name]}
      variant={variant}
      type={type}
      label={label}
      size={size}
      required={required}
    />
  );
}
