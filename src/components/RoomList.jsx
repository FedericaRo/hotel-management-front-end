import { useEffect, useState } from "react";
import Room from "./Room"
import { Card } from "flowbite-react";

function RoomList(){

    // const roomList = [
    //     {
    //       "id": 1,
    //       "type": "SUITE",
    //       "numberOfGuests": 4,
    //       "price": 86.99
    //     },
    //     {
    //       "id": 2,
    //       "type": "CLASSIC",
    //       "numberOfGuests": 2,
    //       "price": 45.1
    //     },
    //     {
    //       "id": 3,
    //       "type": "MODERN",
    //       "numberOfGuests": 5,
    //       "price": 50.89
    //     }
    // ]
    // console.log("ROOM LIST")
    // console.log(roomList)

    const[roomList, setRoomList] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/rooms').then((response) => response.json()).then((roomList) => setRoomList(roomList))
    }, [])

    console.log(roomList)

    return (

        <Card className="max-w-sm">
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">All Rooms</h5>
        </div>
        <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700 text-left">
          {roomList.map((room) => (
            <Room key={room.id} room={room}></Room>
          ))}
        </ul>
      </div>
    </Card>


        
        // <Room roomList={roomList}/>

    )

}
export default RoomList;