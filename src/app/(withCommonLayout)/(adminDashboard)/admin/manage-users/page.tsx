"use client";

import { useEffect, useState } from "react";

import UserTable from "@/src/components/UI/adminDashboard/UserTable";
import { useGetAllUser } from "@/src/hooks/admin.hook";

export default function ManageUsers() {
  const { data, isLoading } = useGetAllUser(); 
 
  const [users, setUsers] = useState(data?.data || []);

  // Effect to update the users state when data changes
  useEffect(() => {
    if (data && data.data) {
      setUsers(data.data);
    }
  }, [data]);

  // Handle deleting a user
  const handleDelete = (id: string) => {
    setUsers((prevUsers: any) =>
      prevUsers.filter((user: any) => user._id !== id),
    );
  };

  // Handle updating user status (block/unblock)
  const handleUpdate = (updatedUser: any) => {
    setUsers((prevUsers: any) =>
      prevUsers.map((user: any) =>
        user._id === updatedUser._id ? updatedUser : user,
      ),
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Manage Users</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : users.length > 0 ? (
        users.map((user: any) => (
          <UserTable
            key={user._id} // Key for unique identification
            isLoading={isLoading}
            user={user} // Send each individual user to UserTable
            onDelete={handleDelete} // Callback for deleting user
            onUpdate={handleUpdate} // Callback for updating user status
          />
        ))
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
}
