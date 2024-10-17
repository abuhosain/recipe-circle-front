"use client";

import { useState } from "react";
import { useGetAuthUser } from "@/src/hooks/user.hook";
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
  FaTimes,
} from "react-icons/fa"; // Importing from Font Awesome

const UserDashboardLayout = ({ children }: { children: ReactNode }) => {
  const { data: user } = useGetAuthUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex">
      {/* Side Navigation Bar */}
      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-30 left-0 bg-white shadow-lg w-64 lg:translate-x-0 transition-transform duration-300`}
      >
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
              <Link href="/user">
                <p className="flex mt-3 items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                  <FaHome className="h-6 w-6 lg:h-7 lg:w-7" />
                  <span className="ml-3 hidden lg:block">Dashboard</span>
                </p>
              </Link>

              {/* Conditional Membership Link */}
              {!user?.data?.isPremium && (
                <Link href="/membership">
                  <p className="flex mt-3 items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                    <FaStar className="h-6 w-6 lg:h-7 lg:w-7" />
                    <span className="ml-3 hidden lg:block">Membership</span>
                  </p>
                </Link>
              )}

              <Link href="/user/create-recipe">
                <p className="flex mt-3 items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                  <FaPlusCircle className="h-6 w-6 lg:h-7 lg:w-7" />
                  <span className="ml-3 hidden lg:block">Create Recipe</span>
                </p>
              </Link>
              <Link href="/user/edit-profile">
                <p className="flex mt-3 items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                  <FaUserEdit className="h-6 w-6 lg:h-7 lg:w-7" />
                  <span className="ml-3 hidden lg:block">Update User</span>
                </p>
              </Link>
              <Link href="/user/my-recipes">
                <p className="flex mt-3 items-center text-gray-700 hover:text-blue-500 transition-colors duration-200 text-lg lg:text-xl">
                  <FaBook className="h-6 w-6 lg:h-7 lg:w-7" />
                  <span className="ml-3 hidden lg:block">My Recipes</span>
                </p>
              </Link>
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="w-full flex flex-col lg:ml-64 ">
        {/* Sidebar Toggle Button for Mobile */}
        <div className="flex justify-between items-center bg-white p-4 shadow-lg lg:hidden z-50">
          <button onClick={toggleSidebar} className="text-gray-700">
            {sidebarOpen ? (
              <FaTimes className="h-8 w-8" />
            ) : (
              <FaBars className="h-8 w-8" />
            )}
          </button>
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>

        {/* Membership Section */}
        {!(user?.data?.isPremium || user?.data?.role === "admin") && (
          <div className="bg-blue-50 rounded-lg shadow-md p-6 m-4 lg:m-8 text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Become a Premium Member
            </h3>
            <p className="text-gray-600 mb-4">
              Enjoy exclusive content and features by joining our membership!
            </p>
            <Link href="/membership">
              <Button color="success" className="w-full">
                Get Premium Membership
              </Button>
            </Link>
          </div>
        )}

        {/* Main Content Section */}
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
