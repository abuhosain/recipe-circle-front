"use server";
import { FieldValues } from "react-hook-form";

import axiosInstance from "@/src/lib/AxiosInstance";

export const PurcaseSubscriptions = async (purchaseData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      `/order/confirmation`,
      purchaseData,
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
