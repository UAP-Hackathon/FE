import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, User, Settings, LogOut, LogIn } from 'lucide-react';
import { useAuth } from '../../context/Auth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
// eslint-disable-next-line
import { motion, AnimatePresence } from 'framer-motion';

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdown when route changes
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuth({
      user: null
    });
    navigate('/login');
    setIsDropdownOpen(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm text-gray-800 h-20 fixed top-0 right-0 left-0 z-40 pl-64">
      <div className="flex items-center justify-between h-full px-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-blue-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl bg-gray-50/80 text-gray-800 placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Login Button (only shown when not logged in) */}
        {!auth?.user ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLoginClick}
            className="flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
          >
            <LogIn className="h-5 w-5 mr-2" />
            Login
          </motion.button>
        ) : (
          /* Profile Section (only shown when logged in) */
          <div className="relative ml-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-3 focus:outline-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-sm">
                {auth?.user?.name ? (
                  <span className="text-sm font-medium text-white">
                    {auth.user.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User className="h-5 w-5 text-white" />
                )}
              </div>
              <div className="hidden md:block">
                <div className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                  {auth?.user?.name || 'Guest User'}
                </div>
                <div className="text-xs text-blue-600">
                  {auth?.user?.email || 'guest@example.com'}
                </div>
              </div>
              <ChevronDown className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200" />
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 rounded-xl shadow-lg bg-white ring-1 ring-black/5 z-50 overflow-hidden"
                  >
                    <div className="py-1" role="menu">
                      <Link
                        to="/adminProfile"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                        role="menuitem"
                      >
                        <User className="mr-3 h-5 w-5" />
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                        role="menuitem"
                      >
                        <Settings className="mr-3 h-5 w-5" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                        role="menuitem"
                      >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;