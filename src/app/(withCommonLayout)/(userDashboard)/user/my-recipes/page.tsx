"use client";

import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react"; // Import useState and useEffect

import { useUser } from "@/src/context/user.provider";
import { useGetAllRecipe } from "@/src/hooks/recipe.hook";
import { IRecipe } from "@/src/types";
import RecipeTable from "@/src/components/UI/userDashboard/RecipeTable";

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
      <Link className="flex justify-end" href="/user/create-recipe">
        <Button className="mb-4" color="success">
          Create Recipe
        </Button>
      </Link>
      <RecipeTable
        isLoading={isPending}
        recipes={recipes} // Pass the recipes from state
        setRecipes={setRecipes} // Pass the setRecipes function
      />
    </div>
  );
};

export default MyRecipesPage;
