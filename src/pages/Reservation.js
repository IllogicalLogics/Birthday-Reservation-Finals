import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Reservation = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [partySize, setPartySize] = useState("");
  const [message, setMessage] = useState("");

  const handleReservation = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "reservations"), {
        name,
        date,
        partySize,
      });
      setMessage("Reservation made successfully!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Make a Reservation</h2>
      <form onSubmit={handleReservation}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Party Size"
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
          required
        />
        <button type="submit">Reserve</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Reservation;
