"use client";
import React, { ReactNode } from "react";

import { Navbar } from "@/src/components/UI/navbar";
import { useGetAuthUser } from "@/src/hooks/user.hook";
import Link from "next/link";
import { Button } from "@nextui-org/button";

export default function Layout({ children }: { children: ReactNode }) {
  const { data: user } = useGetAuthUser();
  console.log(user);

  return (
    <div className="relative flex flex-col">
      <div className="block">
        <Navbar />
      </div>

      <main className="container mx-auto max-w-7xl flex-grow">
        {user?.data &&
          !(user?.data?.isPremium || user?.data?.role === "admin") && (
            <div className="bg-blue-50 rounded-lg shadow-md p-6 m-4 lg:m-8 text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Become a Premium Member
              </h3>
              <p className="text-gray-600 mb-4">
                Enjoy exclusive content and features by joining our membership!
              </p>
              <Link href="/membership">
                <Button className="w-full" color="success">
                  Get Premium Membership
                </Button>
              </Link>
            </div>
          )}

        {children}
      </main>
    </div>
  );
}
