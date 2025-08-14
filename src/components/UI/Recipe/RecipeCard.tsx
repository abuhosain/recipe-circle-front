"use client";

import { IRecipe } from "@/src/types";

import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Image from "next/image";
import Link from "next/link";
import VoteComponent from "./RecipeVote";
import { useVote } from "@/src/hooks/recipe.hook";

export default function RecipeCard({ recipe }: { recipe: IRecipe }) {
  // Use the custom mutation hook for voting
  const { mutate: voteRecipe, data } = useVote();

  const handleVote = (voteValue: 1 | -1 | 0) => {
    voteRecipe({ recipeId: recipe?._id, voteValue });
  };
  return (
    <div className="w-80 h-96 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
      <div className="relative h-48">
        <Image
          alt={recipe.title}
          className="transition-transform duration-300 ease-in-out hover:scale-101"
          layout="fill"
          objectFit="cover"
          src={recipe.images[0]}
        />
        <span
          className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold rounded-full ${
            recipe.isPremium
              ? "bg-yellow-400 text-yellow-900"
              : "bg-green-400 text-green-900"
          }`}
        >
          {recipe.isPremium ? "PREMIUM" : "FREE"}
        </span>
      </div>
      <div className="  flex flex-col justify-between h-48">
        <div className="px-4">
          <h2 className="text-xl font-bold mb-2 line-clamp-2 text-gray-800">
            {recipe.title}
          </h2>
          <div className="flex items-center mb-2">
            <Rating
              readOnly
              style={{ maxWidth: 100 }}
              value={recipe.averageRating}
            />
            <span className="ml-2 text-sm font-medium text-gray-600">
              {recipe.averageRating.toFixed(1)}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
            by{" "}
            <Link
              className="font-medium text-blue-600 hover:underline"
              href={`/profile/${recipe.author._id}`}
            >
              {recipe.author.name}
            </Link>
          </p>
        </div>
        <div className="">
          <VoteComponent
            initialTotalVotes={recipe?.voteScore || 0}
            initialVote={0}
            onVote={handleVote}
          />
        </div>
        <Link className="  w-full mt-3 " href={`/recipes/${recipe._id}`}>
          <button className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-md transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            View Recipe
          </button>
        </Link>
      </div>
    </div>
  );
}
