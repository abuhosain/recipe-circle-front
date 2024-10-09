"use server"
import Container from "@/src/components/UI/Container";
import RecipeDetails from "@/src/components/UI/Recipe/RecipeDetails";
import { getCurrentUser } from "@/src/services/AuthService";
import { getSingleRecipesById } from "@/src/services/RecipeService";

interface IProps {
  params: {
    recipeId: string;
  };
}
export default async function RecipeDetailsPage({ params: { recipeId } }: IProps) {
  // console.log("id", recipeId);
  const user = await getCurrentUser();
  const { data: recipe } = await getSingleRecipesById(recipeId);
  return (
    <Container>
      <div className="mx-auto  ">
        <RecipeDetails key={recipe._id} recipe={recipe} user={user} />
      </div>
    </Container>
  );
}
