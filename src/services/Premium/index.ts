"use server"
import axiosInstance from "@/src/lib/AxiosInstance";
import { FieldValues } from "react-hook-form";

export const PurcaseSubscriptions = async (purchaseData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      `/order/confirmation`,
      purchaseData
    );

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
