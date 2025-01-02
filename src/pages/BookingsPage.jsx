import axios from "axios";
import { useState, useEffect } from "react";

function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
  axios
    .get("http://localhost:8080/bookings")
    .then(function (response) {
      console.log(response);
      setBookings(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {bookings.length === 0 ? (
        <div className="text-center">Nessuna prenotazione disponibile.</div>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking.id}
            className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="px-6 py-4">
              <h2 className="text-xl font-bold mb-2">
                Prenotazione #{booking.id}
              </h2>
              <ul>
                <li className="mb-2">
                  <strong>Check-in:</strong>{" "}
                  {new Date(booking.checkInDate).toLocaleDateString()}
                </li>
                <li className="mb-2">
                  <strong>Check-out:</strong>{" "}
                  {new Date(booking.checkOutDate).toLocaleDateString()}
                </li>
                <li className="mb-2">
                  <strong>Ospiti:</strong> {booking.numberOfGuests}
                </li>
                <li className="mb-2">
                  <strong>Tipo di stanza:</strong> {booking.roomType}
                </li>
                <li className="mb-2">
                  <strong>ID stanza:</strong> {booking.roomId}
                </li>
                <li className="mb-2">
                  <strong>Parcheggio riservato:</strong>{" "}
                  {booking.reservedParking ? "Sì" : "No"}
                </li>
                {booking.reservedParking && (
                  <li className="mb-2">
                    <strong>Codice parcheggio:</strong> {booking.parkingCode}
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default BookingsPage;
