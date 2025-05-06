const steps = [
  {
    id: "01",
    title: "Apply online",
    description: "Fill out our simple application with your creator details and social media accounts.",
  },
  {
    id: "02",
    title: "Quick review",
    description: "We analyze your social stats and engagement metrics to determine your qualification.",
  },
  {
    id: "03",
    title: "Get approved",
    description: "Receive your custom credit limit and terms based on your creator business.",
  },
  {
    id: "04",
    title: "Start using",
    description: "Activate your card and access our financial tools to grow your creator business.",
  },
]

const HowItWorks = () => {
  return (
    <div className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-black font-semibold tracking-wide uppercase">Process</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How it works
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Getting started with Karat is simple and designed specifically for creators.
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {steps.map((step) => (
              <div key={step.id} className="relative">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-md bg-black text-white text-xl font-bold">
                    {step.id}
                  </div>
                  <h3 className="ml-4 text-lg leading-6 font-medium text-gray-900">{step.title}</h3>
                </div>
                <p className="mt-2 ml-16 text-base text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
