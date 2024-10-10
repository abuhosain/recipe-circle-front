import { useMutation, useQuery } from "@tanstack/react-query";
import {  BlockUser, DeleteUser, getAllUser } from "../services/AdminService";
import { toast } from "sonner";
interface CreateRecipeResponse {
    message: string;
    success: boolean;
}
export const useGetAllUser = () => {
  return useQuery<any, Error, any, string[]>({
    queryKey: ["GET_ALL_USER"],
    queryFn: async () => await getAllUser(),
  });
};

// delete user
export const useDeleteUser = () => {
    return useMutation<CreateRecipeResponse, Error, string>({
        mutationKey: ["Delete_User"],
        mutationFn: async (id) => await DeleteUser(id),
        onSuccess: () => {
            toast.success(" Delete User successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

// block user

export const useBlockUser = () => {
    return useMutation<CreateRecipeResponse, Error, string>({
        mutationKey: ["BLOCK_User"],
        mutationFn: async (id) => await BlockUser(id),
        onSuccess: () => {
            toast.success(" User blocked successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useUnBlockUser = () => {
    return useMutation<CreateRecipeResponse, Error, string>({
        mutationKey: ["UNBLOCK_User"],
        mutationFn: async (id) => await DeleteUser(id),
        onSuccess: () => {
            toast.success(" User Unblcok successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};