import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

function RoomDetailsPage() {
  const { roomId } = useParams(); // Get roomId from the URL (React router)
  const [roomDetails, setRoomDetails] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch room details
    axios
      .get(`http://localhost:8080/rooms/${roomId}`)
      .then((response) => setRoomDetails(response.data))
      .catch((error) => console.error("Error fetching room details:", error));

    // Fetch bookings for the room
    axios
      .get(`http://localhost:8080/bookings/room/${roomId}`)
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, [roomId]); // use effect triggers when the component renders and when roomId changes

  if (!roomDetails) {
    return <div>Loading room details...</div>;
  }

  return (
    // <div className="flex p-4 space-x-8">
    <div className="flex flex-col lg:flex-row max-w-7xl mx-auto p-4 space-y-4 lg:space-y-0 lg:space-x-6">
      {/* Room Details - 1/3 of the page */}
      <div className="bg-white shadow-md rounded-lg p-6 lg:w-1/3 lg:sticky lg:top-4">
        <h2 className="text-xl font-bold mb-4">Room Details</h2>
        <p>
          <strong>Room ID:</strong> {roomId}
        </p>
        <p>
          <strong>Type:</strong> {roomDetails.type}
        </p>
        <p>
          <strong>Max Guests:</strong> {roomDetails.numberOfGuests}
        </p>
        <p>
          <strong>Price per night:</strong> ${roomDetails.price}
        </p>
      </div>

      {/* Bookings - 2/3 of the page */}
      <div className="bg-white shadow-md rounded-lg p-6 flex-1">
        <h2 className="text-xl font-bold mb-4">Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings reserved for this room.</p>
        ) : (
          <ul className="space-y-4">
            {bookings
              .sort((a, b) => new Date(a.checkInDate) - new Date(b.checkInDate))
              .map((booking) => (
                <li key={booking.id} className="p-4 border rounded">
                  <p>
                    <strong>Check-in:</strong>{" "}
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Check-out:</strong>{" "}
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Guests:</strong> {booking.numberOfGuests}
                  </p>
                  <p>
                    <strong>Reserved Parking:</strong>{" "}
                    {booking.reservedParking ? "Yes" : "No"}
                  </p>
                  {booking.reservedParking && (
                    <p>
                      <strong>Parking Code:</strong> {booking.parkingCode}
                    </p>
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default RoomDetailsPage;
