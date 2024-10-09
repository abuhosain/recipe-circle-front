"use client"; // This line indicates that this component will be rendered on the client side
import React, { useState, useEffect } from "react";
import { Avatar, Button, Link } from "@nextui-org/react";
import { Author, IRecipe } from "@/src/types";
import RecipeCard from "../Recipe/RecipeCard";

import { toast } from "sonner"; // Import sonner for notifications
import { useUser } from "@/src/context/user.provider";
import { useAddFollow, useAddUnFollow } from "@/src/hooks/user.hook";

function ProfileDetails({ user, recipe }: { user: Author; recipe: IRecipe[] }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const { mutate: followUser } = useAddFollow();
  const { mutate: unfollowUser } = useAddUnFollow();
  const { user: currentUser } = useUser();
  console.log("user", user);
  // Check if the current user is following this profile's user using email
  useEffect(() => {
    if (currentUser?.email && user?.followers) {
      setIsFollowing(
        user.followers.some((follower) => follower.email === currentUser.email)
      );
    }
  }, [currentUser, user.followers]);

  // Handle follow/unfollow action
  const handleFollowToggle = () => {
    if (!currentUser) {
      toast.error("You need to be logged in to follow users.");
      return;
    }

    setIsFollowing((prev) => !prev); // Optimistic UI update

    if (isFollowing) {
      unfollowUser(
        { userId: user?._id },
        {
          onSuccess: () => toast.success("Unfollowed successfully"),
          onError: (error) => {
            console.log(error)
            toast.error("Failed to unfollow the user. Please try again.");
            setIsFollowing(true); // Revert on error
          },
        }
      );
    } else {
      followUser(
        { userId: user?._id },
        {
          onSuccess: () => toast.success("Followed successfully"),
          onError: () => {
            toast.error("Failed to follow the user. Please try again.");
            setIsFollowing(false); // Revert on error
          },
        }
      );
    }
  };

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
          {currentUser?.email !== user?.email && (
          <Button
            className={`mt-4 ${isFollowing ? "bg-red-600" : "bg-blue-600"}`}
            size="sm"
            onClick={handleFollowToggle}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}

        </div>
      </div>

      {/* Followers and Following Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
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

        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">
            Following ({user?.following?.length || 0})
          </h3>
          <ul className="space-y-1">
            {user?.following && user.following.length > 0 ? (
              user.following.map((followee, index) => (
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

      {/* Recipes Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recipes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipe && recipe.length > 0 ? (
            recipe.map((rec) => <RecipeCard key={rec._id} recipe={rec} />)
          ) : (
            <p className="text-gray-700">No recipes found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
