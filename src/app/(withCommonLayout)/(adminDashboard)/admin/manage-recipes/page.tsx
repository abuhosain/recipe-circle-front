"use client";

import AdminRecipeDetails from "@/src/components/UI/adminDashboard/AdminRecipeDetails";
import { useGetAllRecipe } from "@/src/hooks/recipe.hook";

 
export default function Page() {
  const { data, isPending } = useGetAllRecipe();
  const recipes = data?.data?.recipes || []; // Safely access recipes or default to an empty array

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
