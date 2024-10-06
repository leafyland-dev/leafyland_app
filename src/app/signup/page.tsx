"use client"

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FaGoogle } from 'react-icons/fa';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { firstname, lastname, email, password } = formData;

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${firstname} ${lastname}`,
          email,
          password,
          phone: "1234567890", // Replace with phone if you need to capture it
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("User created successfully!");
      } else {
        setError(data.message || "Something went wrong");
      }
    } catch (error) {
      setError("An error occurred during sign up.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          {/* <p className="text-muted-foreground">Choose your preferred signup method</p> */}
        </div>

        {/* <div className="flex flex-col space-y-2">
          <Link href={"/api/auth/signin"}>
            <Button variant="outline" className="w-full">
              <FaGoogle className="mr-2" />
              Sign up with Google
            </Button>
          </Link>
        </div> */}

        {/* <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div> */}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstname">First name</Label>
              <Input
                id="firstname"
                placeholder="John"
                required
                value={formData.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Last name</Label>
              <Input
                id="lastname"
                placeholder="Doe"
                required
                value={formData.lastname}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john.doe@example.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
