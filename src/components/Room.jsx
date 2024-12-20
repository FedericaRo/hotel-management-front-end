function Room({ room }) {
  // const room = {
  //     id: 1,
  //     type: "SUITE",
  //     numberOfGuests: 4,
  //     price: 86.99
  //   }
  //   console.log(room)
  //   console.log("ROOM");
  //   console.log(room);

  return (
    <li className="py-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        {/* Icon or Room Image Placeholder */}
        <div className="shrink-0">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900">
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
              />
            </svg>
          </div>
        </div>

        {/* Room Details */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-bold text-gray-900 dark:text-white">
            Room {room.id}
          </p>
          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-800">Type:</span> {room.type}
          </p>
          <p className="truncate text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-gray-800">Guests:</span>{" "}
            {room.numberOfGuests}
          </p>
        </div>

        {/* Room Price */}
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          ${room.price.toFixed(2)}
        </div>
      </div>
    </li>
  );
}

export default Room;

//id type nguests  price
