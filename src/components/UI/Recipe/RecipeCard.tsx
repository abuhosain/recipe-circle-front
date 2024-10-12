"use client";
import { IRecipe } from "@/src/types";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Link from "next/link";

export default function RecipeCard({ recipe }: { recipe: IRecipe }) {
  const recipeImage = recipe.images[1]
  return (
    <Card
      className="py-6 relative max-w-xl mx-auto shadow-lg rounded-xl transition-transform transform hover:scale-105 hover:shadow-2xl "
      style={{ width: "100%", margin: "30px" }} // Increased margin and max width
    >
      <CardHeader className="pb-0 pt-4 flex justify-center">
        <Image
          alt="Card background"
          className="object-cover w-full rounded-t-xl"
          src={recipeImage}
          width={500} // Increased width
          height={250} // Increased height
        />
        {/* Absolute positioning for Premium/Free label */}
        <div className="absolute top-2 right-2 bg-yellow-300 text-black z-10 px-2 py-1 rounded shadow">
          {recipe?.isPremium ? "Premium" : "Free"}
        </div>
      </CardHeader>
      <CardBody className="overflow-visible py-6 px-8">
        <p className="text-2xl uppercase font-bold">
          {recipe?.title}
        </p>
        <div className="flex gap-2 items-center my-2">
          <Rating style={{ maxWidth: 120 }} value={recipe?.averageRating} readOnly />
          <p className="text-xl mt-1 text-gray-600">{recipe?.averageRating}</p>
        </div>
        <h2 className="text-gray-600 mb-2">
          Posted by{" "}
          <Link className="underline text-blue-600" href={`/profile/${recipe.author._id}`}>
            <b>
              <i>{recipe?.author?.name}</i>
            </b>
          </Link>
        </h2>
        <Link href={`/recipes/${recipe?._id}`} className="w-full">
          <Button className="mt-6 w-full" color="primary" size="lg">
            View Details
          </Button>
        </Link>
      </CardBody>
    </Card>
  );
}
