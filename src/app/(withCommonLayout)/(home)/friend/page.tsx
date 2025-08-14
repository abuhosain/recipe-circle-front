"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/src/context/user.provider";
import { useGetAllUser } from "@/src/hooks/admin.hook";
import { useAddFollow, useAddUnFollow } from "@/src/hooks/user.hook";
import { toast } from "sonner";
import Link from "next/link";

interface User {
  _id: string;
  name: string;
  profilePicture: string;
  followers: string[];
}

const FriendPages = () => {
  const { user: loggedUser } = useUser();
  const { data, isLoading } = useGetAllUser();
  const [followingUsers, setFollowingUsers] = useState<User[]>([]);
  const [nonFollowingUsers, setNonFollowingUsers] = useState<User[]>([]);
  const [activeTab, setActiveTab] = useState<"following" | "discover">(
    "following",
  );

  const { mutate: followUser } = useAddFollow();
  const { mutate: unfollowUser } = useAddUnFollow();

  useEffect(() => {
    if (data && data.data) {
      const users: User[] = data.data;

      // Categorize users into "Following" and "Non-Following"
      const following = users.filter((user) =>
        user.followers.includes(loggedUser?.id ?? ""),
      );
      const nonFollowing = users.filter(
        (user) => !user.followers.includes(loggedUser?.id ?? ""),
      );

      setFollowingUsers(following);
      setNonFollowingUsers(nonFollowing);
    }
  }, [data, loggedUser]);

  const handleFollow = (userId: string) => {
    followUser(
      { userId },
      {
        onSuccess: () => {
          const user = nonFollowingUsers.find((user) => user._id === userId);
          if (user) {
            setNonFollowingUsers((prev) =>
              prev.filter((u) => u._id !== userId),
            );
            setFollowingUsers((prev) => [...prev, user]);
            toast.success(`${user.name} followed successfully!`);
          }
        },
        onError: () => {
          toast.error("Failed to follow the user. Please try again.");
        },
      },
    );
  };

  const handleUnfollow = (userId: string) => {
    unfollowUser(
      { userId },
      {
        onSuccess: () => {
          const user = followingUsers.find((user) => user._id === userId);
          if (user) {
            setFollowingUsers((prev) => prev.filter((u) => u._id !== userId));
            setNonFollowingUsers((prev) => [...prev, user]);
            toast.success(`${user.name} unfollowed successfully!`);
          }
        },
        onError: () => {
          toast.error("Failed to unfollow the user. Please try again.");
        },
      },
    );
  };

  const UserCard = ({
    user,
    isFollowing,
  }: {
    user: User;
    isFollowing: boolean;
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200 hover:border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={
                user.profilePicture ||
                "/placeholder.svg?height=48&width=48&query=user avatar"
              }
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <Link
              href={`/profile/${user._id}`}
              className="font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200"
            >
              {user.name}
            </Link>
            <p className="text-sm text-gray-500">
              {user.followers.length}{" "}
              {user.followers.length === 1 ? "follower" : "followers"}
            </p>
          </div>
        </div>

        {isFollowing ? (
          <button
            onClick={() => handleUnfollow(user._id)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-gray-300"
          >
            Following
          </button>
        ) : (
          <button
            onClick={() => handleFollow(user._id)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded-lg w-48 mb-8"></div>
            <div className="bg-white rounded-xl p-6">
              <div className="flex gap-4 mb-6">
                <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
                <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
              </div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Connect with People
          </h1>
          <p className="text-gray-600">
            Discover and follow interesting people in your network
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("following")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 relative ${
                activeTab === "following"
                  ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span>Following</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === "following"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {followingUsers.length}
                </span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab("discover")}
              className={`flex-1 px-6 py-4 text-sm font-medium transition-all duration-200 relative ${
                activeTab === "discover"
                  ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span>Discover</span>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    activeTab === "discover"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {nonFollowingUsers.length}
                </span>
              </div>
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "following" ? (
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    People You Follow
                  </h2>
                  <p className="text-sm text-gray-600">
                    Manage your connections and see who you&apos;re following
                  </p>
                </div>

                {followingUsers.length > 0 ? (
                  <div className="space-y-3">
                    {followingUsers.map((user) => (
                      <UserCard key={user._id} user={user} isFollowing={true} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No one followed yet
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Start following people to see them here
                    </p>
                    <button
                      onClick={() => setActiveTab("discover")}
                      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                    >
                      Discover People
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    Discover New People
                  </h2>
                  <p className="text-sm text-gray-600">
                    Find interesting people to connect with
                  </p>
                </div>

                {nonFollowingUsers.length > 0 ? (
                  <div className="space-y-3">
                    {nonFollowingUsers.map((user) => (
                      <UserCard
                        key={user._id}
                        user={user}
                        isFollowing={false}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      You&apos;re all caught up!
                    </h3>
                    <p className="text-gray-600">
                      You&apos;re following everyone available right now
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendPages;
