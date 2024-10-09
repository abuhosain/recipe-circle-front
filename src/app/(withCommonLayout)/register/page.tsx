"use client";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";
import Loading from "@/src/components/UI/Loading";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import registerValidationSchema from "@/src/schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function Register() {
  const { mutate: handleRegistration, isPending, isError, error } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const userData = {
      ...data,
      profilePhoto:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };
    // console.log("Inside form user data: ", userData);
    handleRegistration(userData);
  };

  return (
    <>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Register with Recipe Circle</h3>
        <p className="mb-4">Join us and start creating delicious recipes!</p>
        <div className="w-[35%]">
          <FXForm
            onSubmit={onSubmit}
            resolver={zodResolver(registerValidationSchema)}
          >
            <div className="py-3">
              <FXInput name="name" label="Name" type="text" />
            </div>
            <div className="py-3">
              <FXInput name="email" label="Email" type="email" />
            </div>
            <div className="py-3">
              <FXInput name="password" label="Password" type="password" />
            </div>
            <div className="py-3">
              <FXInput name="phone" label="Phone" type="text" />
            </div>
            <div className="py-3">
              <FXInput name="username" label="Username" type="text" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Register
            </Button>
          </FXForm>
          <div className="text-center">
            Already have an account? <Link href={"/login"}>Login</Link>
          </div>

          {isError && (
            <div className="mt-4 text-red-500">
              {error instanceof Error ? error.message : "Registration failed."}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
