 
import ProfileDetails from "@/src/components/UI/Profile/ProfileDetails";
import { getRecipesByUserId, getSingleUserById } from "@/src/services/UserServices";
 
 

interface IProps {
  params: {
    id: string;
  };
}
 
export default async function Profile({ params: { id } }: IProps) {
  const { data: user } = await getSingleUserById(id);
  const {data : recipe} = await getRecipesByUserId(id);
 
  return (
     <div>
       <ProfileDetails user={user}  recipe={recipe} />    
     </div>
  )
}