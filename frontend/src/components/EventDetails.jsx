import React from "react";
import PropTypes from "prop-types";

function EventDetails({ event, onClose }) {
  const renderLocation = (location) => {
    if (!location) {
      return <p className="text-gray-300">N/A</p>;
    }
    return (
      <div>
        <p className="text-gray-300 mb-2">{location}</p>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            location
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-500 hover:text-orange-600 inline-flex items-center"
        >
          View on Maps
          <svg
            className="ml-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
      <div className="bg-[#2A2A2A] rounded-lg shadow-xl max-w-2xl w-full">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-orange-500">
              {event.summary}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-orange-500"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-medium text-orange-400 mb-2">
                Description
              </h3>
              <div className="bg-[#212121] rounded-lg p-4">
                <p className="text-gray-300 whitespace-pre-wrap">
                  {event.description || "N/A"}
                </p>
              </div>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-lg font-medium text-orange-400 mb-2">
                Location
              </h3>
              <div className="bg-[#212121] rounded-lg p-4">
                {renderLocation(event.location)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

EventDetails.propTypes = {
  event: PropTypes.shape({
    summary: PropTypes.string.isRequired,
    description: PropTypes.string,
    location: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EventDetails;
