import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie =
      "session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <nav className="bg-[#2A2A2A] shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-orange-500">
              Calendar App
            </span>
          </div>

          {isAuthenticated && (
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 bg-orange-500 text-[#212121] px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
