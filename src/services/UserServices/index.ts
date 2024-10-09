"use server"

import envConfig from "@/src/config/env.confg";
import axiosInstance from "@/src/lib/AxiosInstance";


// get user by id;
export const getSingleUserById = async (userId: string) => {
    let fetchOptions = {};
    fetchOptions = {
      cache: "no-store",
    };
  
    const res = await fetch(`${envConfig.baseApi}/user/${userId}`, fetchOptions);
    if (!res.ok) {
      throw new Error("Faild to fetch recipe ");
    }
    return res.json();
  };
  

// logging user

export const getLoggedUser = async () => {
    try {
      const { data } = await axiosInstance.get("/user/");
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  
export const getRecipesByUserId = async (id: string) => {
    let fetchOptions = {};
    fetchOptions = {
      cache: "no-store",
    };
  
    const res = await fetch(
      `${envConfig.baseApi}/user/recipe/${id}`,
      fetchOptions
    );
    if (!res.ok) {
      throw new Error("Faild to fetch recipe ");
    }
    return res.json();
  };
  
  // follow user
  
  export const addfollowUser = async (userId: string): Promise<any> => {
    try {
      const { data } = await axiosInstance.post(`/user/follow/${userId}`);
      return data;
    } catch (error) {
      console.error("Follow submission error:", error); // Improved logging for easier debugging
      throw new Error("Failed to submit Follow"); // This can be further enhanced to include error details
    }
  };
  
  export const addUnfollowUser = async (userId: string): Promise<any> => {
    try {
      const { data } = await axiosInstance.post(`/user/unfollow/${userId}`);
      return { data };
    } catch (error) {
      console.error("UnFollow submission error:", error); // Improved logging for easier debugging
      throw new Error("Failed to submit UnFollow"); // This can be further enhanced to include error details
    }
  };
  