import React from "react";
import PropTypes from "prop-types";

function EventList({ events, onEventClick }) {
  const getEventStatus = (event) => {
    const now = new Date();
    const startDate = new Date(event.start.dateTime || event.start.date);
    const endDate = new Date(event.end.dateTime || event.end.date);

    if (endDate < now) {
      return { label: "Completed", className: "bg-[#333333] text-gray-300" };
    } else if (startDate > now) {
      return { label: "Upcoming", className: "bg-[#2A2A2A] text-orange-300" };
    } else {
      return { label: "Ongoing", className: "bg-[#2A2A2A] text-orange-500" };
    }
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">No events found.</div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[#333333]">
        <thead className="bg-[#2A2A2A]">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Start Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              End Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-[#212121] divide-y divide-[#333333]">
          {events.map((event) => {
            const status = getEventStatus(event);
            return (
              <tr key={event.id} className="hover:bg-[#2A2A2A]">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${status.className}`}
                  >
                    {status.label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-orange-400">
                  {event.summary}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(
                    event.start.dateTime || event.start.date
                  ).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {new Date(
                    event.end.dateTime || event.end.date
                  ).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => onEventClick(event)}
                    className="text-orange-500 hover:text-orange-600"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEventClick: PropTypes.func.isRequired,
};

export default EventList;
