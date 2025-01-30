import { Inter } from "next/font/google"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

import "./globals.css"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "StockWatch - Track Your Investment Portfolio",
  description: "Monitor your stock portfolio and track your investment performance",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen">
          <Navbar />
          <main className="pt-16">{children}</main>
          <Footer />
        </div>
       
      </body>
    </html>
  )
}

