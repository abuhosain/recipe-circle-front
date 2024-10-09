import { useMutation, useQuery } from "@tanstack/react-query";
import { addfollowUser, addUnfollowUser, getLoggedUser } from "../services/UserServices";
import { toast } from "sonner";



export const useGetAuthUser = () => {
    return useQuery<any, Error, any, string[]>({
        queryKey: ["GET_ME"],
        queryFn: async () => await getLoggedUser()
    })
  }


// Hook for adding a follow
export const useAddFollow = () => {
    return useMutation({
      mutationKey: ["FOLLOW_USER"],
      mutationFn: async ({ userId } : {userId  : string}) => await addfollowUser(userId),
      onSuccess: () => {
        toast.success("Follow added successfully");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to follow this user");
      },
    });
  };
  
  // Hook for unfollowing
  export const useAddUnFollow = () => {
    return useMutation({
      mutationKey: ["UNFOLLOW_USER"],
      mutationFn: async ({ userId } : {userId : string}) => await addUnfollowUser(userId),
      onSuccess: () => {
        toast.success("Unfollowed successfully");
      },
      onError: (error) => {
        toast.error(error.message || "Failed to unfollow this user");
      },
    });
  };
  

