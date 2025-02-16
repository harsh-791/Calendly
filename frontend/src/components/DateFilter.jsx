import React from 'react';

function DateFilter({ selectedDate, onDateChange, onClear }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        Filter by Date
      </label>
      <div className="flex gap-2">
        <input
          type="date"
          value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
          onChange={(e) => onDateChange(new Date(e.target.value))}
          className="block w-full max-w-xs px-3 py-2 border border-[#333333] bg-[#2A2A2A] text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        />
        {selectedDate && (
          <button
            onClick={onClear}
            className="px-3 py-2 text-sm text-gray-400 hover:text-orange-500"
            title="Clear date filter"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

export default DateFilter;