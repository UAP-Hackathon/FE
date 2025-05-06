"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-black">Karat</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-black">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-black">
            How It Works
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-gray-600 hover:text-black">
            Testimonials
          </Link>
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild variant="default" className="rounded-full">
            <Link href="/profile">Profile</Link>
          </Button>
          <Button asChild className="rounded-full bg-black text-white hover:bg-gray-800">
            <Link href="#apply">Apply Now</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b shadow-lg">
          <div className="container flex flex-col space-y-4 px-4 py-6">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-600 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-600 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Button asChild variant="outline" className="rounded-full w-full">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                Log In
              </Link>
            </Button>
            <Button asChild className="rounded-full bg-black text-white hover:bg-gray-800 w-full">
              <Link href="#apply" onClick={() => setIsMenuOpen(false)}>
                Apply Now
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
