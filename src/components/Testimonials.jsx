const testimonials = [
  {
    content:
      "Karat understands the creator economy better than any financial institution I've worked with. Their card has been a game-changer for my business.",
    author: {
      name: "Alexandra Chen",
      role: "Content Creator",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    content:
      "I was tired of traditional banks not understanding my income streams. Karat gets it, and they've helped me scale my creator business significantly.",
    author: {
      name: "Marcus Johnson",
      role: "YouTuber",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
  },
  {
    content:
      "The insights I get from Karat's financial tools have helped me make smarter decisions about sponsorships and business investments.",
    author: {
      name: "Sophia Rodriguez",
      role: "Influencer",
      imageUrl: "/placeholder.svg?height=100&width=100",
    },
  },
]

const Testimonials = () => {
  return (
    <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center">Trusted by creators worldwide</h2>
        <div className="mt-12 space-y-6 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden p-6 transform transition duration-500 hover:scale-105"
            >
              <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src={testimonial.author.imageUrl || "/placeholder.svg"}
                  alt={testimonial.author.name}
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{testimonial.author.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.author.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Testimonials
