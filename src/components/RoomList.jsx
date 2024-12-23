import Room from "./Room";
import { Card } from "flowbite-react";

function RoomList({ rooms }) {

  console.log(rooms)
  return (
    <Card className="max-w-sm">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          All Rooms
        </h5>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 text-left">
        {rooms.length > 0 ? (
        rooms.map((room) => <Room key={room.id} room={room} />)
      ) : (
        <p>No rooms available.</p>
      )}
        </ul>
      </div>
    </Card>
  );
}
export default RoomList;
