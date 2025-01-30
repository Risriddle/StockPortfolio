import mongoose from "mongoose";

const MONGODB_URI = process.env.DB_URL as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

// Extend the NodeJS global type to include mongoose caching
declare global {
  const mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

// Use globalThis to ensure compatibility
const cached = globalThis.mongoose || (globalThis.mongoose = { conn: null, promise: null });

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: true,
      })
      .then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
