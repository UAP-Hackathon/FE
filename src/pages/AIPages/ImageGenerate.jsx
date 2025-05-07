import Layout from "../../components/layout/Layout";
import React, { useState } from "react";
//eslint-disable-next-line
import { motion } from "framer-motion";
import { Loader } from "lucide-react";


function ImageGenerate() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setImageUrl("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_V1}/api/v1/generate-image`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );
      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50 to-purple-50">
        {/* Header Spacing */}
        <div className="h-20"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Title Section */}
            <div className="text-center mb-8">
              <motion.h1 
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                AI Image Generator
              </motion.h1>
              <motion.p 
                className="mt-4 text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Transform your imagination into stunning visuals with AI
              </motion.p>
            </div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8"
            >
              <div className="space-y-6">
                {/* Input Section */}
                <div className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Describe the image you want to create..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="w-full px-6 py-3 text-gray-700 bg-white/90 border-2 border-gray-200 rounded-xl 
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none
                        placeholder:text-gray-400 shadow-sm"
                    />
                    <motion.button
                      
                      onClick={handleGenerate}
                      disabled={loading}
                      className="mt-4 w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-2 
                        rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 
                        disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:from-blue-600 
                        hover:to-purple-600"
                    >
                      {loading ? (
                        <div className="flex items-center justify-center space-x-2">
                          <Loader className="w-5 h-5 animate-spin" />
                          <span>Creating Magic...</span>
                        </div>
                      ) : (
                        "Generate Image"
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Generated Image Section */}
                {imageUrl && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-8"
                  >
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                      <motion.img
                        src={imageUrl}
                        alt="Generated AI"
                        className="w-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-0 left-0 right-0 p-6 text-white"
                      >
                        <p className="text-sm font-medium opacity-90">
                          "{prompt}"
                        </p>
                      </motion.div>
                    </div>
                    <div className="mt-4 flex justify-center">
                      <motion.a
                        href={imageUrl}
                        download="ai-generated-image.png"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 
                          transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download Image</span>
                      </motion.a>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export default ImageGenerate;
