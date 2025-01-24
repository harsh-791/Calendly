import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Users, Zap } from "lucide-react";

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/google`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              access_token: tokenResponse.access_token,
            }),
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok) {
          setIsAuthenticated(true);
          navigate("/dashboard");
        } else {
          throw new Error(data.message || "Authentication failed");
        }
      } catch (error) {
        console.error("Authentication error:", error);
      }
    },
    scope: "https://www.googleapis.com/auth/calendar.readonly",
    flow: "implicit",
  });

  const features = [
    {
      icon: <Calendar className="w-8 h-8 text-orange-500" />,
      title: "Smart Calendar Management",
      description:
        "Effortlessly organize and track your events with intuitive controls",
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: "Advanced Event Tracking",
      description: "Powerful search and filtering to find events in seconds",
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "Seamless Synchronization",
      description: "Instant sync with Google Calendar for real-time updates",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#212121] to-[#1E1E1E] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="bg-[#2A2A2A] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          {/* Left Section - Sign In */}
          <div className="w-full md:w-2/5 bg-gradient-to-br from-[#333333] to-[#2A2A2A] p-10 flex flex-col justify-center items-center">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-orange-500 mb-4">
                Calendar Pro
              </h1>
              <p className="text-gray-300 mb-6 text-sm">
                Simplify your scheduling with intelligent calendar management
              </p>

              <button
                onClick={() => login()}
                className="w-full py-3 bg-transparent border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-[#212121] transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>

          {/* Right Section - Features */}
          <div className="w-full md:w-3/5 p-10">
            <h2 className="text-2xl font-semibold text-orange-500 mb-8 text-center">
              Discover Your Calendar Companion
            </h2>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-6 p-5 rounded-xl border border-[#333333] hover:border-orange-500 transition-all duration-300"
                >
                  <div className="bg-[#333333] p-3 rounded-full">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-orange-400 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
