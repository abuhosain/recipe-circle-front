"use client"; // This line indicates that this component will be rendered on the client side
import React from "react";
import { Avatar } from "@nextui-org/react";
import { Author } from "@/src/types";

function UserProfileDetails({ user }: { user: Author }) {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Profile Overview */}
      <div className="flex items-center mb-8">
        <Avatar
          src={user?.profilePicture || "/default-avatar.png"} // Fallback if no profile picture
          alt={user?.name || "Unknown User"}
          size="lg"
          className="mr-6"
        />
        <div>
          <h1 className="text-3xl font-bold">{user?.name || "Unnamed User"}</h1>
          <p className="text-gray-600">{user?.bio || "No bio available"}</p>
        </div>
      </div>

      {/* Followers and Following Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        {/* Followers */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">
            Followers ({user?.followers?.length || 0})
          </h3>
          <ul className="space-y-1">
            {user?.followers && user.followers.length > 0 ? (
              user.followers.map((follower, index) => (
                <li key={index} className="text-gray-700">
                  {follower.name || "Anonymous"}
                </li>
              ))
            ) : (
              <li className="text-gray-700">No followers yet</li>
            )}
          </ul>
        </div>

        {/* Following */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">
            Following ({user?.following?.length || 0})
          </h3>
          <ul className="space-y-1">
            {user?.following && user?.following.length > 0 ? (
              user.following?.map((followee, index) => (
                <li key={index} className="text-gray-700">
                  {followee.name || "Anonymous"}
                </li>
              ))
            ) : (
              <li className="text-gray-700">Not following anyone</li>
            )}
          </ul>
        </div>
      </div>


      {/* Static Section - Static text for extra information */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-2">About</h3>
        <p className="text-gray-700">
          You passionate about sharing knowledge and loves to contribute to the community.
          Stay tuned for more posts and insights!
        </p>
      </div>
    </div>
  );
}

export default UserProfileDetails;
