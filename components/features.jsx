import { CreditCard, TrendingUp, Gift, Shield, Zap, BarChart } from "lucide-react"

export default function Features() {
  const features = [
    {
      icon: <CreditCard className="h-10 w-10" />,
      title: "Higher Credit Limits",
      description: "Get credit limits based on your social media revenue, not just your FICO score.",
    },
    {
      icon: <TrendingUp className="h-10 w-10" />,
      title: "Business Growth Tools",
      description: "Access financial insights and tools designed to help grow your creator business.",
    },
    {
      icon: <Gift className="h-10 w-10" />,
      title: "Creator Rewards",
      description: "Earn points on business expenses like cameras, editing software, and more.",
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Financial Protection",
      description: "Get peace of mind with fraud protection and purchase security.",
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Instant Approval",
      description: "Quick application process with decisions often made within minutes.",
    },
    {
      icon: <BarChart className="h-10 w-10" />,
      title: "Revenue Tracking",
      description: "Easily track your income and expenses across multiple platforms.",
    },
  ]

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Features Designed for Creators
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
              Everything you need to manage your finances and grow your creator business.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="p-2 bg-black bg-opacity-5 rounded-full">{feature.icon}</div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
