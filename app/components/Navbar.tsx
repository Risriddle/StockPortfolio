
// import { SignInButton, SignedIn, SignedOut, UserButton, SignUpButton,useSignIn } from '@clerk/nextjs'
import Link from 'next/link'
import { Home, Info, Mail } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white shadow-md py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4">
      
        <Link href="/" className="text-2xl font-bold flex items-center space-x-2">
          <span className="text-yellow-400">Stock</span>Watch
        </Link>

      
        <div className="space-x-6 hidden md:flex">
          <Link href="/" className="flex items-center space-x-1 hover:text-yellow-400">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link href="/dashboard" className="flex items-center space-x-1 hover:text-yellow-400">
            <Info className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link href="/contact" className="flex items-center space-x-1 hover:text-yellow-400">
            <Mail className="w-5 h-5" />
            <span>Contact</span>
          </Link>
        </div>

        
        <div className="flex items-center space-x-4">
          {/* <SignedOut>
         
            <SignInButton >
              Sign In
            </SignInButton>

         
            <SignUpButton >
              Sign Up
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn> */}
        </div>
      </div>
    </nav>
  )
}
