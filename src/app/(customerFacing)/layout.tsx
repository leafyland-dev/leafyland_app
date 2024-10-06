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
  if(session && session.user?.email){

    return (
      <SessionProvider>
      {/* <> */}
      
      <Nav>
       
            <NavLink key="home" href="/">Home</NavLink>
            <NavLink key="products" href="/products">Products</NavLink>
            <NavLink key="orders" href="/orders">My Orders</NavLink>
            <NavLink key="services" href="/services">Services</NavLink>
            <Search key="search" />
            <div key="signout"><SignOut /></div>
        
       </Nav >
       <div className="container my-8">{children}</div>
        <Footer/>
      {/* </> */}
      </SessionProvider>
       )
  }
	   else{
	   return(
	   <>
	   <Nav>
            <NavLink key="home" href="/">Home</NavLink>
            <NavLink key="products" href="/products">Products</NavLink>
            <NavLink key="services" href="/services">Services</NavLink>
            <Search key="search" />
            <Link key="signin" href={"/login"}>
                <Button>Sign In</Button>
            </Link>
        
      </Nav>

      <div className="container my-8">{children}</div>
      <Footer/>
    </>
  );
};
}

export default Layout;



