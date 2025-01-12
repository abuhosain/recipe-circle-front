"use client";
import { FaHome, FaInfoCircle, FaPhoneAlt, FaCog, FaSignOutAlt, FaTimes } from 'react-icons/fa';
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
      {/* Left Sidebar */}
      <div className={`hidden md:fixed top-0 left-0 h-full w-0 md:w-64 bg-yellow-400 text-gray-800 shadow-lg p-6 pt-10   md:block`}>
        <div className="text-2xl font-semibold text-gray-900 mb-6">Recipe Circle</div>
        <ul className="space-y-6">
          {/* Home Link */}
          <li>
            <Link href="/" className="flex items-center space-x-4 text-lg font-medium text-gray-800 hover:text-white hover:bg-gray-900 px-4 py-2 rounded-lg transition">
              <FaHome className="w-5 h-5 text-gray-700 hover:text-white transition" />
              <span>Home</span>
            </Link>
          </li>

          {/* About Link */}
          <li>
            <Link href="/about" className="flex items-center space-x-4 text-lg font-medium text-gray-800 hover:text-white hover:bg-gray-900 px-4 py-2 rounded-lg transition">
              <FaInfoCircle className="w-5 h-5 text-gray-700 hover:text-white transition" />
              <span>About</span>
            </Link>
          </li>

          {/* Contact Link */}
          <li>
            <Link href="/contact" className="flex items-center space-x-4 text-lg font-medium text-gray-800 hover:text-white hover:bg-gray-900 px-4 py-2 rounded-lg transition">
              <FaPhoneAlt className="w-5 h-5 text-gray-700 hover:text-white transition" />
              <span>Contact</span>
            </Link>
          </li>

          {/* Settings Link */}
          <li>
            <Link href="/profile/settings" className="flex items-center space-x-4 text-lg font-medium text-gray-800 hover:text-white hover:bg-gray-900 px-4 py-2 rounded-lg transition">
              <FaCog className="w-5 h-5 text-gray-700 hover:text-white transition" />
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      

      {/* Main Content Area */}
      <div className="md:ml-64 p-6">
        {/* Search Bar and Advanced Search Button */}
        <div className="mb-4 p-6 bg-gradient-to-r from-yellow-50 via-white to-yellow-50 dark:from-gray-800 dark:to-gray-900 shadow-lg rounded-b-lg sticky top-0 z-20 border border-gray-300 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <form className="w-full">
              <Input
                {...register("search")}
                aria-label="Search"
                classNames={{
                  inputWrapper: "bg-default-100 dark:bg-gray-800 rounded-lg",
                  input: "text-sm text-gray-800 dark:text-gray-200",
                }}
                placeholder="Search Recipe by name or ingredients..."
                size="lg"
                startContent={<SearchIcon className="text-lg text-gray-500 dark:text-gray-400" />}
              />
            </form>

            {/* Button for Advanced Search (Hidden on Small Devices) */}
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
                  backdrop: `rgba(0,0,0,0.4) url("https://i.giphy.com/media/3o7aD2saalBwwftBIY/giphy.webp") left top no-repeat`,
                })
              }
            >
              Advanced Search
            </Button>
          </div>
        </div>

        <main className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-center">
            {items.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
            {items.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
          {loading && <p className="text-center mt-4">Loading...</p>}
        </main>
      </div>
    </Container>
  );
}
