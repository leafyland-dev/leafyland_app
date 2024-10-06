import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "@/db/db"; // Ensure this is correctly pointing to your Prisma client instance

export async function POST(req: Request) {
  const { email, password, name, phone } = await req.json();

  try {
    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
      },
    });

    return NextResponse.json({ message: "User created successfully", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
