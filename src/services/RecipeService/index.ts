"use server";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

import envConfig from "@/src/config/env.confg";
import axiosInstance from "@/src/lib/AxiosInstance";

export const CreateRecipe = async (recipeData: FormData): Promise<any> => {
  try {
    const data = await axiosInstance.post("/recipe", recipeData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    revalidateTag("recipes");

    return data;
  } catch (error: any) {
    console.log(error);
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const DeleteRecipe = async (id: string) => {
  const { data } = await axiosInstance.delete(`/recipe/${id}`);

  return data;
};

export const getAllRecipes = async () => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get("/recipe", fetchOptions);

  return data;
};

export const UpdateRecipe = async (
  recipeId: string,
  recipeData: FieldValues,
) => {
  try {
    const { data } = await axiosInstance.put(
      `/recipes/${recipeId}`,
      recipeData,
    );

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data; // Fallback error
  }
};

export const getSingleRecipesById = async (id: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(`${envConfig.baseApi}/recipe/${id}`, fetchOptions);

  if (!res.ok) {
    throw new Error("Faild to fetch recipe ");
  }

  return res.json();
};

export const createVote = async (
  recipeId: string,
  value: number,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      `/social/recipes/${recipeId}/vote`,
      {
        vote: value,
      },
    );

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const addRating = async (
  recipeId: string,
  rating: number,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/social/rating/${recipeId}`, {
      rating: rating,
    });

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const addComment = async (
  recipeId: string,
  comment: string,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      `/social/comment/recipes/${recipeId}`,
      {
        content: comment,
      },
    );
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

// Delete Comment API Call
export const deleteComment = async (
  recipeId: string,
  commentId: string,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(
      `/social/recipes/${recipeId}/comment/${commentId}`,
    );

    return data; // Return the data if needed
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

// Update Comment API Call
export const updateComment = async (
  recipeId: string,
  commentId: string,
  newComment: string,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(
      `/social/recipes/${recipeId}/comment/${commentId}`,
      {
        content: newComment,
      },
    );

    return data; // Return the data if needed
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};
