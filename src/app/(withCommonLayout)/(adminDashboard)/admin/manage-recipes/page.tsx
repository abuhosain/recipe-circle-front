"use client";

import AdminRecipeDetails from "@/src/components/UI/adminDashboard/AdminRecipeDetails";
import { useGetAllRecipeByAdmin } from "@/src/hooks/admin.hook";
 
 
export default function Page() {
  const { data, isPending } = useGetAllRecipeByAdmin();
  const recipes = data?.data || []; // Safely access recipes or default to an empty array
console.log(data)
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Recipes</h1>
      {isPending && <p className="text-gray-500">Loading recipes...</p>}
      {recipes.length === 0 && !isPending && <p>No recipes found.</p>}
      {recipes.map((recipe : any) => (
        <AdminRecipeDetails key={recipe._id} recipe={recipe} />
      ))}
    </div>
  );
}
