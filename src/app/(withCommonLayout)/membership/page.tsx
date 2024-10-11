"use client";

import Loading from "@/src/components/UI/Loading";
import { usePurcaseSubscriptions } from "@/src/hooks/premium.hook"; // Ensure the hook name is correct
import { useEffect, useState } from "react";

// Define types for the plan object
interface Plan {
  title: string;
  price: string;
  description: string;
  duration: string;
}

interface MembershipPlan {
  totalPrice: number;
  subscriptionDuration: number; // 1 for monthly, 12 for yearly
}

const MembershipPlans = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const {
    mutate: createSubscription,
    data,
    isPending,
    isError,
    isSuccess,
    error,
  } = usePurcaseSubscriptions(); // Ensure the hook is correctly named and imported

  useEffect(() => {
    if (!isPending && data?.data?.payment_url && isSuccess) {
      window.location.href = data?.data?.payment_url;
    } else if (isError) {
      console.error("Error:", error);
    }
  }, [isPending, data, isSuccess, isError, error]);

  const plans: Plan[] = [
    {
      title: "Monthly Plan",
      price: "10",
      description: "Access all premium features for 1 month.",
      duration: "month",
    },
    {
      title: "Yearly Plan",
      price: "100",
      description: "Get a full year of premium access with a discount!",
      duration: "year",
    },
  ];

  const handleSelectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handlePayment = () => {
    if (selectedPlan) {
      const subscriptionDuration = selectedPlan.title === "Monthly Plan" ? 1 : 12;
      const totalPrice = Number(selectedPlan.price);

      const membershipPlan: MembershipPlan = {
        totalPrice,
        subscriptionDuration,
      };

      createSubscription(membershipPlan);
    }
  };

  return (
    <>
      {isPending && !isSuccess && <Loading />}
      {isError && <p className="text-red-500">{error.message}</p>}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 py-16 px-8 flex flex-col items-center">
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-14 text-center leading-tight">
          Choose Your Membership Plan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14 max-w-6xl">
          {plans.map((plan) => (
            <div
              key={plan.title}
              className={`transform transition-all duration-300 ease-in-out rounded-xl overflow-hidden shadow-lg border-2 ${
                selectedPlan?.title === plan.title
                  ? "border-blue-500 bg-gradient-to-br from-blue-200 to-blue-300 dark:from-blue-800 dark:to-blue-700"
                  : "border-transparent bg-white dark:bg-gray-800"
              } hover:scale-105 cursor-pointer`}
              onClick={() => handleSelectPlan(plan)}
            >
              <div className="p-8">
                <h4 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">
                  {plan.title}
                </h4>
                <p className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  ${plan.price}
                </p>
                <p className="text-base text-gray-700 dark:text-gray-300 mb-6">
                  {plan.description}
                </p>

                <div
                  className={`mt-8 w-full h-12 rounded-md flex justify-center items-center text-lg font-semibold ${
                    selectedPlan?.title === plan.title
                      ? "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white"
                      : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-white hover:bg-gray-400"
                  } transition-all duration-300 ease-in-out`}
                >
                  {selectedPlan?.title === plan.title
                    ? "Selected Plan"
                    : "Select Plan"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedPlan && (
          <div className="mt-14 w-full max-w-md">
            <button
              onClick={handlePayment}
              disabled={isPending}
              className={`w-full py-4 ${
                isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-indigo-800"
              } text-white rounded-md text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 ease-in-out`}
            >
              {isPending
                ? "Processing Payment..."
                : "Proceed to Payment with AmarPay"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default MembershipPlans;
