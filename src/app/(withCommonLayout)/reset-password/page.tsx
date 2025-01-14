"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, Suspense } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

import { resetPasswordValidationSchema } from "@/src/schemas/login.schema";
import { useResetPassword } from "@/src/hooks/auth.hook";
import Loading from "@/src/components/UI/Loading";
import FXInput from "@/src/components/form/FXInput";
import FXForm from "@/src/components/form/FXForm";

function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams?.get("token");
  const email = searchParams?.get("email");
  const router = useRouter();
  const {
    mutate: handleResetPassword,
    isPending,
    isSuccess,
  } = useResetPassword();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleResetPassword({ ...data, email, token });
  };

  useEffect(() => {
    if (!isPending && isSuccess) {
      router.push("/login");
    }
  }, [isPending, isSuccess, router]);

  return (
    <>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Reset Password</h3>
        <p className="mb-4">Enter your new password to reset it</p>
        <div className="w-[35%]">
          <FXForm
            resolver={zodResolver(resetPasswordValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="py-3">
              <FXInput
                label="New Password"
                name="newPassword"
                type="password"
              />
            </div>
            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Set New Password
            </Button>
          </FXForm>
          <div className="text-center">
            Remember your password?{" "}
            <Link className="text-blue-500 hover:underline" href="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPassword />
    </Suspense>
  );
}
