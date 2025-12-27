import { Routes, Route, Navigate } from "react-router-dom";
import DriverDashboard from "./pages/DriverDashboard.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import LandingPage from "./pages/LandingPage.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/driver-dashboard" element={<DriverDashboard />} />

        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>
    </div>
  );
}

export default App;

/*
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
  */
