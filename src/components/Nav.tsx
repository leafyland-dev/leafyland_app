"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps, ReactElement, useState } from "react";
import { MenuIcon, XIcon, ChevronDownIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Logo from "../../public/logo.png";

const serviceCategories = [
  {
    name: 'All Services',
    href: "/services"
  },
  {
    name: "Cleaning",
    subcategories: [
      { name: "Home Cleaning", href: "/services/cleaning/home" },
      { name: "Office Cleaning", href: "/services/cleaning/office" },
    ],
  },
  {
    name: "Maintenance",
    subcategories: [
      { name: "Electrical", href: "/services/maintenance/electrical" },
      { name: "Plumbing", href: "/services/maintenance/plumbing" },
    ],
  },
];

export function Nav({
  children,
  serviceCategories,
}: {
  children: ReactElement[];
  serviceCategories?: {
    name: string;
    href?: string;
    subcategories?: { name: string; href: string }[];
  }[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleServices = () => setServicesOpen(!servicesOpen);
  const toggleMobileServices = () => setMobileServicesOpen(!mobileServicesOpen);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(searchQuery ? `/products?q=${searchQuery}` : "/products");
  };

  return (
    <nav className="bg-[#F2F5F0] text-[#4A5D23] sticky top-0 z-50 border-b-[20px] border-yellow-300">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between max-w-screen-xl mx-auto px-4 py-3">
        <Link href="/" className="flex items-center">
          <Image src={Logo} height={80} width={200} alt="Logo" priority />
        </Link>

        <div className="flex items-center gap-6">
          {children.map((child) =>
            child.key === "services" ? (
              <div
                key="services"
                className="relative group"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <div className="inline-flex items-center p-3 hover:bg-[#E0E5D8] rounded-lg transition cursor-pointer">
                  <span
                    className={cn(
                      pathname?.startsWith("/services") && "font-semibold"
                    )}
                  >
                    SERVICES
                  </span>
                  <ChevronDownIcon
                    className={`w-4 h-4 ml-1 transition-transform ${servicesOpen ? "rotate-180" : ""
                      }`}
                  />
                </div>

                {servicesOpen && (
                  <div
                    className="absolute left-0 top-full mt-0 bg-white border border-gray-200 shadow-lg rounded-lg w-56 z-50 py-2"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    {serviceCategories && serviceCategories.map((cat) => (
                      <div key={cat.name} className="mb-1 last:mb-0">
                        {cat.subcategories?.length ? (
                          <>
                            <div className="font-semibold text-sm px-4 pt-2 pb-1 text-gray-800">
                              {cat.name}
                            </div>
                            <div className="pl-3 pr-1">
                              {cat.subcategories.map((sub) => (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-[#F2F5F0] rounded-md transition"
                                  onClick={() => setServicesOpen(false)}
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Link
                            href={cat.href || "#"}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F2F5F0] rounded-md transition font-medium"
                            onClick={() => setServicesOpen(false)}
                          >
                            {cat.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}


              </div>
            ) : (
              child
            )
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden px-4 py-3 flex items-center justify-between">
        <button onClick={toggleMenu} aria-label="Toggle menu">
          {menuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
        <Link href="/" className="mx-auto">
          <Image src={Logo} height={60} width={140} alt="Logo" priority />
        </Link>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 shadow-md">
          <form
            onSubmit={handleSearchSubmit}
            className="mb-4 flex gap-2 pt-2"
          >
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-1 focus:ring-[#4A5D23]"
            />
            <button
              type="submit"
              className="bg-[#4A5D23] text-white p-2 rounded hover:bg-[#3A4A1B]"
            >
              Search
            </button>
          </form>
          <div className="space-y-2">
            {children.map((child) =>
              child.key === "services" ? (
                <div key="services" className="mb-2">
                  <button
                    onClick={toggleMobileServices}
                    className="w-full text-left p-3 bg-gray-100 rounded-md flex justify-between items-center hover:bg-gray-200"
                  >
                    <span>Services</span>
                    <ChevronDownIcon
                      className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>
                  {mobileServicesOpen && (
                    <div className="pl-4 mt-1 space-y-1">
                      {serviceCategories && serviceCategories.map((cat) => (
                        <div key={cat.name} className="mb-2">
                          <div className="font-medium text-gray-800 px-2 py-1">
                            {cat.name}
                          </div>
                          <div className="pl-2">
                            {(cat.subcategories ?? []).map((sub) => (
                              <Link
                                key={sub.name}
                                href={sub.href}
                                className="block px-2 py-2 text-sm text-gray-700 hover:bg-[#F2F5F0] rounded-md transition"
                                onClick={() => {
                                  setMenuOpen(false);
                                  setMobileServicesOpen(false);
                                }}
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div
                  key={child.key}
                  onClick={() => setMenuOpen(false)}
                  className="w-full"
                >
                  {child}
                </div>
              )
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
        "p-3 hover:bg-[#E0E5D8] rounded-md transition-colors block",
        pathname === props.href && "font-semibold bg-[#E0E5D8]"
      )}
    />
  );
}