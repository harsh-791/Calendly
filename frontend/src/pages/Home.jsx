import PropTypes from "prop-types";
import Login from "../components/Login";

function Home({ setIsAuthenticated }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#212121] via-[#1E1E1E] to-[#2A2A2A]">
      {/* Hero Section - Reduced vertical padding */}
      <div className="relative">
        <div className="absolute inset-0 bg-[#212121] opacity-50"></div>
        <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-orange-500 tracking-tight sm:text-5xl">
              Manage Your Calendar
              <span className="block text-orange-600">With Elegance</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
              Connect your Google Calendar and experience a new level of
              productivity with our intuitive interface and powerful scheduling
              features.
            </p>
          </div>
        </div>
      </div>

      {/* Login Section - Adjusted margins */}
      <div>
        <Login setIsAuthenticated={setIsAuthenticated} />
      </div>
    </div>
  );
}

Home.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Home;
