// src/components/UI/Recipe/RecipeTable.tsx
import { IRecipe } from "@/src/types";

interface RecipeTableProps {
  recipes: IRecipe[];
  isLoading: boolean; // Loading state
  onDelete: (id: string) => void; // Function to handle recipe deletion
  onUpdate: (id: string) => void; // Function to handle recipe update
}

const RecipeTable = ({ recipes, isLoading, onDelete, onUpdate }: RecipeTableProps) => {
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
                    src={recipe?.images?.[1]}
                    alt={recipe.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-2 px-4">{recipe.title}</td>
                <td className="py-2 px-4">{recipe.description}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                    onClick={() => onUpdate(recipe._id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                    onClick={() => onDelete(recipe._id)}
                  >
                    Delete
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
