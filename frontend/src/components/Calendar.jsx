import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DateFilter from "./DateFilter";
import EventList from "./EventList";
import EventDetails from "./EventDetails";
import PropTypes from "prop-types";

function Calendar({ setIsAuthenticated }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigate = useNavigate();

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams();
      if (selectedDate) queryParams.append("date", selectedDate.toISOString());
      if (searchQuery) queryParams.append("searchQuery", searchQuery);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/calendar/events?${queryParams}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          setIsAuthenticated(false);
          navigate("/");
          return;
        }
        throw new Error(errorData.message || "Failed to fetch events");
      }

      const data = await response.json();
      setEvents(data.events || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [selectedDate, searchQuery, setIsAuthenticated, navigate]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleReauthorize = async () => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      setError("Failed to reauthorize. Please try logging in again.");
    }
  };

  const handleDateClear = () => setSelectedDate(null);

  const handleEventClick = (event) => setSelectedEvent(event);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="bg-[#2A2A2A] rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-orange-500">Your Calendar Events</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <DateFilter
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onClear={handleDateClear}
          />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Search Events
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, description..."
              className="block w-full px-3 py-2 border border-[#333333] bg-[#212121] text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Error and Loading */}
        {error && (
          <div className="bg-[#332020] border border-[#4A2828] rounded-md p-4 mb-4">
            <p className="text-red-400">{error}</p>
            {error.includes("authorized") && (
              <button
                onClick={handleReauthorize}
                className="mt-2 px-4 py-2 bg-orange-500 text-[#212121] rounded hover:bg-orange-600 transition-colors"
              >
                Reauthorize Access
              </button>
            )}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <EventList events={events} onEventClick={handleEventClick} />
        )}
      </div>

      {/* Event Details */}
      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

Calendar.propTypes = {
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default Calendar;
