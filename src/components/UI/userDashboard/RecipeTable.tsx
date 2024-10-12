// src/components/UI/Recipe/RecipeTable.tsx
"use client"; // Ensure this is a client component

import { useDeleteRecipe } from "@/src/hooks/recipe.hook"; // Import the hook for deleting recipes
import { IRecipe } from "@/src/types";
import Link from "next/link";
import { toast } from "react-toastify"; // Import toast for notifications

interface RecipeTableProps {
  recipes: IRecipe[];
  isLoading: boolean; // Loading state
}

const RecipeTable = ({ recipes, isLoading }: RecipeTableProps) => {
  const { mutate: deleteRecipe, isPending: isDeleting } = useDeleteRecipe(); // Destructure the hook

  const handleDelete = async (id: string) => {
    console.log(id)
    if (confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(id); // Call the delete function from the hook
        toast.success("Recipe deleted successfully!"); // Show success message
      } catch (error) {
        toast.error("Failed to delete the recipe."); // Handle error case
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Image</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Title</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Description</th>
            <th className="py-2 px-4 text-left font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4} className="py-4 text-center">
                <div className="flex justify-center items-center">
                  <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"></div>
                </div>
              </td>
            </tr>
          ) : recipes.length > 0 ? (
            recipes.map((recipe) => (
              <tr key={recipe._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-2 px-4">
                  <img
                    src={recipe?.images?.[0] || "/placeholder.png"} // Fallback image if none available
                    alt={recipe.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-2 px-4">{recipe.title}</td>
                <td className="py-2 px-4">{recipe.description}</td>
                <td className="py-2 px-4 flex space-x-2">
                 <Link href={`/user/${recipe?._id}`}>
                 <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    // Add update functionality here
                  >
                    Update
                  </button></Link>
                  <button
                    className={`bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ${
                      isDeleting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => handleDelete(recipe._id)}
                    disabled={isDeleting} // Disable button while deleting
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="py-4 text-center">
                No recipes found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecipeTable;
