import { useDeleteRecipe } from "@/src/hooks/recipe.hook"; 
import { IRecipe } from "@/src/types";
import Link from "next/link";
import { useState } from "react"; // Import useState to handle specific loading for each recipe
import { toast } from "react-toastify"; 

interface RecipeTableProps {
  recipes: IRecipe[];
  setRecipes: React.Dispatch<React.SetStateAction<IRecipe[]>>; // Pass the setRecipes function
  isLoading: boolean;
}

const RecipeTable = ({ recipes, setRecipes, isLoading }: RecipeTableProps) => {
  const { mutate: deleteRecipe } = useDeleteRecipe(); 
  const [deletingId, setDeletingId] = useState<string | null>(null); // Handle deleting state for each recipe

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      try {
        setDeletingId(id); // Set the ID of the recipe being deleted
        await deleteRecipe(id); // Call the delete function
        toast.success("Recipe deleted successfully!");

        // Update the state to remove the deleted recipe
        setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id));
      } catch (error) {
        toast.error("Failed to delete the recipe.");
      } finally {
        setDeletingId(null); // Reset the deleting ID after deletion
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
                    src={recipe?.images?.[0] || "/placeholder.png"} 
                    alt={recipe.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-2 px-4">{recipe.title}</td>
                <td className="py-2 px-4">{recipe.description}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <Link href={`/user/${recipe?._id}`}>
                    <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                      Update
                    </button>
                  </Link>
                  <button
                    className={`bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ${
                      deletingId === recipe._id ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => handleDelete(recipe._id)}
                    disabled={deletingId === recipe._id} // Disable only the button for the recipe being deleted
                  >
                    {deletingId === recipe._id ? "Deleting..." : "Delete"}
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
