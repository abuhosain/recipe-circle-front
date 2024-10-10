"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { ReactNode } from "react";
import {
  FaHome,
  FaStar,
  FaPlusCircle,
  FaUserEdit,
  FaBook,
  FaBars,
  FaCog,
} from "react-icons/fa"; // Importing from Font Awesome

const UserDashboardLayout = ({
  children,
  isAdmin,
}: {
  children: ReactNode;
  isAdmin: boolean;
}) => {
  return (
    <div className="flex h-screen">
      {/* Side Navigation Bar */}
      <aside className="md:fixed inset-y-0 z-20 left-0 bg-white shadow-lg lg:w-72">
        <div className="h-full flex flex-col justify-between p-6 lg:p-8">
          <div>
            {/* Logo or Dashboard Title */}
            <div className="mb-12 flex items-center">
              <FaHome className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-3xl lg:text-4xl font-bold text-gray-800 hidden lg:block">
                Dashboard
              </span>
            </div>
            {/* Navigation Links */}
            <nav className="space-y-8 lg:space-y-12">
              <Link href="/">
                <p className="flex mt-3 items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                  <FaHome className="h-6 w-6 lg:h-7 lg:w-7" />
                  <span className="ml-3 hidden lg:block">Home</span>
                </p>
              </Link>
              <Link href="/admin/manage-recipes">
                <p className="flex mt-3 items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                  <FaBook className="h-6 w-6 lg:h-7 lg:w-7" />
                  <span className=" hidden ml-3 lg:block ">Manage Recipes</span>
                </p>
              </Link>

              
                <Link href="/admin/manage-users">
                  <p className="flex mt-3 items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                    <FaUserEdit className="h-6 w-6 lg:h-7 lg:w-7" />
                    <span className="ml-3 hidden lg:block">Manage Users</span>
                  </p>
                </Link>
               
                <Link href="/admin/create-admin">
                  <p className="flex mt-3 items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                    <FaUserEdit className="h-6 w-6 lg:h-7 lg:w-7" />
                    <span className="ml-3 hidden lg:block">Create Admin</span>
                  </p>
                </Link>
              
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="w-full ">
        {/* Main Content Section */}
        <main>{children}</main>
      </div>

      {/* Sidebar Icon Always Visible on Small Devices */}
      <div className="absolute bottom-0 left-0 lg:hidden">
        <Link href="/">
          <div className="bg-white p-4 shadow-md rounded-full mb-4">
            <FaBars className="h-8 w-8 text-gray-700" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
