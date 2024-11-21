import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "../styles.css"; // Import the global styles

const Home = () => {
  const [user, setUser] = useState(null);  // To store user information
  const [isStaff, setIsStaff] = useState(false);  // To check if user is staff
  const [loading, setLoading] = useState(true); // To show loading until data is fetched

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Get user's role from Firestore
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        const userData = userDoc.data();

        // Set user and role
        setUser(currentUser);
        setIsStaff(userData.role === "staff");
      } else {
        setUser(null);
        setIsStaff(false);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show loading while we fetch data
  }

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to the Birthday Party Reservation Portal!</h1>
        <p>
          Make your next birthday celebration memorable! Browse, book, and reserve
          the best birthday party spots right here.
        </p>
      </div>

      <div className="action-cards">
        <div className="card">
          <h3>Make a Reservation</h3>
          <p>Reserve your spot today for an unforgettable birthday party!</p>
          <Link to="/reserve">
            <button className="action-btn">Make Reservation</button>
          </Link>
        </div>

        <div className="card">
          <h3>Login</h3>
          <p>If you already have an account, log in to manage your reservations.</p>
          <Link to="/login">
            <button className="action-btn">Login</button>
          </Link>
        </div>

        <div className="card">
          <h3>Register</h3>
          <p>Don't have an account? Sign up and join the fun!</p>
          <Link to="/register">
            <button className="action-btn">Register</button>
          </Link>
        </div>
      </div>

      {user && isStaff && (
        <div className="staff-dashboard-btn">
          <Link to="/dashboard">
            <button className="action-btn">Go to Dashboard</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
