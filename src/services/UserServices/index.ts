"use server";

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
    const { data } = await axiosInstance.get("/user");

    return data;
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};
export const GetMeAnUpdate = async (meUpdateData: FormData) => {
  try {
    const { data } = await axiosInstance.put("/user/update", meUpdateData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

export const getRecipesByUserId = async (id: string) => {
  let fetchOptions = {};

  fetchOptions = {
    cache: "no-store",
  };

  const res = await fetch(
    `${envConfig.baseApi}/user/recipe/${id}`,
    fetchOptions,
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
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};

export const addUnfollowUser = async (userId: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/user/unfollow/${userId}`);

    return { data };
  } catch (error: any) {
    const data = {
      success: false,
      message: error?.response?.data?.message,
    };

    return data;
  }
};
