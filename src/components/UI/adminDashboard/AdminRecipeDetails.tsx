"use client";

import { useDeleteRecipe } from "@/src/hooks/recipe.hook";
import React from "react";
import { toast } from "sonner";

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
  // Get the first image from the images array
  const firstImage = images[0];
  const { mutate: deleteRecipe, isPending: isDeleting } = useDeleteRecipe(); // Destructure the hook

  const handleDelete = async (id: string) => {
    console.log(id);
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
          src={firstImage}
          alt={title}
          className="w-full h-48 object-cover rounded-md mb-4 transition-transform duration-300 transform hover:scale-105"
        />
      )}
      <p className="mt-2 text-gray-700 text-base">{description}</p>
      <div className="flex justify-between mt-6">
        <button
          className={`py-2 px-4 rounded-md text-white font-semibold ${
            isPublished
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          } transition duration-300`}
        >
          {isPublished ? "Unpublish" : "Publish"}
        </button>
        <button
          className={`bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ${
            isDeleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handleDelete(recipe._id)}
          disabled={isDeleting} // Disable button while deleting
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default AdminRecipeDetails;
