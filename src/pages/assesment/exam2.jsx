"use client";

import { useState, useEffect } from 'react';
import * as Babel from '@babel/standalone';
import { useNavigate } from 'react-router-dom';

// Exam-like React IDE with live preview
export default function ReactIDE() {
  const navigate = useNavigate();
  const [code, setCode] = useState(`// Write your React component here
function StringComponent() {
  // Your implementation here
  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
}

// Render your component
render(<StringComponent />);`);

  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isSubmitted]);

  // Format time
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Compile and run the React code
  const compileAndRun = () => {
    try {
      setError(null);
      
      const fullCode = `
        const {useState, useEffect, useRef} = React;
        const render = (component) => {
          try {
            ReactDOM.render(component, document.getElementById('preview'));
          } catch (err) {
            console.error('Render error:', err);
          }
        };
        ${code}
      `;
      
      const transformedCode = Babel.transform(fullCode, {
        presets: ['react', 'env']
      }).code;
      
      const executeCode = new Function('React', 'ReactDOM', transformedCode);
      
      const frameHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>React Preview</title>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.development.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.development.js"></script>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
          <style>body { margin: 0; padding: 0; }</style>
        </head>
        <body>
          <div id="preview"></div>
          <script>
            window.onload = function() {
              try {
                (${executeCode.toString()})(React, ReactDOM);
              } catch (err) {
                document.getElementById('preview').innerHTML = '<div class="p-4 text-red-500">'+err.message+'</div>';
                console.error('Execution error:', err);
              }
            };
          </script>
        </body>
        </html>
      `;
      
      setOutput(frameHtml);
    } catch (err) {
      setError(err.message);
      console.error('Compilation error:', err);
    }
  };

  // Update preview when code changes (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      compileAndRun();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [code]);

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Here you would typically send the code to your backend
    console.log('Submitted code:', code);
    // Navigate to home page after submission
    navigate('/');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">React Component Exam</h1>
          <div className="flex items-center space-x-4">
            <div className="text-lg font-semibold text-gray-700">
              Time Remaining: {formatTime(timeLeft)}
            </div>
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded disabled:opacity-50"
              onClick={handleSubmit}
              disabled={isSubmitted}
            >
              {isSubmitted ? 'Submitted' : 'Submit'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Question Panel */}
        <div className="w-full md:w-1/4 p-4 bg-white border-r">
          <h2 className="text-xl font-bold mb-4">Task Description</h2>
          <div className="prose">
            <h3 className="font-semibold">Build a Custom React Component</h3>
            <p className="text-gray-700">Create a string component with React that demonstrates your UI development skills.</p>
            
            <h4 className="font-semibold mt-4">Requirements:</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Clean, reusable component structure</li>
              <li>Proper state management</li>
              <li>Responsive design</li>
              <li>Accessible (follows WCAG guidelines)</li>
              <li>Well-documented code</li>
            </ul>

            <h4 className="font-semibold mt-4">Bonus Features:</h4>
            <ul className="list-disc pl-5 text-gray-700">
              <li>Unit tests</li>
              <li>Storybook documentation</li>
              <li>Theme customization</li>
              <li>Dark mode / theme switching capability</li>
            </ul>
          </div>
        </div>

        {/* Editor Panel */}
        <div className="w-full md:w-1/2 p-4">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Code Editor</h2>
            <button 
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
              onClick={compileAndRun}
            >
              Run
            </button>
          </div>
          
          <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
            <textarea
              className="w-full h-96 p-4 font-mono text-gray-300 bg-gray-800 focus:outline-none"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isSubmitted}
            />
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>
        
        {/* Preview Panel */}
        <div className="w-full md:w-1/4 p-4">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          <div className="bg-white rounded-lg shadow h-96 overflow-hidden">
            {output ? (
              <iframe
                title="React Preview"
                className="w-full h-full border-0"
                srcDoc={output}
                sandbox="allow-scripts"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Preview will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
