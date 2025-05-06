import { Star } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Karat understands the creator economy better than any financial institution I've worked with. My credit limit is 5x what traditional banks offered me.",
      author: "Alex Chen",
      role: "YouTube Creator, 1.2M Subscribers",
      avatar: "/placeholder.svg?height=80&width=80",
      stars: 5,
    },
    {
      quote:
        "The application process was incredibly smooth, and they actually valued my social media presence as real business revenue.",
      author: "Sophia Williams",
      role: "Instagram Influencer, 500K Followers",
      avatar: "/placeholder.svg?height=80&width=80",
      stars: 5,
    },
    {
      quote:
        "The rewards are perfectly tailored to what I actually spend money on as a content creator. Game changer for my business.",
      author: "Marcus Johnson",
      role: "Twitch Streamer, 300K Followers",
      avatar: "/placeholder.svg?height=80&width=80",
      stars: 5,
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-black text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Creators Love Karat</h2>
            <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
              Hear from content creators who have transformed their finances with Karat.
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col justify-between space-y-4 rounded-xl bg-gray-900 p-6 shadow-lg">
              <div className="space-y-4">
                <div className="flex">
                  {Array(testimonial.stars)
                    .fill()
                    .map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                    ))}
                </div>
                <p className="text-gray-300">"{testimonial.quote}"</p>
              </div>
              <div className="flex items-center space-x-4">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.author}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{testimonial.author}</h3>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
