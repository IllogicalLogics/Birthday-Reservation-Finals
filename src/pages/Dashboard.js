import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import "../styles.css"; // Import the global styles

const Dashboard = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const reservationsSnapshot = await getDocs(collection(db, "reservations"));
      const reservationsList = reservationsSnapshot.docs.map(doc => doc.data());
      setReservations(reservationsList);
    };
    fetchReservations();
  }, []);

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <h3>Reservations</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Name</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Date</th>
            <th style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{reservation.name}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{reservation.date}</td>
              <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{reservation.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
