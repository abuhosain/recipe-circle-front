"use client";

import {
  useBlockUser,
  useDeleteUser,
  useUnBlockUser,
} from "@/src/hooks/admin.hook";
import { toast } from "sonner";

interface User {
  _id: string;
  name: string;
  email: string;
  isBlocked: boolean; // Status for block/unblock
}

interface UserTableProps {
  user: User; // Single user object
  isLoading: boolean;
}

const UserTable = ({ user, isLoading }: UserTableProps) => {
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();
  const { mutate: blockUser, isPending: isBlocking } = useBlockUser();
  const { mutate: unblockUser, isPending: isUnblocking } = useUnBlockUser();

  const { _id, name, email, isBlocked } = user; // Destructure user properties

  // Handle Delete User
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id); // Call the delete function from the hook
        toast.success("User deleted successfully!"); // Show success message
      } catch (error) {
        console.error(error); // Log the error
        toast.error("Failed to delete the user."); // Handle error case
      }
    }
  };

  // Handle Block/Unblock User
  const handleBlockToggle = async (id: string, isBlocked: boolean) => {
    const action = isBlocked ? "unblock" : "block"; // Define action based on the current status
    if (confirm(`Are you sure you want to ${action} this user?`)) {
      try {
        if (isBlocked) {
          await unblockUser(id); // Call the unblock function from the hook
        } else {
          await blockUser(id); // Call the block function from the hook
        }
        toast.success(`User ${action}ed successfully!`); // Show success message
      } catch (error) {
        console.error(error); // Log the error
        toast.error(`Failed to ${action} the user.`); // Handle error case
      }
    }
  };

  return (
    <div className="overflow-x-auto shadow-lg rounded-lg">
      <table className="min-w-full bg-white border border-gray-300 rounded-md table-auto">
        {/* Table Header */}
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="py-4 px-6 text-center font-bold">Name</th>
            <th className="py-4 px-6 text-center font-bold">Email</th>
            <th className="py-4 px-6 text-center font-bold">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-4 px-6 text-center text-gray-800">{name}</td>
            <td className="py-4 px-6 text-center text-gray-800">{email}</td>
            <td className="py-4 px-6 text-center">
              <div className="flex justify-center space-x-4">
                <button
                  className={`${
                    isBlocked ? "bg-green-500" : "bg-yellow-500"
                  } text-white font-medium py-2 px-4 rounded-md transition duration-200 ease-in-out hover:opacity-90 ${
                    isBlocking || isUnblocking ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => handleBlockToggle(_id, isBlocked)}
                  disabled={isBlocking || isUnblocking} // Disable button while blocking/unblocking
                >
                  {isBlocking || isUnblocking
                    ? "Processing..."
                    : isBlocked
                    ? "Unblock"
                    : "Block"}
                </button>

                <button
                  className={`bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ${isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={() => handleDelete(_id)}
                  disabled={isDeleting} // Disable button while deleting
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Show loading state if data is being fetched */}
      {isLoading && (
        <p className="mt-4 text-center text-gray-500">Loading user data...</p>
      )}
    </div>
  );
};

export default UserTable;
