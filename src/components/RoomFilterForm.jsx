import { useState } from "react";
import axios from "axios";

function RoomFilterForm({ onFilter }) {

  const initialFilters = {
    numberOfGuests: "",
    type: "",
    checkInDate: "",
    checkOutDate: "",
  };

  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Handle number of guests increment/decrement
  const handleGuestChange = (delta) => {
    // get the current number of guests in the input filter or set it to 0
    const currentGuests = parseInt(filters.numberOfGuests) || 0;
    // add or subtract 1
    const newGuestCount = currentGuests + delta;

    if (newGuestCount >= 1 && newGuestCount <= 16) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        // set the new number of guests filter
        numberOfGuests: newGuestCount,
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // https://medium.com/@zaitsev1393/best-way-to-remove-empty-values-from-js-objects-ad691bd084b9
    // I get back an object with only the values that are truthy (not null, not undefined, not empty strings, ...)
    const activeFilters = Object.fromEntries(
      // takes an array of key-value pairs and builds an object from them
      Object.entries(filters).filter(([_, value]) => value) // Destructures each entry into a variable _ for the key (which is not used) and value for the value,
      // value is the filter condition that checks if teh value is truthy
    );

    axios
      .post("http://localhost:8080/rooms/filtered", activeFilters)
      .then((response) => {
        onFilter(response.data); // pass filtered rooms back to roomPage (parent)
      })
      .catch((error) => console.log("Error", error));
  };

  // reset filters
  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap items-center gap-4 bg-white p-4 rounded shadow-md"
    >
      {/* Room Type Dropdown */}
      <div className="flex-1">
        <label htmlFor="type" className="sr-only">
          Room Type
        </label>
        <select
          name="type"
          id="type"
          value={filters.type}
          onChange={handleChange}
          className="w-full border-gray-300 rounded p-2"
        >
          <option selected disabled value="">
            Room Type
          </option>
          <option value="CLASSIC">Classic</option>
          <option value="BASIC">Basic</option>
          <option value="SUITE">Suite</option>
          <option value="MODERN">Modern</option>
        </select>
      </div>
      Number of Guests
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => handleGuestChange(-1)}
          className="px-3 py-2 bg-gray-200 rounded-l text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          disabled={filters.numberOfGuests <= 1}
        >
          -
        </button>
        <input
          type="number"
          value={filters.numberOfGuests}
          readOnly
          className="w-16 text-center border-t border-b border-gray-300"
        />
        <button
          type="button"
          onClick={() => handleGuestChange(1)}
          className="px-3 py-2 bg-gray-200 rounded-r text-gray-700 hover:bg-gray-300 disabled:opacity-50"
          disabled={filters.numberOfGuests >= 16}
        >
          +
        </button>
      </div>
      {/* Check-in Date */}
      <div className="flex-1">
        <label htmlFor="checkInDate" className="sr-only">
          Check-in Date
        </label>
        <input
          type="date"
          name="checkInDate"
          id="checkInDate"
          value={filters.checkInDate}
          onChange={handleChange}
          className="w-full border-gray-300 rounded p-2"
        />
      </div>
      {/* Check-out Date */}
      <div className="flex-1">
        <label htmlFor="checkOutDate" className="sr-only">
          Check-out Date
        </label>
        <input
          type="date"
          name="checkOutDate"
          id="checkOutDate"
          value={filters.checkOutDate}
          onChange={handleChange}
          className="w-full border-gray-300 rounded p-2"
        />
      </div>
      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Apply
        </button>
      </div>
      {/* Submit Button */}
      <div>
        <button
          type="button"
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          onClick={clearFilters}
        >
          Clear filters
        </button>
      </div>
    </form>
  );
}

export default RoomFilterForm;
