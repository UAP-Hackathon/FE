import React, { useEffect, useRef } from 'react';
import Layout from '../../components/layout/Layout';
//eslint-disable-next-line
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let hue = 220; // Blue hue
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
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
    canvas.addEventListener('mousemove', createParticles);

    const animate = () => {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
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
              ctx.strokeStyle = `hsla(${particle.initialHue}, 80%, 60%, ${(1 - distance / 100) * 0.2})`;
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
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', createParticles);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const features = [
    {
      title: "AI Image Generation",
      description: "Create stunning images from text descriptions",
      icon: "🎨",
      path: "/image-generate"
    },
    {
      title: "Code Assistant",
      description: "Get help with your coding tasks",
      icon: "💻",
      path: "/coding-based"
    },
    {
      title: "Smart Analytics",
      description: "Analyze data with AI precision",
      icon: "📊",
      path: "/analytics"
    }
  ];

  return (
    <Layout>
      <div className="relative min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-purple-50 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />
        <div className="relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
          >
            {/* Hero Section */}
            <motion.div 
              variants={itemVariants} 
              className="text-center mb-12 sm:mb-16 lg:mb-20 max-w-4xl mx-auto"
            >
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: '200% auto' }}
              >
                Welcome to AI Hub
              </motion.h1>
              <p className="text-base sm:text-lg text-gray-600 mb-8 px-4">
                Explore the power of artificial intelligence with our suite of advanced tools
              </p>
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8 sm:mb-12">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-75"
                />
                <motion.div
                  animate={{
                    rotate: [360, 0],
                    scale: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-2 rounded-full border-4 border-dashed border-white opacity-50"
                />
              </div>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '0 8px 20px rgba(59, 130, 246, 0.1)'
                  }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-sm transition-all duration-300 border border-gray-100 group hover:border-blue-100"
                >
                  <Link to={feature.path} className="block">
                    <motion.div 
                      className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300"
                      animate={{
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom Animation */}
            <motion.div 
              className="flex justify-center space-x-4"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <motion.div 
                className="w-3 h-3 rounded-full bg-blue-500"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0,
                }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-purple-500"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.3,
                }}
              />
              <motion.div 
                className="w-3 h-3 rounded-full bg-blue-400"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: 0.6,
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
