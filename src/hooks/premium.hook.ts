import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { PurcaseSubscriptions } from "../services/Premium";

interface SubscriptionData {
  payment_url: string;
}

interface SubscriptionResponse {
  data: SubscriptionData;
  success: boolean;
  message: string;
}

export const usePurcaseSubscriptions = () => {
  return useMutation<SubscriptionResponse, Error, FieldValues>({
    mutationKey: ["PURCASE_SUBSCRIPTIONS"],
    mutationFn: async (subcriptionData) =>
      await PurcaseSubscriptions(subcriptionData),
    onSuccess: () => {
      toast.success(" Membership Subscription successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
