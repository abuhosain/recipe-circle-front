"use client"

import UserProfileDetails from "@/src/components/UI/userDashboard/UserProfileDetails";
import { useGetAuthUser } from "@/src/hooks/user.hook";
export default function UserDashboard() {
  const { data: user, isLoading, error } = useGetAuthUser();

console.log(user?.data)
  // Loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Render user data
  return (
    <div>
      {user ? (
        <div>
           <UserProfileDetails user={user?.data} />
        </div>
      ) : (
        <div>No user data available</div>
      )}
    </div>
  );
 }
 