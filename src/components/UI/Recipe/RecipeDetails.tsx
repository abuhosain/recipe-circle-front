"use client";
import { useEffect, useState } from "react";
import { IRecipe, IUser } from "@/src/types";
import ImageGallery from "./ImageGallery";
import "@smastrom/react-rating/style.css";

import { Link } from "@nextui-org/react";
import { useVote } from "@/src/hooks/recipe.hook";
import VoteComponent from "./RecipeVote";
import RecipeRating from "./RecipeRating";
import CommentSection from "./RecipeComment";
import { toast } from "sonner";

interface IProps {
  recipe: IRecipe;
  user: IUser;
}

export default function RecipeDetails({ recipe, user }: IProps) {
  console.log(recipe)
  const [totalVotes, setTotalVotes] = useState(recipe?.voteScore || 0);

  // Use the custom mutation hook for voting
  const { mutate: voteRecipe, data } = useVote();

  const handleVote = (voteValue: 1 | -1 | 0) => {
    voteRecipe({ recipeId: recipe?._id, voteValue });
  };

  useEffect(() => {
    if (data && !data.success) {
      toast.error(data?.message);
    }else if(data && data?.success){
      toast.success("Vote submited done");
    }
  }, [data]);

  return (
    <div className="grid md:grid-cols-2 gap-6 p-6   rounded-lg shadow-md mb-12">
      {/* Recipe details section */}
      <div>
        <div className="pr-12">
          <ImageGallery images={recipe?.images} />
        </div>
        <h3 className="text-3xl mt-3 font-semibold">{recipe?.title}</h3>

        {/* Description */}
        <p className="text-md mt-3 ">{recipe?.description}</p>

        {/* Tags */}
        <div className="flex gap-3 mt-3 mb-2">
          <span className="text-xl font-bold">Tags:</span>
          <div className="flex gap-2 items-center">
            {recipe.tags.length > 0 ? (
              recipe.tags.map((item, index) => (
                <span
                  key={index}
                  className="bg-blue-200 text-blue-800 text-sm py-1 px-2 rounded-md"
                >
                  {item}
                </span>
              ))
            ) : (
              <p>No tags available.</p>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-4">
          <h4 className="text-xl font-semibold">Instructions:</h4>
          <p className="text-md text-slate-500">{recipe.instructions}</p>
        </div>

        {/* Vote */}
        <div className="mt-3">
          <VoteComponent
            initialVote={0}
            onVote={handleVote}
            initialTotalVotes={totalVotes}
          />
        </div>
      </div>

      {/* Author section */}
      <div>
        <div className="border rounded-md w-full  relative   mt-12 p-4">
          <div className="text-center">
            <h3 className="font-bold text-2xl">
              Hi, I'm {recipe?.author?.name}
            </h3>
            <h2 className="text-md">
              A culinary enthusiast with a love for creating delicious and
              easy-to-follow recipes. Passionate about blending flavors and
              making cooking enjoyable for everyone.
            </h2>
            <Link href={`/profile/${recipe?.author?._id}`}>
              <button className="px-4 mt-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Learn More..
              </button>
            </Link>
          </div>
        </div>

        <div className="mt-4">
          <RecipeRating key={recipe._id} recipe={recipe} />
        </div>

        <div>
          <CommentSection
            key={recipe?._id}
            recipe={recipe}
            currentUser={user}
          />
        </div>
      </div>
    </div>
  );
}
