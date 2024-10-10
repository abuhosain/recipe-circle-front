"use server";

import axiosInstance from "@/src/lib/AxiosInstance";

export const getAllUser = async () => {
  let fetchOptions = {};
  fetchOptions = {
    cache: "no-store",
  };
  const { data } = await axiosInstance.get("/admin/user", fetchOptions);
  return data;
};

// delete usser
export const DeleteUser = async (id: string) => {
  const { data } = await axiosInstance.delete(`/admin/user/${id}`);
  return data;
};

// block usser
export const BlockUser = async (id: string) => {
  const { data } = await axiosInstance.put(`/admin/block/${id}`);
  return data;
};

// unblock usser
export const UnBlockUser = async (id: string) => {
  const { data } = await axiosInstance.put(`/admin/unblock/${id}`);
  return data;
};


// publish recipe
export const publishRecipe = async (id: string) => {
  const { data } = await axiosInstance.put(`/admin/publish//${id}`);
  return data;
};
// publish recipe
export const unPublishRecipe = async (id: string) => {
  const { data } = await axiosInstance.put(`/admin/unpublish//${id}`);
  return data;
};


