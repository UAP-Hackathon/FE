import { CreditCard, BarChart3, Zap } from "lucide-react"

const features = [
  {
    name: "Karat Card",
    description:
      "A premium credit card designed specifically for creators with limits based on your social stats, not just credit score.",
    icon: CreditCard,
  },
  {
    name: "Financial Insights",
    description:
      "Get detailed analytics on your income streams, spending patterns, and financial growth opportunities.",
    icon: BarChart3,
  },
  {
    name: "Fast Approvals",
    description: "Our application process is quick and tailored to understand the unique nature of creator businesses.",
    icon: Zap,
  },
]

const Features = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-black font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Financial tools built for creators
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Everything you need to manage your finances and grow your creator business.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-black text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}

export default Features
