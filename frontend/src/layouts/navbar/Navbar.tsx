function NavBar() {
  return (
    <header className="bg-[#1c4e80] py-2 px-4 sticky top-0 w-full z-10">
      <div className="max-w-full mx-auto px-8">
        <nav className="flex items-center justify-between">
          {/* Left Section: Logo and Brand Name */}
          <div className="flex items-center">
            <h1 className="text-[#e8f0e5] font-medium text-xl">JustToday</h1>
          </div>

          {/* Right Section: Navigation */}
          <div className="flex items-center">
            <div className="text-[#e8f0e5] font-medium cursor-pointer transition-colors duration-300 hover:text-[#99cceb] text-lg">
              About Us
            </div>
            <div className="text-[#e8f0e5] font-medium cursor-pointer transition-colors duration-300 hover:text-[#99cceb] text-lg">
              login
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
