
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./db/db";
import bcrypt from "bcryptjs";



export const { auth, handlers, signIn, signOut } = NextAuth({
    // Your Auth config here
    providers: [
        CredentialsProvider({
          // name: "Credentials", 
          credentials: {
            // email: { label: "Email", type: "email", placeholder: "john.doe@example.com" },
            // password: { label: "Password", type: "password" },
            email: {},
            password: {},
          },
          async authorize(credentials) {
            if (!credentials?.email || typeof credentials.email !== "string" || 
                !credentials.password || typeof credentials.password !== "string") {
              throw new Error("Please enter both email and password.");
            }
    
            const user = await db.user.findUnique({
              where: { email: credentials.email },
            });
    
            if (!user || !(await bcrypt.compare(credentials.password, user.password as string))) {
              throw new Error("Invalid credentials.");
            }
    
            return { id: user.id, email: user.email };
            // console.log(credentials)
            // return null
          },
        }),
      ],
      session: {
        strategy: "jwt",
      },
      pages: {
        signIn: "/login", // Redirect to login page if needed
      },
  });