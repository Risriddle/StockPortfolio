

import { NextRequest, NextResponse } from "next/server"
import { signUp } from "@/lib/auth" // Adjust import path as needed

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request body as JSON
    const formData = await request.json()

    // Call the signUp function with the parsed form data
    const result = await signUp(formData)

    // Return success or failure based on the result of signUp
    if (result.success) {
      return NextResponse.json({ success: true }) // Send success response
    } else {
      return NextResponse.json({
        success: false,
        message: result.message || "Something went wrong",
      }) // Send failure response
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json({ success: false, message: "An error occurred during signup" })
  }
}
