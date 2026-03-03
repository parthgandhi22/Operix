import React from "react";
import Navbar from "../components/Navbar";

function ManagerDashboard() {
  return (
    <div>
      <Navbar role="manager" />

      <div style={{ padding: "20px" }}>
        <h2>Manager Panel</h2>

        <div>
          <h3>Team Overview</h3>
          <p>Total Team Members: --</p>
          <p>Active Tasks: --</p>
          <p>Overdue Tasks: --</p>
        </div>

        <div>
          <h3>Task Management</h3>
          <button>Create Task</button>
          <button>View Team Tasks</button>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;