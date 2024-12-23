import { useState, useEffect } from "react";
import { Button, Select, Label, TextInput } from "flowbite-react";
import axios from "axios";

// https://dev.to/ajones_codes/a-better-guide-to-forms-in-react-47f0
function RoomForm({ onRoomCreated }) {
  const initialFormData = {
    type: "",
    numberOfGuests: "",
    price: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((values) => ({ ...values, [name]: value }));
  };

  // submit with axios
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:8080/rooms", formData)
      .then(function (response) {
        console.log(response);
        onRoomCreated(response.data); // pass the created Room to app
        setCreatedRoom(response.data);
        setFormData(initialFormData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("Updated form data:", formData);
  }, [formData]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex max-w-md flex-col gap-4 py-4"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="guests" value="Number of guests" />
          </div>
          <TextInput
            id="guests"
            name="numberOfGuests"
            value={formData.numberOfGuests}
            type="number"
            placeholder="Number of guests"
            required
            shadow
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="type" value="Room type" />
          </div>
          <Select
            id="type"
            name="type"
            required
            value={formData.type}
            onChange={handleChange}
          >
            <option selected disabled value="">
              Select a room type
            </option>
            <option>BASIC</option>
            <option>CLASSIC</option>
            <option>MODERN</option>
            <option>SUITE</option>
          </Select>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" name="price" value="Price" />
          </div>
          <TextInput
            id="price"
            name="price"
            value={formData.price}
            type="number"
            placeholder="$00.00"
            required
            shadow
            onChange={handleChange}
          />
        </div>
        <Button type="submit">Create new room</Button>
      </form>
    </>
  );
}

export default RoomForm;

// submit with fetch
// const handleSubmit = (event) => {
//   event.preventDefault();
//   console.log(formData);

//   const url = "http://localhost:8080/rooms";
//   const options = {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json;charset=UTF-8",
//     },
//     body: JSON.stringify(formData),
//   };

//   fetch(url, options)
//     .then((response) => response.json()) // Use .json() correctly
//     .then((data) => {
//       setCreatedRoom(data); // Set the created room with the response data
//       setFormData(initialFormData); // Reset form data after successful submission
//     })
//     .catch((error) => {
//       console.log("Error:", error); // Log error for debugging
//     });
// };
