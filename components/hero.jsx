import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-black text-white">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                The Credit Card for Creators
              </h1>
              <p className="max-w-[600px] text-gray-300 md:text-xl">
                Higher limits, better rewards, and financial tools designed specifically for content creators and
                influencers.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild className="rounded-full bg-white text-black hover:bg-gray-200">
                <Link href="#apply">Apply Now</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-white text-white hover:bg-white/10">
                <Link href="#how-it-works">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[500px] rotate-6">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-2xl transform transition-all duration-500 hover:rotate-12 hover:scale-105">
                <div className="absolute inset-0.5 bg-black rounded-2xl p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-8 rounded bg-gradient-to-r from-gray-600 to-gray-700"></div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">KARAT</p>
                      <p className="text-xs text-gray-400">BLACK CARD</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs mb-1">Card Number</p>
                    <p className="font-mono">•••• •••• •••• 1234</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Card Holder</p>
                      <p className="font-mono">CREATOR NAME</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-xs mb-1">Expires</p>
                      <p className="font-mono">05/28</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
