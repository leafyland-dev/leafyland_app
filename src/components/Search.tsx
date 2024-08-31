'use client'

// components/Search.tsx

import { FC, FormEvent, ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "@heroicons/react/outline";


const Search: FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery) router.push(`/products?q=${searchQuery}`);
    else router.push("/products");
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center space-x-0 mr-4">
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="p-2 rounded border border-gray-500 focus:outline-none focus:ring focus:border-blue-300 text-gray-500"
      />
      <button
        type="submit"
        className="p-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary-dark focus:outline-none focus:ring"
      >
                <SearchIcon className="h-6 w-6" />

      </button>
    </form>
  );
};

export default Search;
