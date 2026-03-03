import React from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

function Navbar({ role }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("/auth/logout");
    navigate("/");
  };

  return (
    <div style={{ padding: "15px", background: "#222", color: "white" }}>
      <span style={{ marginRight: "20px" }}>
        CONSOLE Dashboard - {role.toUpperCase()}
      </span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;