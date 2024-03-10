"use client";
import Search from "@/components/search";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();

  const q = searchParams.get("q");
  const category = searchParams.get("category");

  return <Search q={q as string} category={category as string} />;
};

export default SearchPage;
