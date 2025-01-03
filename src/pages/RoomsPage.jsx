import RoomList from "../components/RoomList";
import RoomForm from "../components/RoomForm";
import RoomFilterForm from "../components/RoomFilterForm";

import { useState, useEffect } from "react";

function RoomsPage() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/rooms")
      .then((response) => response.json())
      .then((roomList) => setRooms(roomList.reverse()))
      .catch((error) => console.log(error));
  }, []);

  const addRoom = (newRoom) => {
    setRooms((rooms) => [newRoom, ...rooms]);
  };

  const filterRooms = (filteredRooms) => setRooms(filteredRooms.reverse())

  return (
    <>
      <RoomForm onRoomCreated={addRoom}></RoomForm>
      <RoomFilterForm onFilter={filterRooms}></RoomFilterForm>
      <RoomList rooms={rooms}></RoomList>
    </>
  );
}

export default RoomsPage;
