import React from "react";
import { toast } from "sonner";

import { usePublishRecipe, useUnPublishRecipe } from "@/src/hooks/admin.hook";
import { useDeleteRecipe } from "@/src/hooks/recipe.hook";

// AdminRecipeDetails Component
interface Recipe {
  _id: string;
  title: string;
  description: string;
  images: string[]; // Array of image URLs
  isPublished: boolean; // Status for publish/unpublish
  isPremium: boolean; // Status for premium/free
}

interface AdminRecipeDetailsProps {
  recipe: Recipe;
}

const AdminRecipeDetails: React.FC<AdminRecipeDetailsProps> = ({ recipe }) => {
  const { title, description, images, isPublished, isPremium } = recipe;
  const firstImage = images[0];

  // Local state to manage the published state of the recipe
  const [isPublishedState, setIsPublishedState] = React.useState(isPublished);

  // Hooks for delete, publish, and unpublish operations
  const { mutate: deleteRecipe, isPending: isDeleting } = useDeleteRecipe();
  const { mutate: publishRecipe, isPending: isPublishing } = usePublishRecipe();
  const { mutate: unPublishRecipe, isPending: isUnPublishing } =
    useUnPublishRecipe();

  // Handle recipe deletion
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this recipe?")) {
      try {
        await deleteRecipe(id); // Call the delete function from the hook
        toast.success("Recipe deleted successfully!"); // Show success message
        window.location.reload();
      } catch (error) {
        toast.error("Failed to delete the recipe."); // Handle error case
      }
    }
  };

  // Handle publishing of the recipe
  const handlePublish = async (id: string) => {
    try {
      await publishRecipe(id); // Call the publish function from the hook
      setIsPublishedState(true); // Update local state
      toast.success("Recipe published successfully!"); // Show success message
    } catch (error) {
      toast.error("Failed to publish the recipe."); // Handle error case
    }
  };

  // Handle unpublishing of the recipe
  const handleUnPublish = async (id: string) => {
    try {
      await unPublishRecipe(id); // Call the unpublish function from the hook
      setIsPublishedState(false); // Update local state
      toast.success("Recipe unpublished successfully!"); // Show success message
    } catch (error) {
      toast.error("Failed to unpublish the recipe."); // Handle error case
    }
  };

  return (
    <div className="border rounded-lg p-6 shadow-md mb-4 bg-white transition-transform transform hover:scale-105">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center justify-between">
        {title}
        {isPremium ? (
          <span className="bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded-full">
            Premium
          </span>
        ) : (
          <span className="bg-green-400 text-white text-xs font-bold px-2 py-1 rounded-full">
            Free
          </span>
        )}
      </h2>
      {firstImage && (
        <img
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 transform hover:scale-105"
          src={firstImage}
        />
      )}
      <p className="mt-2 text-gray-700 text-base">{description}</p>
      <div className="flex justify-between mt-6">
        <button
          className={`py-2 px-4 rounded-md text-white font-semibold ${
            isPublishedState
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          } transition duration-300`}
          disabled={isPublishing || isUnPublishing} // Disable button while publishing/unpublishing
          onClick={() => {
            if (isPublishedState) {
              handleUnPublish(recipe._id); // Call unpublish if currently published
            } else {
              handlePublish(recipe._id); // Call publish if currently unpublished
            }
          }}
        >
          {isPublishing || isUnPublishing
            ? "Processing..."
            : isPublishedState
              ? "Unpublish"
              : "Publish"}
        </button>
        <button
          className={`bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ${
            isDeleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isDeleting} // Disable button while deleting
          onClick={() => {
            handleDelete(recipe._id);
            // Optionally, you can also remove the recipe from the UI here
          }}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default AdminRecipeDetails;
