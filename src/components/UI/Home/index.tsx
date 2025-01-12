"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "lucide-react";
import useDebounce from "@/src/hooks/debounce.hook";
import { IRecipe } from "@/src/types";
import envConfig from "@/src/config/env.confg";
import axios from "axios";
import Container from "../Container";
import RecipeCard from "../Recipe/RecipeCard";
import { useGetAuthUser } from "@/src/hooks/user.hook";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import Cookies from "js-cookie";

// get access token
const getAuthToken = () => {
  return Cookies.get("accessToken");
};

const axiosClient = axios.create({
  baseURL: envConfig.baseApi,
  headers: { "Content-Type": "application/json" },
});

export default function RecipeHome() {
  const { data: user } = useGetAuthUser();
  const { register, watch } = useForm();
  const searchTerm = useDebounce(watch("search"), 500);
  const [items, setItems] = useState<IRecipe[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>("");
  const [totalPage, setTotalPage] = useState<number | undefined>();

  // Generate query parameters
  const queryParams = useMemo(() => {
    const query: Record<string, any> = {
      searchTerm,
      selectedSort,
      page,
    };
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(
        ([_, value]) => value !== null && value !== "" && value !== undefined
      )
    );
    return `/recipe?${new URLSearchParams(filteredQuery).toString()}`;
  }, [searchTerm, selectedSort, page]);

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
      const response = await axiosClient.get(queryParams);
      const FeedData = response?.data?.data;
      console.log(FeedData);
      setTotalPage(FeedData?.totalData?.totalPage);

      if (page === 1) {
        setItems(FeedData?.recipes || []);
      } else {
        setItems((prev) => [...prev, ...(FeedData?.recipes || [])]);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset page and items on filter change
  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [searchTerm, selectedSort]);

  // Fetch data when page changes or filters are updated
  useEffect(() => {
    fetchData();
  }, [page, queryParams]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.scrollHeight - 1
    ) { 
      if (!loading && totalPage && totalPage > page) {
        setPage((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, totalPage]);

  return (
    <Container>
      {/* Header */}
      <div className="mb-8 p-6 bg-white dark:bg-black shadow-lg rounded-b-lg-lg sticky top-0 z-20 border border-gray-200">
        <h2 className="text-4xl font-bold text-center mb-4">
          Discover Recipes
        </h2>
        {!(user?.data?.isPremium || user?.data?.role === "admin") && (
          <Link href="/membership" className="flex justify-center">
            <Button className="bg-amber-400">Get Premium Membership</Button>
          </Link>
        )}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <form>
            <Input
              {...register("search")}
              aria-label="Search"
              classNames={{
                inputWrapper: "bg-default-100",
                input: "text-sm",
              }}
              placeholder="Search Recipe..."
              size="md"
              startContent={<SearchIcon className="text-base" />}
            />
          </form>
          
        </div>
      </div>

      {/* Main Content */}
      <main className="flex justify-center">
        <div className="grid grid-cols-1 gap-4">
          {items.map((recipe) => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
        {loading && <p className="text-center mt-4">Loading...</p>}
      </main>
    </Container>
  );
}
