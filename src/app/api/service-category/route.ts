// e.g. app/api/service-categories/route.ts (Next.js 13+ app router)

// import { prisma } from "@/lib/prisma"; // adjust path to your Prisma client
import prisma from "@/db/db";
import { NextResponse } from "next/server";

type FormattedCategory =
  | {
      name: string;
      href: string;
    }
  | {
      name: string;
      subcategories: { name: string; href: string }[];
    };

export async function GET() {
  try {
    const categories = await prisma.serviceCategory.findMany({
      include: {
        subCategories: true,
      },
    });

    // Format the data for the frontend
    const formatted : FormattedCategory[] = categories.map((cat) => ({
      name: cat.category,
      subcategories: cat.subCategories.map((sub) => ({
        name: sub.subCategory,
        href: `/services/${cat.category.toLowerCase()}/${sub.subCategory.toLowerCase().replace(/\s+/g, "-")}`,
      })),
    }));

    // Add "All Services" as the first option
    formatted.unshift({ name: "All Services", href: "/services" });

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch service categories", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
