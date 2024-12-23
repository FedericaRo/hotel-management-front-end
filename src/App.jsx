import "./App.css";
// import RoomList from "./components/RoomList";
// import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RoomsPage from "./pages/RoomsPage";
import Layout from "./components/Layout";
import BookingsPage from "./pages/BookingsPage";

function App() {
  // const [roomList, setRoomList] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8080/rooms")
  //     .then((response) => response.json())
  //     .then((roomList) => setRoomList(roomList.reverse()))
  //     .catch((error) => console.log(error));
  // }, []);

  // const addRoom = (newRoom) => {
  //   setRoomList((rooms) => [newRoom, ...rooms]);
  // };

  return (
    <>
      <BrowserRouter>
      {/* <Layout></Layout> */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<RoomsPage />} />
            <Route path="rooms" element={<RoomsPage />} />
            <Route path="bookings" element={<BookingsPage />} />
            {/* <Route path="contact" element={<Ro />} />
          <Route path="*" element={<NoPage />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
    // <RoomsPage/>
  );
}

export default App;
