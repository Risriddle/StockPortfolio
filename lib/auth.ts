"use server";

import { cookies } from "next/headers";
import argon2 from "argon2";  // Using argon2 for password hashing
import { SignJWT } from "jose";  // Using jose for JWT signing
import User from "@/lib/models/User";
import { dbConnect } from "@/lib/dbConnect";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export async function signUp(formData: { email: string; password: string }) {
  await dbConnect();

  const { email, password } = formData;

  if (!email || !password) {
    return { success: false, message: "Email and Password are required" };
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return { success: false, message: "User already exists" };
  }

  // Hash the password using argon2
  const hashedPassword = await argon2.hash(password);

   await User.create({ email, password: hashedPassword });

  return { success: true };
}

export async function signIn(formData: { email: string; password: string }) {
  await dbConnect();

  const { email, password } = formData;

  if (!email || !password) {
    return { success: false, message: "Email and Password are required" };
  }

  const user = await User.findOne({ email });
  if (!user) {
    return { success: false, message: "Invalid email or password" };
  }

  // Compare password with hashed password using argon2
  const isMatch = await argon2.verify(user.password, password);
  if (!isMatch) {
    return { success: false, message: "Invalid email or password" };
  }

  // Create JWT token using jose
  const secret = new TextEncoder().encode(JWT_SECRET);
  
  const token = await new SignJWT({ userId: user._id }) // Set payload
    .setProtectedHeader({ alg: 'HS256' }) // Set the algorithm
    .setIssuedAt() // Optional: set the issued date
    .setExpirationTime('30d') // Set expiration time
    .sign(secret); // Sign the JWT

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });

  return { success: true };
}

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  return { success: true };
}
