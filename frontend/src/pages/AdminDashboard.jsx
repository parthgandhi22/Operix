import React from "react";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  return (
    <div>
      <Navbar role="admin" />

      <div style={{ padding: "20px" }}>
        <h2>Admin Control Panel</h2>

        <div>
          <h3>Organization Overview</h3>
          <p>Total Employees: --</p>
          <p>Total Managers: --</p>
          <p>Total Tasks: --</p>
        </div>

        <div>
          <h3>System Controls</h3>
          <button>Create Manager</button>
          <button>View Audit Logs</button>
          <button>Reassign Employees</button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;