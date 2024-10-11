"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Loading from "@/src/components/UI/Loading";
import { useForgotPassword } from "@/src/hooks/auth.hook";
import { useUser } from "@/src/context/user.provider";
import { forgotPasswordValidationSchema } from "@/src/schemas/login.schema";
import FXForm from "@/src/components/form/FXForm";
import FXInput from "@/src/components/form/FXInput";

const ForgotPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams.get("redirect");
  const {
    mutate: handleforgotPassword,
    isPending,
    isSuccess,
  } = useForgotPassword();
  const { setIsLoading: userLoading } = useUser();

  useEffect(() => {
    if (!isPending && isSuccess) {
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleforgotPassword(data);
    userLoading(true);
  };

  return (
    <>
      {isPending && <Loading></Loading>}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-4 text-3xl font-bold ">Forgot Password</h3>
        <p className="mb-6 text-lg">Enter your email to reset your password</p>

        <div className="w-full max-w-md">
          <FXForm
            onSubmit={onSubmit}
            resolver={zodResolver(forgotPasswordValidationSchema)}
          >
            <div className="py-4">
              <FXInput name="email" label="Email" type="email" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Reset Password
            </Button>
          </FXForm>

          <div className="text-center mt-4 ">
            Remember your password?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
