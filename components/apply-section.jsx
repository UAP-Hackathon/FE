"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function ApplySection() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    platform: "",
    followers: "",
    monthlyIncome: "",
    agreeTerms: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      // In a real app, this would submit the form data to a server
      alert("Application submitted! We will contact you soon.")
      setFormData({
        fullName: "",
        email: "",
        platform: "",
        followers: "",
        monthlyIncome: "",
        agreeTerms: false,
      })
      setStep(1)
    }
  }

  return (
    <section id="apply" className="py-20 bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Ready to Apply?
              </h2>
              <p className="max-w-[600px] text-white/80 md:text-xl">
                Join thousands of creators who are growing their business with Karat. Apply in minutes and get a
                decision fast.
              </p>
            </div>
            <div className="space-y-4 text-white">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-purple-600 font-bold">
                  1
                </div>
                <p>Fill out the simple application form</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-purple-600 font-bold">
                  2
                </div>
                <p>Connect your creator accounts</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-purple-600 font-bold">
                  3
                </div>
                <p>Get approved and receive your card</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6">{step === 1 ? "Start Your Application" : "Creator Details"}</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              {step === 1 ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="Enter your full name"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="platform">Primary Platform</Label>
                    <Select value={formData.platform} onValueChange={(value) => handleSelectChange("platform", value)}>
                      <SelectTrigger id="platform">
                        <SelectValue placeholder="Select your main platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="youtube">YouTube</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="tiktok">TikTok</SelectItem>
                        <SelectItem value="twitch">Twitch</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="followers">Total Followers</Label>
                    <Select
                      value={formData.followers}
                      onValueChange={(value) => handleSelectChange("followers", value)}
                    >
                      <SelectTrigger id="followers">
                        <SelectValue placeholder="Select follower range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10k-50k">10,000 - 50,000</SelectItem>
                        <SelectItem value="50k-100k">50,000 - 100,000</SelectItem>
                        <SelectItem value="100k-500k">100,000 - 500,000</SelectItem>
                        <SelectItem value="500k-1m">500,000 - 1 million</SelectItem>
                        <SelectItem value="1m+">1 million+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome">Monthly Creator Income</Label>
                    <Select
                      value={formData.monthlyIncome}
                      onValueChange={(value) => handleSelectChange("monthlyIncome", value)}
                    >
                      <SelectTrigger id="monthlyIncome">
                        <SelectValue placeholder="Select income range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1k-5k">$1,000 - $5,000</SelectItem>
                        <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
                        <SelectItem value="10k-20k">$10,000 - $20,000</SelectItem>
                        <SelectItem value="20k-50k">$20,000 - $50,000</SelectItem>
                        <SelectItem value="50k+">$50,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                      id="agreeTerms"
                      name="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreeTerms: checked })}
                    />
                    <label
                      htmlFor="agreeTerms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms and conditions and privacy policy
                    </label>
                  </div>
                </>
              )}

              <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800"
                disabled={step === 2 && !formData.agreeTerms}
              >
                {step === 1 ? "Continue" : "Submit Application"}
              </Button>

              {step === 2 && (
                <Button type="button" variant="outline" className="w-full" onClick={() => setStep(1)}>
                  Back
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
