"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import loginValidationSchema from "@/src/schemas/login.schema";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { useUser } from "@/src/context/user.provider";
import Loading from "@/src/components/UI/Loading";
import FXInput from "@/src/components/form/FXInput";
import FXForm from "@/src/components/form/FXForm";

function Login() {
  const { setIsLoading: userLoading } = useUser();
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirect = searchParams?.get("redirect");
  const {
    mutate: handleUserLogin,
    isPending,
    isSuccess,
    data,
  } = useUserLogin();

  // <CHANGE> Added form methods to control form values
  const methods = useForm({
    resolver: zodResolver(loginValidationSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleUserLogin(data);
    userLoading(true);
  };

  // <CHANGE> Added demo credentials handler
  const fillDemoCredentials = () => {
    methods.setValue("email", "user@gmail.com");
    methods.setValue("password", "123456");
    toast.info("Demo credentials filled!");
  };

  useEffect(() => {
    if (data && !data.success) {
      toast.error(data?.message);
    } else if (!isPending && isSuccess) {
      toast.success("User Logged successfully");
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    }
  }, [isPending, isSuccess, redirect, router, data]);

  return (
    <>
      {isPending && <Loading />}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Login with Recipe Circle</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-[35%]">
          {/* <CHANGE> Added demo credentials section */}
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-blue-800">Demo Account</h4>
                <p className="text-xs text-blue-600">
                  Email: user@gmail.com | Password: 123456
                </p>
              </div>
              <Button
                size="sm"
                variant="flat"
                color="primary"
                onClick={fillDemoCredentials}
                className="text-xs"
              >
                Use Demo
              </Button>
            </div>
          </div>

          <FXForm
            resolver={zodResolver(loginValidationSchema)}
            onSubmit={onSubmit}
            // <CHANGE> Pass form methods to FXForm
            {...methods}
          >
            <div className="py-3">
              <FXInput label="Email" name="email" type="email" />
            </div>
            <div className="py-3">
              <FXInput label="Password" name="password" type="password" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
          </FXForm>
          <div className="flex justify-between items-center py-2">
            <Link
              className="text-sm text-blue-500 hover:underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="text-center">
            Don&lsquo;t have an account?{" "}
            <Link className="text-blue-500 hover:underline" href="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <Login />
    </Suspense>
  );
}
