"use client";

import { useState, useEffect } from "react";

// Next imports
import { useRouter } from "next/navigation";

// API
import { getCategories } from "@/utils/api";

// Icons
import { FiSearch } from "react-icons/fi";

const Search = () => {
  const router = useRouter();

  const [categories, setCategories] = useState<categoryData[] | null>(null);

  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    getCategoryData();
  }, []);

  const getCategoryData = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      setCategories(null);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search) {
      return;
    }
    let url = `/search/?q=${search}`;
    if (selectedCategory) {
      url += `&category=${selectedCategory}`;
    }

    // router.push(url); // redirecting to the url
    window.location.href = url;
  };

  return (
    <div className="flex justify-center items-center h-[50vh] md:h-[40vh] py-14 px-8 md:px-0">
      <div className=" flex flex-col md:flex-row md:items-center gap-5 md:gap-10 w-full md:w-[60%]">
        {/* Category */}
        <div className=" md:-mr-5">
          <select
            className="text-black  border-slate-100 border-4 w-full md:w-[200px]   bg-white px-1 py-2 p-1 font-medium flex items-center md:gap-1 "
            onChange={(e) => {
              setSelectedCategory(e.target.value);
            }}
          >
            <option value="" className="text-black">
              Category
            </option>
            {categories?.map((category: categoryData, index: number) => (
              <option value={category.slug} className="text-black" key={index}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <form className=" md:w-full relative" onSubmit={handleSearch}>
          <input
            type="text"
            className="px-3 py-3 border w-full  md:w-full text-sm pr-[65px]"
            placeholder="Search Products"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button className="bg-primary  h-full  px-4 absolute top-0 right-0 text-white text-xl">
            <FiSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
