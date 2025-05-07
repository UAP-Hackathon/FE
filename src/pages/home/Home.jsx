import React, { useEffect, useState, useRef } from "react";
import Layout from "../../components/layout/Layout";
//eslint-disable-next-line
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Features from "../../components/Features";

// Bubble component for animation
const Bubble = ({ size, delay, duration, left }) => (
  <div
    className="absolute rounded-full bg-emerald-400/20 z-0"
    style={{
      width: size,
      height: size,
      bottom: -100,
      left: `${left}%`,
      animation: `float ${duration}s ease-in infinite ${delay}s`,
    }}
  />
);

function Home() {
  const [bubbles, setBubbles] = useState([]);
  const canvasRef = useRef(null);
  const [aiLines, setAiLines] = useState([]);
  const [aiDots, setAiDots] = useState([]);

  useEffect(() => {
    // Generate random bubbles
    const newBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 100) + 20,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      left: Math.random() * 100,
    }));
    setBubbles(newBubbles);

    // Generate AI network lines
    const lines = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x1: Math.random() * 100,
      y1: Math.random() * 100,
      x2: Math.random() * 100,
      y2: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    }));
    setAiLines(lines);

    // Generate AI network dots
    const dots = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      pulse: Math.random() * 2 + 1,
      delay: Math.random() * 2,
    }));
    setAiDots(dots);

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let hue = 220; // Blue hue

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      constructor(x, y) {
        this.x = x || Math.random() * canvas.width;
        this.y = y || Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.initialHue = hue;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.size > 0.2) this.size -= 0.01;
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.initialHue}, 80%, 60%, 0.2)`;
        ctx.fill();
      }
    }

    const createParticles = (e) => {
      const mouseX = e?.clientX;
      const mouseY = e?.clientY;

      for (let i = 0; i < 2; i++) {
        particles.push(new Particle(mouseX, mouseY));
      }
    };

    const init = () => {
      for (let i = 0; i < 40; i++) {
        particles.push(new Particle());
      }
    };

    init();
    canvas.addEventListener("mousemove", createParticles);

    const animate = () => {
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        particles.forEach((p2, j) => {
          if (index !== j) {
            const dx = particle.x - p2.x;
            const dy = particle.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `hsla(${particle.initialHue}, 80%, 60%, ${
                (1 - distance / 100) * 0.2
              })`;
              ctx.lineWidth = 0.2;
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });

        if (particle.size <= 0.2) {
          particles.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", createParticles);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const features = [
    {
      title: "AI Image Generation",
      description: "Create stunning images from text descriptions",
      icon: "🎨",
      path: "/image-generate",
    },
    {
      title: "Code Assistant",
      description: "Get help with your coding tasks",
      icon: "💻",
      path: "/coding-based",
    },
    {
      title: "Smart Analytics",
      description: "Analyze data with AI precision",
      icon: "📊",
      path: "/analytics",
    },
  ];

  return (
    <Layout>
      <section
        className="relative flex items-center justify-center min-h-screen py-20 md:py-32 overflow-hidden bg-gradient-to-r from-purple-900 via-purple-700 to-fuchsia-700 text-white px-20"
        style={{
          fontFamily:
            "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
        }}
      >
        {/* Bubble animations */}
        {bubbles.map((bubble) => (
          <Bubble
            key={bubble.id}
            size={bubble.size}
            delay={bubble.delay}
            duration={bubble.duration}
            left={bubble.left}
          />
        ))}

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div
          className="container px-4 md:px-6 relative z-10 flex items-center justify-center min-h-[60vh]"
          style={{
            fontFamily:
              "SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif",
          }}
        >
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center justify-center w-full">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1
                  className="text-3xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none animate-fadeIn text-black"
                  style={{ transition: "text-shadow 0.3s ease" }}
                >
                  The Platform for Job Seekers & Interviewers
                </h1>
                <p className="max-w-[600px] text-black md:text-xl animate-slideUp font-medium">
                  Apply for jobs, take interviews, and get evaluated. Manage
                  your career or hiring process with smart tools for candidates,
                  interviewers, and admins.
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              {/* SkillBridge AI Card */}
              <div className="relative w-[220px] h-[300px] md:w-[300px] md:h-[380px] lg:w-[340px] lg:h-[440px] rotate-6 hover:rotate-0 transition-all duration-700 ml-4 md:ml-8 lg:ml-12">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-2xl transform transition-all duration-700 hover:scale-110 animate-float ai-card-glow">
                  {/* AI Network Animation */}
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    {aiLines.map((line) => (
                      <div
                        key={line.id}
                        className="absolute bg-white/30"
                        style={{
                          left: `${line.x1}%`,
                          top: `${line.y1}%`,
                          width: `${Math.abs(line.x2 - line.x1)}%`,
                          height: '1px',
                          opacity: line.opacity,
                          transform: `rotate(${Math.atan2(line.y2 - line.y1, line.x2 - line.x1) * (180 / Math.PI)}deg)`,
                          transformOrigin: 'left center',
                          animation: `aiLinePulse ${line.duration}s ease-in-out infinite ${line.delay}s`
                        }}
                      ></div>
                    ))}
                    {aiDots.map((dot) => (
                      <div
                        key={dot.id}
                        className="absolute bg-white rounded-full"
                        style={{
                          left: `${dot.x}%`,
                          top: `${dot.y}%`,
                          width: `${dot.size}px`,
                          height: `${dot.size}px`,
                          animation: `aiDotPulse ${dot.pulse}s ease-in-out infinite ${dot.delay}s`
                        }}
                      ></div>
                    ))}
                  </div>
                  
                  <div className="absolute inset-0.5 bg-gradient-to-b from-black/90 to-black/70 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-8 rounded bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-300 text-glow-subtle cursor-pointer">
                          SKILLBRIDGE
                        </p>
                        <p className="text-xs text-purple-300 text-glow-subtle cursor-pointer">
                          AI ASSISTANT
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="h-6 w-full bg-purple-900/30 rounded-lg overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg animate-aiProgress" style={{width: '65%'}}></div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div 
                            key={i}
                            className="w-2 h-8 bg-purple-900/30 rounded-full overflow-hidden"
                          >
                            <div 
                              className="w-full bg-purple-500 rounded-full animate-aiEqualizer" 
                              style={{
                                height: `${Math.random() * 50 + 30}%`, 
                                animationDelay: `${i * 0.1}s`
                              }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-gray-300 text-xs mb-1 text-glow-subtle cursor-pointer">
                        Neural Network ID
                      </p>
                      <p className="font-mono text-glow-subtle cursor-pointer text-purple-200">
                        SK•AI•<span className="animate-blink">2024</span>
                      </p>
                    </div>
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-gray-300 text-xs mb-1 text-glow-subtle cursor-pointer">
                          Powered By
                        </p>
                        <p className="font-mono text-glow-subtle cursor-pointer text-purple-200">
                          SKILLBRIDGE
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-300 text-xs mb-1 text-glow-subtle cursor-pointer">
                          Version
                        </p>
                        <p className="font-mono text-glow-subtle cursor-pointer text-purple-200">
                          3.0
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        {/* Removed features grid as requested */}

        {/* Decorative Wave */}
        <div className="absolute left-0 right-0 bottom-0 z-10 pointer-events-none">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-24"
          >
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,32L48,53.3C96,75,192,117,288,117.3C384,117,480,75,576,74.7C672,75,768,117,864,133.3C960,149,1056,139,1152,117.3C1248,96,1344,64,1392,48L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            />
          </svg>
        </div>

        {/* CSS for animations */}
        <style jsx global>{`
          @keyframes float {
            0% {
              transform: translateY(0) scale(1);
              opacity: 0;
            }
            10% {
              opacity: 0.8;
            }
            100% {
              transform: translateY(-1000px) scale(1.5) rotate(360deg);
              opacity: 0;
            }
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes slideUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes float {
            0%,
            100% {
              transform: translateY(0) rotate(6deg);
            }
            50% {
              transform: translateY(-20px) rotate(8deg);
            }
          }
          
          @keyframes aiLinePulse {
            0%, 100% {
              opacity: 0.1;
            }
            50% {
              opacity: 0.5;
            }
          }
          
          @keyframes aiDotPulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.7;
            }
            50% {
              transform: scale(1.5);
              opacity: 1;
            }
          }
          
          @keyframes aiProgress {
            0%, 100% {
              width: 65%;
              opacity: 0.8;
            }
            50% {
              width: 75%;
              opacity: 1;
            }
          }
          
          @keyframes aiEqualizer {
            0%, 100% {
              height: 30%;
            }
            25% {
              height: 80%;
            }
            50% {
              height: 40%;
            }
            75% {
              height: 60%;
            }
          }
          
          @keyframes blink {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.3;
            }
          }

          .animate-fadeIn {
            animation: fadeIn 1s ease-out forwards;
          }

          .animate-slideUp {
            animation: fadeIn 0.8s ease-out forwards,
              slideUp 1s ease-out forwards;
            animation-delay: 0.2s;
            opacity: 0;
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-aiProgress {
            animation: aiProgress 4s ease-in-out infinite;
          }
          
          .animate-aiEqualizer {
            animation: aiEqualizer 1.5s ease-in-out infinite;
          }
          
          .animate-blink {
            animation: blink 1.5s ease-in-out infinite;
          }

          /* Text glow effects */
          .text-glow {
            transition: text-shadow 0.3s ease;
          }

          .text-glow:hover {
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.8),
              0 0 12px rgba(46, 213, 115, 0.8), 0 0 20px rgba(46, 213, 115, 0.6);
          }

          .text-glow-subtle {
            transition: text-shadow 0.3s ease;
          }

          .text-glow-subtle:hover {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.7),
              0 0 8px rgba(168, 85, 247, 0.7);
          }

          .button-glow {
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }

          .button-glow:hover {
            box-shadow: 0 0 10px rgba(46, 213, 115, 0.7),
              0 0 20px rgba(46, 213, 115, 0.4);
          }

          .card-glow-group:hover .card-glow {
            box-shadow: 0 0 40px 10px #34d399, 0 0 80px 20px #10b981;
          }
          
          .ai-card-glow {
            box-shadow: 0 0 20px 5px rgba(139, 92, 246, 0.3);
            transition: box-shadow 0.5s ease;
          }
          
          .ai-card-glow:hover {
            box-shadow: 0 0 40px 10px rgba(139, 92, 246, 0.6), 0 0 80px 20px rgba(79, 70, 229, 0.4);
          }

          .text-glow-hover:hover {
            text-shadow: 0 0 12px #fff, 0 0 24px #a21caf, 0 0 48px #c026d3;
            color: #fff;
          }
        `}</style>
      </section>
      <Features />
    </Layout>
  );
}

export default Home;