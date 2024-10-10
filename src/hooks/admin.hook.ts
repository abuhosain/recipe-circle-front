import { useMutation, useQuery } from "@tanstack/react-query";
import {  BlockUser, DeleteUser, getAllRecipesByAdmin, getAllUser, publishRecipe, unPublishRecipe } from "../services/AdminService";
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

export const useGetAllRecipeByAdmin = () => {
    return useQuery<any, Error, any, string[]>({
        queryKey: ["GET_RECIPE"],
        queryFn: async () => await getAllRecipesByAdmin(),

    })
}
 


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

export const usePublishRecipe = () => {
    return useMutation<CreateRecipeResponse, Error, string>({
        mutationKey: ["PUBLUSH_RECIPE"],
        mutationFn: async (id) => await publishRecipe(id),
        onSuccess: () => {
            toast.success(" Recipe Published successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};

export const useUnPublishRecipe = () => {
    return useMutation<CreateRecipeResponse, Error, string>({
        mutationKey: ["UnPUBLUSH_RECIPE"],
        mutationFn: async (id) => await unPublishRecipe(id),
        onSuccess: () => {
            toast.success(" Recipe UnPublished successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });
};