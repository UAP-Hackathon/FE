import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X, Settings, Users, BookOpen, MessageSquare, Video, FileText } from 'lucide-react';
//eslint-disable-next-line
import { motion } from 'framer-motion';

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Login', href: '/login', icon: Users },
    { name: 'Post Job', href: '/postjob', icon: BookOpen },
    { name: 'Match Job', href: '/matchJob', icon: MessageSquare },
    { name: 'Generate Assesment', href: '/genAssesment', icon: Video },
    { name: 'Resume Generator', href: '/resumeGenerator', icon: FileText },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg transition-all duration-200"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-20 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 ease-in-out
          ${isOpen ? 'w-64' : 'w-0 lg:w-64'} overflow-hidden
          bg-gradient-to-b from-gray-50 via-blue-50 to-purple-50
          backdrop-blur-lg shadow-xl border-r border-gray-200`}
      >
        <div className="flex flex-col h-full">
          {/* Logo area */}
          <div className="flex items-center justify-center h-20 bg-white border-b border-gray-100 shadow-sm">
            <motion.h1 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              AI Hub
            </motion.h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={item.href}
                    className={`flex items-center px-4 py-3 text-sm rounded-xl transition-all duration-200 group
                      ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 shadow-sm'
                          : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:translate-x-1'
                      }`}
                  >
                    <Icon className={`w-5 h-5 mr-3 transition-colors duration-200 ${
                      isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'
                    }`} />
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* User profile area */}
          <div className="p-4 border-t border-gray-100 bg-white/80">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-sm">
                <span className="text-sm font-medium text-white">JD</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">John Doe</p>
                <p className="text-xs text-blue-600">john@example.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;