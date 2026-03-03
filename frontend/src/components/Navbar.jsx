import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import axios from "../axiosConfig";
import "../index.css";

function Navbar({ role }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await axios.post("/auth/logout");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2 className="logo">CONSOLE</h2>

        {role === "admin" && (
          <NavLink to="/dashboard/admin" className="nav-link">
            Admin Panel
          </NavLink>
        )}

        {role === "manager" && (
          <NavLink to="/dashboard/manager" className="nav-link">
            Manager Panel
          </NavLink>
        )}

        {role === "employee" && (
          <NavLink to="/dashboard/employee" className="nav-link">
            My Board
          </NavLink>
        )}
      </div>

      <div className="navbar-right">
        {user && (
          <span className="user-info">
            👤 {user.name} ({user.role})
          </span>
        )}

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;