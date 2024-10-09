"use server";

import { SearchIcon } from "@/src/components/icons";
import RecipeCard from "@/src/components/UI/Recipe/RecipeCard";
import { getAllRecipes } from "@/src/services/RecipeService";
import { Input } from "@nextui-org/input";

export default async function Home() {
  const { data: { recipes } } = await getAllRecipes();
console.log(recipes)
  return (
    <section className="py-10">
      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-8">
        <form className="flex-1">
          <Input
            aria-label="Search"
            classNames={{
              inputWrapper: "bg-default-100",
              input: "text-sm",
            }}
            placeholder="Search..."
            size="lg"
            startContent={
              <SearchIcon className="pointer-events-none flex-shrink-0 text-base" />
            }
            type="text"
          />
        </form>
        
      </div>
      <hr />

      {/* Recipe Cards */}
      <div className="mt-5 grid grid-cols-1    gap-6 justify-center mx-auto max-w-screen-lg">
        {recipes.map((recipe: any) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </section>
  );
}
