"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Avatar, Button } from "@nextui-org/react";
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

  const { mutate: followUser } = useAddFollow();
  const { mutate: unfollowUser } = useAddUnFollow();

  useEffect(() => {
    if (data && data.data) {
      const users: User[] = data.data;

      // Categorize users into "Following" and "Non-Following"
      const following = users.filter((user) =>
        user.followers.includes(loggedUser?.id ?? "")
      );
      const nonFollowing = users.filter(
        (user) => !user.followers.includes(loggedUser?.id ?? "")
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
              prev.filter((u) => u._id !== userId)
            );
            setFollowingUsers((prev) => [...prev, user]);
            toast.success(`${user.name} followed successfully!`);
          }
        },
        onError: () => {
          toast.error("Failed to follow the user. Please try again.");
        },
      }
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
      }
    );
  };

  return (
    <div className="p-6">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Table
          aria-label="Friend List Table"
          className="shadow-lg border rounded-lg"
        >
          <TableHeader>
            <TableColumn>Following</TableColumn>
            <TableColumn>Non-Following</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow>
              {/* Following Users */}
              <TableCell>
                {followingUsers.length ? (
                  followingUsers.map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-2"
                    >
                      <div className="flex gap-2 items-center">
                        <Avatar src={user.profilePicture} alt={user.name} />
                        <span className="font-medium text-gray-800">
                          <Link
                            className="font-medium text-blue-600 hover:underline"
                            href={`/profile/${user?._id}`}
                          >
                            {" "}
                            {user.name}
                          </Link>
                        </span>
                      </div>
                      <Button
                        color="danger"
                        size="sm"
                        onClick={() => handleUnfollow(user._id)}
                      >
                        Unfollow
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No following users.</p>
                )}
              </TableCell>

              {/* Non-Following Users */}
              <TableCell>
                {nonFollowingUsers.length ? (
                  nonFollowingUsers.map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-2"
                    >
                      <div className="flex gap-2 items-center">
                        <Avatar src={user.profilePicture} alt={user.name} />
                        <span className="font-medium text-gray-800">
                          <Link
                            className="font-medium text-blue-600 hover:underline"
                            href={`/profile/${user?._id}`}
                          >
                            {" "}
                            {user.name}
                          </Link>
                        </span>
                      </div>
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => handleFollow(user._id)}
                      >
                        Follow
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No non-following users.</p>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default FriendPages;
