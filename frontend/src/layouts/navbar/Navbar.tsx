import React, { useState, useEffect } from 'react';

interface User {
  userId: string;
  username: string;
  email: string;
}

function NavBar() {
  const [user, setUser] = useState<User | null>(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');

    if (userId && username && email) {
      setUser({ userId, username, email });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    setUser(null);
    setIsProfileDropdownOpen(false);
    window.location.href = '/';
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <header className="bg-[#1c4e80] shadow-lg sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Left Section: Logo and Brand Name */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#e8f0e5] rounded-lg flex items-center justify-center">
                <span className="text-[#1c4e80] font-bold text-lg">J</span>
              </div>
              <h1 className="text-[#e8f0e5] font-bold text-xl tracking-tight">
                JustToday
              </h1>
            </a>
          </div>

          {/* Center Section: Navigation Links */}
          <div className="flex items-center space-x-8">
            <a
              href="/"
              className="text-[#e8f0e5] hover:text-[#99cceb] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Home
            </a>
            {user && (
              <>
                <a
                  href="/dashboard"
                  className="text-[#e8f0e5] hover:text-[#99cceb] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Dashboard
                </a>
                <a
                  href="/journal"
                  className="text-[#e8f0e5] hover:text-[#99cceb] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Journal
                </a>
              </>
            )}
            <a
              href="/about"
              className="text-[#e8f0e5] hover:text-[#99cceb] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              About Us
            </a>
          </div>

          {/* Right Section: Authentication */}
          <div className="flex items-center">
            {user ? (
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 text-[#e8f0e5] hover:text-[#99cceb] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  <div className="w-8 h-8 bg-[#99cceb] rounded-full flex items-center justify-center">
                    <span className="text-[#1c4e80] font-semibold text-sm">
                      {user.username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span>{user.username}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isProfileDropdownOpen ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      <div className="font-medium">{user.username}</div>
                      <div className="text-gray-500">{user.email}</div>
                    </div>
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile Settings
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="bg-[#99cceb] text-[#1c4e80] hover:bg-[#e8f0e5] px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Login
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
