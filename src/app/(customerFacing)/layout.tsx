import { Nav, NavLink } from "@/components/Nav";
import { auth, signOut } from "@/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SessionProvider } from "next-auth/react";
// import { getServerSession } from 'next-auth/next' 
import Search from "@/components/Search"; // Import the Search component
import { FC } from "react";
import prisma from "@/db/db";
import Footer from "@/components/Footer";
import Image from "next/image";

export const dynamic = "force-dynamic"; // Ignoring the cache

function SignOut() {
  return (
    <form action={async () => {
      'use server'
      await signOut();
    }}>
      <Button className="bg-[#F2F5F0] text-[#4A5D23]" type="submit">Sign Out</Button>
    </form>
  );
}


const Layout: FC<{ children: React.ReactNode }> = async ({ children }) => {

  const session = await auth()

  // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/service-categories`, {
  //   cache: "no-cache",
  // });

  // const serviceCategories = await res.json();

  const serviceCategoriesRaw = await prisma.serviceCategory.findMany({
    include: { subCategories: true },
  });

  const serviceCategories = [
    { name: "All Services", href: "/services" },
    ...serviceCategoriesRaw.map((cat) => ({
      name: cat.category,
      subcategories: cat.subCategories.map((sub) => ({
        name: sub.subCategory,
        href: `/services/${cat.category
          .toLowerCase()
          .replace(/\s+/g, "-")}/${sub.subCategory
            .toLowerCase()
            .replace(/\s+/g, "-")}`,
      })),
    })),
  ];


  if (session && session.user?.email) {

    return (
      <SessionProvider>
        {/* <> */}

        <Nav serviceCategories={serviceCategories}>

          <NavLink key="home" href="/">HOME</NavLink>
          <NavLink key="products" href="/products">PRODUCTS</NavLink>
          <NavLink key="orders" href="/orders">MY ORDERS</NavLink>
          <NavLink key="services" href="/services">SERVICES</NavLink>
          <Search key="search" />
          <div key="signout"><SignOut /></div>

        </Nav >
        <div className=" my-0">{children}</div>
        <Footer />
        {/* </> */}
      </SessionProvider>
    )
  }
  else {
    return (
      <>
        <Nav serviceCategories={serviceCategories}>
          <NavLink key="home" href="/">HOME</NavLink>
          <NavLink key="products" href="/products">PRODUCTS</NavLink>
          <NavLink key="services" href="/services">SERVICES</NavLink>
          <Search key="search" />
          <Link key="signin" href={"/login"}>
            <Button>Login/Signup</Button>
          </Link>
          <Link key='join-us' href={"/join-us"}>
            <Button className="bg-green-800 text-white"> JOIN US</Button>
          </Link>
          {/* <NavLink key="work-with-us" href="want-to-work">JOIN US</NavLink> */}

        </Nav>

        <div className=" my-0">{children}</div>
        {/* <div> */}
        
        {/* </div> */}
        <Footer />
      </>
    );
  };
}

export default Layout;



