"use client";

import { useUser } from "@/src/context/user.provider";
import { useGetAllRecipe } from "@/src/hooks/recipe.hook";
import { IRecipe } from "@/src/types";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import RecipeTable from "@/src/components/UI/userDashboard/RecipeTable";
import { useEffect, useState } from "react"; // Import useState and useEffect

const MyRecipesPage = () => {
  const { user } = useUser();
  const { data, isPending } = useGetAllRecipe();
  const [recipes, setRecipes] = useState<IRecipe[]>([]); // Local state to manage the filtered recipes

  useEffect(() => {
    if (data?.data?.recipes) {
      // Filter recipes based on the user's ID
      const filteredRecipes = data?.data?.recipes.filter((recipe: IRecipe) => {
        const authorId = recipe?.author?._id; 
        return authorId === user?.id; 
      });
      setRecipes(filteredRecipes || []);  
    }
  }, [data, user]);  
  return (
    <div className="lg:ml-4">
      <h3 className="text-2xl font-bold mb-4 text-center">My Recipes</h3>
      <Link href="/user/create-recipe" className="flex justify-end">
        <Button color="success" className="mb-4">
          Create Recipe
        </Button>
      </Link>
      <RecipeTable
        recipes={recipes} // Pass the recipes from state
        setRecipes={setRecipes} // Pass the setRecipes function
        isLoading={isPending}
      />
    </div>
  );
};

export default MyRecipesPage;
