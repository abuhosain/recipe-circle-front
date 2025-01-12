'use client'
 
import { IRecipe } from "@/src/types"
import { Rating } from "@smastrom/react-rating"
import "@smastrom/react-rating/style.css"
import Image from "next/image"
import Link from "next/link"

export default function RecipeCard({ recipe }: { recipe: IRecipe }) {
  return (
    <div className="w-80 h-96 bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
      <div className="relative h-48">
        <Image
          src={recipe.images[0]}
          alt={recipe.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 ease-in-out hover:scale-110"
        />
        <span className={`absolute top-3 right-3 px-2 py-1 text-xs font-bold rounded-full ${
          recipe.isPremium ? 'bg-yellow-400 text-yellow-900' : 'bg-green-400 text-green-900'
        }`}>
          {recipe.isPremium ? 'PREMIUM' : 'FREE'}
        </span>
      </div>
      <div className="p-4 flex flex-col justify-between h-48">
        <div>
          <h2 className="text-xl font-bold mb-2 line-clamp-2 text-gray-800">{recipe.title}</h2>
          <div className="flex items-center mb-2">
            <Rating style={{ maxWidth: 100 }} value={recipe.averageRating} readOnly />
            <span className="ml-2 text-sm font-medium text-gray-600">{recipe.averageRating.toFixed(1)}</span>
          </div>
          <p className="text-sm text-gray-600 mb-2 line-clamp-1">
            by{' '}
            <Link href={`/profile/${recipe.author._id}`} className="font-medium text-blue-600 hover:underline">
              {recipe.author.name}
            </Link>
          </p>
        </div>
        <Link href={`/recipes/${recipe._id}`} className="block w-full mt-auto">
          <button className="w-full px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-md transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            View Recipe
          </button>
        </Link>
      </div>
    </div>
  )
}

