"use client";

import envConfig from "@/src/config/env.confg";
import { useUser } from "@/src/context/user.provider";
import useDebounce from "@/src/hooks/debounce.hook";
import { IRecipe } from "@/src/types";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Container from "../Container";
import { Button } from "@nextui-org/button";
import InfiniteScroll from "react-infinite-scroll-component";
import { Input, Spinner } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import RecipeCard from "../Recipe/RecipeCard";
import Link from "next/link";

interface RecipeProps {
  recipes: IRecipe[];
}

// get access token
const getAuthToken = () => {
  return Cookies.get("accessToken");
};

// Create a new Axios instance for client-side requests
const axiosClient = axios.create({
  baseURL: envConfig.baseApi, // base url
  headers: {
    "Content-Type": "application/json",
  },
});

export default function RecipeHome({ recipes }: RecipeProps) {
  const { user } = useUser();
  const { register, watch } = useForm();
  const searchTerm = useDebounce(watch("search"), 500);
  const [items, setItems] = useState<IRecipe[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>("-voteScore");
  // const [selectedFeed, setSelectedFeed] = useState<string>("");
  const router = useRouter();

  const fetchData = async () => {
    if (loading) return;
    setLoading(true);

    try {
      // Get the token from storage
      const token = getAuthToken();

      // Set token in Authorization header if available
      if (token) {
        axiosClient.defaults.headers["Authorization"] = token;
      }
      
      let response
     if(searchTerm){
       response = await axiosClient.get(`/recipe?searchTerm=${searchTerm}`);
     }else if (selectedSort){
        response = await axiosClient.get(`/recipe?sort=${selectedSort}`);
     }
     else if (searchTerm && selectedSort){
      response = await axiosClient.get(`/recipe?searchTerm=${searchTerm}&sort=${selectedSort}`);
     }
     
     else{
      response = await axiosClient.get(`/recipe`);
     }
      
      const FeedData = response?.data?.data
      console.log(FeedData);
      if (FeedData?.recipes) {
        // Update the items with the fetched data
        setItems((prevItems) => [...prevItems, ...FeedData?.recipes]);

        // Check if there are no more results
        if (FeedData.length === 0) {
          setHasMore(false);
        } else {
          // Increment the page number for pagination
          setPage((prevPage) => prevPage + 1);
        }
      } else {
        console.error("Error: No data found in response");
        setHasMore(false); // Stop fetching if no data is found
      }
    } catch (error) {
      console.error("Error fetching data:", error); // Log errors for debugging
    } finally {
      setLoading(false); // Set loading state to false after the request
    }
  };

  // Reset and fetch new data when search query changes
  useEffect(() => {
    setItems([]); // Reset items
    setPage(1); // Reset page
    setHasMore(true); // Reset hasMore flag
    if (searchTerm !== undefined) {
      fetchData();
      console.log(fetchData, "fetchData") // Fetch data with new search query
    }
  }, [searchTerm]);

  return (
    <Container>
      <div className="mb-8 p-6 bg-white shadow-lg rounded-lg sticky top-0 z-20 border border-gray-200 dark:bg-black dark:border-gray-700 dark:text-white">
        <h2 className="text-4xl font-bold text-center mb-4 text-dark dark:text-light">
          Discover Delicious Recipes
        </h2>
        <p className="text-center text-xl  px-3 py-2 rounded-md">Premium recipe is only for premium user</p>
      
        {/* header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
          {/* Search Bar */}
          <form>
            <Input
              {...register("search")}
              aria-label="Search"
              placeholder="Search Recipe..."
              size="md"
              classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
              }}
              startContent={
                <SearchIcon className="flex-shrink-0 pointer-events-none text-base " />
              }
              type="text"
            />
          </form>
          <Link href={"/membership"} className="flex justify-center"><Button  className="text-center bg-amber-400">Get Premium Membership</Button></Link>


          <div className="flex items-center w-full sm:w-auto mt-4 sm:mt-0">
            <Button
              className="sm:mt-0 sm:ml-4 w-full rounded-md bg-default-900 font-semibold text-default"
              size="md"
              onClick={() => setSelectedSort("-voteScore")}
            >
              Popular Recipe
            </Button>
          </div>
        </div>
      </div>

      {/* main content */}

      <main className="w-full">
        <div className="flex justify-center">
          <div className=" ">
            <div className="" >
              <InfiniteScroll
                dataLength={items?.length}
                next={fetchData}
                style={{overflow : "inherit", width : "100%"}}
                hasMore={hasMore}
                loader={      
                    <Spinner />    
                }
                endMessage={
                  <p className="text-2xl text-center font-bold text-gray-700 dark:text-gray-300 mb-2">
                    No more Recipes!
                  </p>
                }
              >
                <div className="w-full">
                {items?.map((recipe: IRecipe, index) => (
                  <RecipeCard key={`${recipe?._id}-${index}`} recipe={recipe} />
                ))}
                </div>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </main>
    </Container>
  );
}
