import { useEffect, useState } from "react";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import axios from "../axiosConfig";
import "../index.css";

function Navbar({ role }) {

  const navigate = useNavigate();
  const location = useLocation();

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

  // smooth scroll
  const scrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="navbar">

      {/* LEFT SIDE */}
      <div className="navbar-left">

        <h2 className="logo">OPERIX</h2>

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


      {/* ADMIN TABS */}
      {role === "admin" && location.pathname.includes("/dashboard/admin") && (

        <div className="navbar-tabs">

          <button onClick={() => scrollTo("overview")}>
            Overview
          </button>

          <button onClick={() => scrollTo("payroll")}>
            Payroll
          </button>

          <button onClick={() => scrollTo("audit")}>
            Audit Logs
          </button>

          <button onClick={() => scrollTo("cash")}>
            Cash Prediction
          </button>

        </div>

      )}

      {/* EMPLOYEE TABS */}
      {role === "employee" && location.pathname.includes("/dashboard/employee") && (

        <div className="navbar-tabs">

          <button onClick={() => scrollTo("kanban")}>
            Kanban Board
          </button>

          <button onClick={() => scrollTo("inbox")}>
            Inbox
          </button>

          <button onClick={() => scrollTo("salary-slips")}>
            Salary Slips
          </button>
          
        </div>

      )}


      {/* RIGHT SIDE */}
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