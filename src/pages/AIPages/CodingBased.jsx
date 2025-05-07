import React from 'react'
import { useState } from 'react'
import Layout from '../../components/layout/Layout';
import { MessageSquare, Loader, Sparkles, Code2, Send } from 'lucide-react';
//eslint-disable-next-line
import { motion } from "framer-motion";

function CodingBased() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!input.trim()) return; // prevent empty

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_API_V1}/api/v1/generate-text`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: input }),
      });

      const data = await res.json();
      setOutput(data.output);
    } catch (error) {
      console.error('Error generating text:', error);
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
                AI Code Assistant
                <Code2 className="w-8 h-8 inline-block text-purple-500" />
              </h1>
              <p className="text-gray-600">
                Your intelligent coding companion. Ask anything about programming!
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
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  <label className="text-sm font-medium">Ask your question</label>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full h-32 p-4 text-gray-700 bg-white/90 border-2 border-gray-200 rounded-xl 
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 
                    outline-none resize-none placeholder:text-gray-400 shadow-sm"
                  placeholder="e.g., How do I implement a binary search tree in JavaScript?"
                />
              </div>

              {/* Button */}
              <motion.button
                onClick={handleGenerate}
                disabled={loading || !input.trim()}
                className={`w-full mt-4 py-2 rounded-xl font-medium text-white flex items-center justify-center gap-2
                  transition-all duration-200 cursor-pointer
                  ${loading || !input.trim() 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:shadow-lg'
                  }`}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Processing your request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Generate Response</span>
                  </>
                )}
              </motion.button>

              {/* Output Section */}
              {output && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 space-y-4"
                >
                  <div className="h-px bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200" />
                  <div className="rounded-xl bg-gradient-to-r from-blue-50/50 to-purple-50/50 p-6 border border-blue-100">
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-blue-500" />
                      <h2 className="text-sm font-semibold text-gray-800">AI Response</h2>
                    </div>
                    <motion.div 
                      className="prose prose-blue max-w-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{output}</p>
                    </motion.div>
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

export default CodingBased;