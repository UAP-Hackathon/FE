import {
  CreditCard,
  TrendingUp,
  Gift,
  Shield,
  Zap,
  BarChart,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Features() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    // Add scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById("features");
    if (section) observer.observe(section);

    return () => {
      clearTimeout(timer);
      if (section) observer.unobserve(section);
    };
  }, []);

  const features = [
    {
      icon: <CreditCard className="h-10 w-10" />,
      title: "User Registration & Role Selection",
      description:
        "Register, complete your profile, and select your preferred roles and tech stacks.",
      color: "from-blue-400 to-cyan-300",
    },
    {
      icon: <TrendingUp className="h-10 w-10" />,
      title: "Smart CV Generator",
      description:
        "Automatically generate a professional CV using your provided keywords and experience.",
      color: "from-purple-400 to-indigo-300",
    },
    {
      icon: <Gift className="h-10 w-10" />,
      title: "Job Application System",
      description:
        "Browse and apply for open positions tailored to your skills and interests.",
      color: "from-pink-400 to-rose-300",
    },
    {
      icon: <Shield className="h-10 w-10" />,
      title: "Online Exam & Interview Scheduling",
      description:
        "Take technical or behavioral assessments and schedule interviews with ease.",
      color: "from-emerald-400 to-teal-300",
    },
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Automated Scoring & Feedback",
      description:
        "Receive detailed scores, ratings, and feedback after exams and interviews.",
      color: "from-amber-400 to-yellow-300",
    },
    {
      icon: <BarChart className="h-10 w-10" />,
      title: "Admin Dashboard & Analytics",
      description:
        "Admins manage users, jobs, exams, and view platform-wide analytics and reports.",
      color: "from-red-400 to-orange-300",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-gray-50 overflow-hidden relative"
      style={{
        fontFamily:
          "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
      }}
    >
      {/* Background animation elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div
        className="container px-4 md:px-6 relative z-10"
        style={{
          fontFamily:
            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
        }}
      >
        <div
          className={`flex flex-col items-center justify-center space-y-4 text-center transform transition-all duration-700 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-black to-gray-600">
              Platform Features for Job Seekers, Interviewers & Admins
            </h2>
            <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto">
              Everything you need to apply for jobs, conduct interviews, and
              manage the hiring process in one place.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12 perspective-1000">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-xl hover:scale-105 hover:-translate-y-2 transform will-change-transform ${
                isVisible
                  ? "opacity-100 translate-y-0 rotate-0"
                  : "opacity-0 translate-y-12 rotate-2"
              }`}
              style={{
                transitionDelay: `${150 * index}ms`,
                transitionProperty: "all",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              {/* Glow effect background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  feature.color
                } opacity-0 transition-opacity duration-500 rounded-lg blur-sm -z-10 ${
                  activeIndex === index ? "opacity-40" : ""
                }`}
              ></div>

              <div
                className={`p-3 rounded-full transition-all duration-300 transform ${
                  activeIndex === index ? "scale-110 rotate-6" : "rotate-0"
                } bg-gradient-to-br ${feature.color} shadow-lg`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>

              <h3
                className={`text-xl font-bold transition-all duration-300 ${
                  activeIndex === index
                    ? "scale-105 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600"
                    : ""
                }`}
              >
                {feature.title}
              </h3>

              <p
                className={`text-center transition-all duration-300 ${
                  activeIndex === index ? "text-gray-700" : "text-gray-500"
                }`}
              >
                {feature.description}
              </p>

              {activeIndex === index && (
                <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent mt-2 animate-pulse"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
}