"use client";

import { useState } from "react";
import Link from "next/link";
import { ReactNode } from "react";
import {
  FaHome,
  FaInfoCircle,
  FaUsers,
  FaEnvelope,
  FaCog,
  FaBars,
  FaTimes,
  FaTachometerAlt,
} from "react-icons/fa";
import NavbarDropdown from "@/src/components/UI/NavbarDropdown";

const AdminDashboardLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navLinks = [
    { href: "/", label: "Home", icon: <FaHome /> },
    { href: "/about", label: "About", icon: <FaInfoCircle /> },
    { href: "/friend", label: "Friends", icon: <FaUsers /> },
    { href: "/contact", label: "Contact", icon: <FaEnvelope /> },
    { href: "/profile/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="flex h-screen text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="h-full flex flex-col justify-between">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400">
              Recipe Circle
            </h2>
            <nav className="space-y-6">
              <div className="flex items-center justify-center px-4 py-3">
              <NavbarDropdown  />
              </div>
              <hr />
            
              {navLinks.map((link, index) => (
                <Link key={index} href={link.href}>
                  <p className="flex items-center px-4 py-3 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition">
                    <span className="text-xl">{link.icon}</span>
                    <span className="ml-4 font-medium">{link.label}</span>
                  </p>
                </Link>
              ))}
              
            </nav>
          </div>

          {/* Close Button (Mobile) */}
          <button
            className="absolute top-4 right-4 hidden"
            onClick={toggleSidebar}
          >
            <FaTimes className="h-6 w-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col  ">
        {/* Page Content */}
        <main className="">
          <div className="mx-auto dark:bg-gray-800 h-full max-w-4xl mx-auto">{children}</div>
        </main>

        {/* Footer */}
        <footer className="py-4 bg-white dark:bg-gray-800 sticky bottom-0 text-center text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Recipe Circle. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
 