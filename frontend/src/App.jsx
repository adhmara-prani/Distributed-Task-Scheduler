import { useState, useEffect } from "react";
import DriverDashboard from "./pages/DriverDashboard.jsx"; // Adjust path if needed

function App() {
  const [driverId, setDriverId] = useState(
    localStorage.getItem("userId") || ""
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("userId")
  );

  const handleLogin = (e) => {
    e.preventDefault();
    if (!driverId) return;

    // Save to local storage so DriverDashboard can read it
    localStorage.setItem("userId", driverId);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setDriverId("");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        // --- 1. SIMPLE LOGIN SCREEN ---
        <div style={styles.container}>
          <h1>Ride App Simulation 🚖</h1>
          <div style={styles.card}>
            <h2>Driver Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Enter Driver ID (e.g., 101)"
                value={driverId}
                onChange={(e) => setDriverId(e.target.value)}
                style={styles.input}
              />
              <button type="submit" style={styles.button}>
                Start Driving
              </button>
            </form>
          </div>
        </div>
      ) : (
        // --- 2. THE DASHBOARD ---
        <div>
          <div style={styles.header}>
            <span>
              Logged in as: <strong>{driverId}</strong>
            </span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </div>
          <DriverDashboard />
        </div>
      )}
    </div>
  );
}

// Simple styles for the demo
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  card: {
    padding: "2rem",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
    width: "200px",
    display: "block",
    margin: "10px auto",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  header: {
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoutBtn: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    cursor: "pointer",
    borderRadius: "3px",
  },
};

export default App;
