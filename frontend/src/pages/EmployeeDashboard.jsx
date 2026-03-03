import React from "react";
import Navbar from "../components/Navbar";

function EmployeeDashboard() {
  return (
    <div>
      <Navbar role="employee" />

      <div style={{ padding: "20px" }}>
        <h2>Employee Workspace</h2>

        <div>
          <h3>My Tasks</h3>
          <p>To-Do: --</p>
          <p>In Progress: --</p>
          <p>Completed: --</p>
        </div>

        <div>
          <h3>Performance</h3>
          <p>Tasks Completed This Week: --</p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;