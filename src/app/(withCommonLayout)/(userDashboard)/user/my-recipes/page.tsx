// src/pages/my-recipes.tsx
"use client";

 
import { useUser } from "@/src/context/user.provider";
import { useGetAllRecipe } from "@/src/hooks/recipe.hook";
import { IRecipe } from "@/src/types";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import RecipeTable from "@/src/components/UI/userDashboard/RecipeTable";

const MyRecipesPage = () => {
  const { user } = useUser();
  const { data, isPending, isSuccess } = useGetAllRecipe();

  // Filter recipes based on the user's ID
  const recipes = data?.data?.recipes.filter((recipe: IRecipe) => {
    const authorId = recipe?.author?._id; // Get the author's ID from the recipe
    return authorId === user?.id; // Keep the recipe if the IDs match
  }) || [];

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">My Recipes</h3>
      <Link href="/user/create-recipe">
        <Button color="success" className="mb-4">
          Create Recipe
        </Button>
      </Link>
      <RecipeTable
        recipes={recipes  || []}
        isLoading={isPending}
       
      />
    </div>
  );
};

export default MyRecipesPage;