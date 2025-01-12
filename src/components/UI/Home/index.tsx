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
import Swal from "sweetalert2";

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
      <div className="mb-2 p-6 bg-gradient-to-r from-yellow-50 via-white to-yellow-50 dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-b-lg sticky top-0 z-20 border border-gray-300 dark:border-gray-700">
  <h2 className="text-4xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100 tracking-wide drop-shadow-md">
    Discover Delicious Recipes
  </h2>

  {!(user?.data?.isPremium || user?.data?.role === "admin") && (
    <div className="flex justify-center mb-6">
      <Link href="/membership" className="relative">
        <Button className="bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
          Get Premium Membership
        </Button>
        <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          New
        </span>
      </Link>
    </div>
  )}

  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
    <form className="w-full sm:w-3/4">
      <Input
        {...register("search")}
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100 dark:bg-gray-800 rounded-lg",
          input: "text-sm text-gray-800 dark:text-gray-200",
        }}
        placeholder="Search Recipe by name or ingredients..."
        size="lg"
        startContent={
          <SearchIcon className="text-lg text-gray-500 dark:text-gray-400" />
        }
      />
    </form>

    {/* Button for Advanced Search */}
    <Button
      className="hidden md:block bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 w-1/4"
      onClick={() =>
        Swal.fire({
          title: "Advanced Search",
          text: "This feature is coming soon! Stay tuned for updates.",
          icon: "info",
          confirmButtonText: "Got it!",
          confirmButtonColor: "#3085d6",
          background: "#fefefe",
          backdrop: `
            rgba(0,0,0,0.4)
            url("https://i.giphy.com/media/3o7aD2saalBwwftBIY/giphy.webp")
            left top
            no-repeat
          `,
        })
      }
    >
      Advanced Search
    </Button>

    {/* For small screens, display the button centered */}
    <Button
      className="sm:hidden bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition duration-300 w-full"
      onClick={() =>
        Swal.fire({
          title: "Advanced Search",
          text: "This feature is coming soon! Stay tuned for updates.",
          icon: "info",
          confirmButtonText: "Got it!",
          confirmButtonColor: "#3085d6",
          background: "#fefefe",
          backdrop: `
            rgba(0,0,0,0.4)
            url("https://i.giphy.com/media/3o7aD2saalBwwftBIY/giphy.webp")
            left top
            no-repeat
          `,
        })
      }
    >
      Advanced Search
    </Button>
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
