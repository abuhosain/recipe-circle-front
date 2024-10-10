"use client";

import UserTable from "@/src/components/UI/adminDashboard/UserTable";
import { useGetAllUser } from "@/src/hooks/admin.hook";

export default function ManageUsers() {
  const { data, isLoading } = useGetAllUser(); // Fetching data through the hook

  // Get all users from the data array or use an empty array if no data exists
  const users = data?.data || [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Users</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
        users.map((user : any) => (
          <UserTable 
            key={user._id} // Key for unique identification
            user={user}    // Send each individual user to UserTable
            isLoading={isLoading}
          />
        ))
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
}
