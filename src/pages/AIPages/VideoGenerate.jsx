import React, { useState } from 'react';
import Layout from '../../components/layout/Layout';
//eslint-disable-next-line
import { motion } from 'framer-motion';
import { Video, Loader, Upload, Film, Play } from 'lucide-react';

function VideoGenerate() {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setVideoUrl('');

    try {
      const res = await fetch(
        `${import.meta.env.VITE_APP_API_V1}/api/v1/generate-video`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        }
      );
      const data = await res.json();
      setVideoUrl(data.videoUrl);
    } catch (error) {
      console.error('Error generating video:', error);
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
            <motion.div 
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2 flex items-center justify-center gap-3">
                AI Video Generator
                <Film className="w-8 h-8 inline-block text-purple-500" />
              </h1>
              <p className="text-gray-600">
                Transform your ideas into captivating videos with AI
              </p>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8"
            >
              {/* Input Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <Video className="w-5 h-5 text-blue-500" />
                  <label className="text-sm font-medium">Describe your video</label>
                </div>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-32 p-4 text-gray-700 bg-white/90 border-2 border-gray-200 rounded-xl 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 
                    outline-none resize-none placeholder:text-gray-400 shadow-sm"
                  placeholder="e.g., A serene mountain landscape with clouds rolling over the peaks at sunset..."
                />
              </div>

              {/* Button */}
              <motion.button
                onClick={handleGenerate}
                disabled={loading || !prompt.trim()}
                className={`w-full mt-4 py-2 rounded-xl font-medium text-white flex items-center justify-center gap-2
                  transition-all duration-200 cursor-pointer
                  ${loading || !prompt.trim() 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg'
                  }`}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Generating your video...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Generate Video</span>
                  </>
                )}
              </motion.button>

              {/* Output Section */}
              {videoUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-4"
                >
                  <div className="h-px bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200" />
                  <div className="rounded-xl bg-gradient-to-r from-blue-50/50 to-purple-50/50 p-6 border border-blue-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Film className="w-5 h-5 text-blue-500" />
                      <h2 className="text-sm font-semibold text-gray-800">Generated Video</h2>
                    </div>
                    <motion.div 
                      className="relative rounded-xl overflow-hidden bg-black aspect-video"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <video 
                        src={videoUrl}
                        controls
                        className="w-full h-full object-cover"
                        poster="/video-placeholder.png"
                      />
                    </motion.div>
                    <div className="mt-4 flex justify-center">
                      <motion.a
                        href={videoUrl}
                        download="ai-generated-video.mp4"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700 
                          transition-colors duration-200"
                      >
                        <Upload className="w-5 h-5" />
                        <span>Download Video</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}

export default VideoGenerate;