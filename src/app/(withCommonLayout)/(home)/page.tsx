 
import RecipeHome from "@/src/components/UI/Home";
import { getAllRecipes } from "@/src/services/RecipeService";
 

export default async function Home() {
  const { data: { recipes } } = await getAllRecipes();
// console.log(recipes)
  return (
    <RecipeHome recipes={recipes} />
  );
}
