"use client";

import Link from "next/link";
import { Users, ClipboardList, PieChart, PlusCircle } from "lucide-react"; // Lucide React icons

import UserProfileDetails from "@/src/components/UI/userDashboard/UserProfileDetails";
import { useGetAuthUser } from "@/src/hooks/user.hook";

export default function UserDashboard() {
  const { data: user, isLoading, error } = useGetAuthUser();

  console.log(user?.data);

  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Sample statistics for demonstration
  const stats = {
    totalUsers: 150,
    totalRecipes: 45,
    pendingApprovals: 5,
  };

  return (
    <div className="p-6">
      {user ? (
        <div>
          {/* Welcome Banner */}
          <div className="bg-blue-100 p-4 rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Welcome, {user.data.name}!
            </h2>
            <p className="text-gray-600">
              Here’s what’s happening in your dashboard.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <Users size={32} className="text-blue-500 mr-4" />
              <div>
                <h3 className="text-lg font-bold">{stats.totalUsers}</h3>
                <p className="text-gray-600">Total Users</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <ClipboardList size={32} className="text-blue-500 mr-4" />
              <div>
                <h3 className="text-lg font-bold">{stats.totalRecipes}</h3>
                <p className="text-gray-600">Total Recipes</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
              <PieChart size={32} className="text-blue-500 mr-4" />
              <div>
                <h3 className="text-lg font-bold">{stats.pendingApprovals}</h3>
                <p className="text-gray-600">Pending Approvals</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Link href={"/admin/create-admin"}>
              <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex items-center justify-center cursor-pointer hover:bg-blue-600 transition">
                <PlusCircle size={24} className="mr-2" />
                <span>Add New Admin</span>
              </div>
            </Link>
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md flex items-center justify-center cursor-pointer hover:bg-blue-600 transition">
              <Users size={24} className="mr-2" />
              <span>Manage Users</span>
            </div>
          </div>

          {/* User Profile Details */}
          <UserProfileDetails user={user.data} />
        </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
}
