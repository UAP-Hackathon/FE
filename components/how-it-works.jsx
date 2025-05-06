import { Check } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Apply Online",
      description: "Fill out our simple application form with your creator details and platform information.",
    },
    {
      number: "02",
      title: "Connect Your Accounts",
      description: "Link your social media and revenue accounts so we can verify your creator income.",
    },
    {
      number: "03",
      title: "Get Approved",
      description: "Receive a decision quickly, often within minutes, based on your creator metrics.",
    },
    {
      number: "04",
      title: "Receive Your Card",
      description: "Your premium metal Karat card will arrive within days, ready to use.",
    },
  ]

  return (
    <section id="how-it-works" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
              Getting started with Karat is simple and designed specifically for creators.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
                  {step.number}
                </div>
                {index < steps.length - 1 && (
                  <div className="mt-4 h-[2px] w-full bg-gray-200 md:mt-6 md:h-[2px] md:w-full lg:h-[2px] lg:w-full"></div>
                )}
              </div>
              <div className="mt-4 space-y-2 text-center">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-gray-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-gray-50 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">Eligibility Requirements</h3>
              <ul className="space-y-3">
                {[
                  "10,000+ followers across social platforms",
                  "Consistent content creation history",
                  "Verifiable creator income",
                  "US residency (international coming soon)",
                  "18+ years of age",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h4 className="text-xl font-bold mb-4">What You'll Need to Apply</h4>
              <ul className="space-y-3 text-gray-600">
                {[
                  "Social media account links",
                  "Creator platform accounts (YouTube, Twitch, etc.)",
                  "Basic personal information",
                  "Information about your content and audience",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 h-5 w-5 rounded-full bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
