"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps, ReactNode, useState, ReactElement } from "react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import React from "react";
import Logo from '../../public/logo.png'
import Image from "next/image";

export function Nav({ children }: { children: ReactElement[] }) {



  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchQuery) router.push(`/products?q=${searchQuery}`);
    else router.push("/products");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavClick = (href: string) => {
    toggleMenu();
    router.push(href);
  };

  return (
    <nav className="bg-[#F2F5F0] text-[#4A5D23] flex flex-col md:flex-row md:justify-between items-center px-2 py-2 relative sticky top-0 z-50">
      {/* Desktop view */}
      <div className="hidden md:flex items-center w-full">
        <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto">
          {/* Centered Logo and Brand Name */}
          <Link href="/" className="flex flex-col items-center space-x-2 mx-auto">
            <Image src={Logo} height="100" width="180" className="mr-20 px-2" alt="imported from public dir"/>
          </Link>
          {/* Right Side: Search and other options */}
          <div className="flex-grow flex items-center justify-end space-x-6">
            {children}
            
          </div>
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex flex-col items-center w-full">
        <div className="flex items-center justify-between w-full px-4">
          {/* Burger Button */}
          <button onClick={toggleMenu} className="p-2">
            {menuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
          {/* Logo and Brand Name */}
          <Link href="/" className="flex flex-col items-center space-x-2 mx-auto">
          <Image src={Logo} height="100" width="180" className="mr-20 px-2" alt="imported from public dir"/>
          </Link>
        </div>
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 mt-2 w-full px-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-2 rounded border border-gray-300 focus:outline-none focus:ring focus:border-blue-300 w-full text-gray-500"
          />
          <button type="submit" className="p-2 bg-secondary text-secondary-foreground rounded hover:bg-secondary-dark focus:outline-none focus:ring">
            Search
          </button>
        </form>
      </div>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="fixed inset-0 bg-primary text-primary-foreground z-50 flex flex-col items-center">
          <button onClick={toggleMenu} className="self-end p-4">
            <XIcon className="h-6 w-6" />
          </button>
          <div className="flex flex-col items-center space-y-4 p-4 w-full">
            {children.map((child) =>
              React.cloneElement(child, {
                onClick: () => handleNavClick(child.props.href),
              })
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:bg-secondary focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-background text-foreground"
      )}
    />
  );
}
