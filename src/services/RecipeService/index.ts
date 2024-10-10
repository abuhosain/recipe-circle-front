"use server";
import envConfig from "@/src/config/env.confg";
import axiosInstance from "@/src/lib/AxiosInstance";
import { revalidateTag } from "next/cache";

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
    throw new Error(error.message);
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
  value: number
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      `/social/recipes/${recipeId}/vote`,
      {
        vote: value,
      }
    );
    return data;
  } catch (error) {
    console.error("Vote submission error:", error); // Improved logging for easier debugging
    throw new Error("Failed to submit vote"); // This can be further enhanced to include error details
  }
};

export const addRating = async (
  recipeId: string,
  rating: number
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/social/rating/${recipeId}`, {
      rating: rating,
    });
    return data;
  } catch (error) {
    console.error("Rating submission error:", error); // Improved logging for easier debugging
    throw new Error("Failed to submit Rating"); // This can be further enhanced to include error details
  }
};

export const addComment = async (
  recipeId: string,
  comment: string
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      `/social/comment/recipes/${recipeId}`,
      {
        content: comment,
      }
    );
  } catch (error) {
    console.error("Comment submission error:", error); // Improved logging for easier debugging
    throw new Error("Failed to submit Comment"); // This can be further enhanced to include error details
  }
};

// Delete Comment API Call
export const deleteComment = async (
  recipeId: string,
  commentId: string
): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete(
      `/social/recipes/${recipeId}/comment/${commentId}`
    );
    return data; // Return the data if needed
  } catch (error) {
    console.error("Comment deletion error:", error);
    throw new Error("Failed to delete Comment");
  }
};

// Update Comment API Call
export const updateComment = async (
  recipeId: string,
  commentId: string,
  newComment: string
): Promise<any> => {
  try {
    const { data } = await axiosInstance.put(
      `/social/recipes/${recipeId}/comment/${commentId}`,
      {
        content: newComment,
      }
    );
    return data; // Return the data if needed
  } catch (error) {
    console.error("Comment update error:", error);
    throw new Error("Failed to update Comment");
  }
};
