import { useState, useEffect } from 'react';
import * as Babel from '@babel/standalone';

// Simple React IDE with live preview
export default function ReactIDE() {
  const [code, setCode] = useState(`// Write your React code here
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">Hello React!</h1>
      <p className="mb-4">You clicked {count} times</p>
      <button 
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        onClick={() => setCount(count + 1)}
      >
        Click me
      </button>
    </div>
  );
}

// Render your app
render(<App />);`);

  const [output, setOutput] = useState('');
  const [error, setError] = useState(null);

  // Compile and run the React code
  const compileAndRun = () => {
    try {
      // Clear previous errors
      setError(null);
      
      // Add React imports to the user code
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
      
      // Transform JSX to JS
      const transformedCode = Babel.transform(fullCode, {
        presets: ['react', 'env']
      }).code;
      
      // Create a function from the transformed code and execute it
      const executeCode = new Function('React', 'ReactDOM', transformedCode);
      
      // Create an iframe for preview
      const frameHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>React Preview</title>
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

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Editor Panel */}
      <div className="w-full md:w-1/2 p-4">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">React Editor</h2>
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
          />
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}
      </div>
      
      {/* Preview Panel */}
      <div className="w-full md:w-1/2 p-4">
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
  );
}