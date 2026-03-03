import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "../axiosConfig";
import "../index.css";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  // ===============================
  // Fetch All Users
  // ===============================
  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users/all");
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // Fetch All Tasks
  // ===============================
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks/all");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  // ===============================
  // Delete Task
  // ===============================
  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/tasks/delete/${taskId}`);

      // Optimistic UI update
      setTasks((prev) =>
        prev.filter((task) => task._id !== taskId)
      );
    } catch (err) {
      console.error(err);
      alert("Error deleting task");
    }
  };

  const totalManagers = users.filter(u => u.role === "manager").length;
  const totalEmployees = users.filter(u => u.role === "employee").length;
  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const overdueTasks = tasks.filter(
    t =>
      t.deadline &&
      new Date(t.deadline) < new Date() &&
      t.status !== "Completed"
  ).length;

  return (
    <>
      <Navbar role="admin" />

      <div className="dashboard-container">
        <h1>Admin Control Panel</h1>

        {/* ===== Organization Stats ===== */}
        <div className="stats-grid">
          <div className="card">👥 Total Users: {users.length}</div>
          <div className="card">🧑‍💼 Managers: {totalManagers}</div>
          <div className="card">👨‍💻 Employees: {totalEmployees}</div>
          <div className="card">📋 Total Tasks: {tasks.length}</div>
          <div className="card">✅ Completed: {completedTasks}</div>
          <div className="card">⚠️ Overdue: {overdueTasks}</div>
        </div>

        {/* ===== Users Section ===== */}
        <div className="section" style={{ marginTop: "30px" }}>
          <h2>All Users</h2>

          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            users.map(user => (
              <div key={user._id} className="task-row">
                <span>{user.name}</span>
                <span>{user.email}</span>
                <span className="badge">{user.role}</span>
              </div>
            ))
          )}
        </div>

        {/* ===== Tasks Section ===== */}
        <div className="section" style={{ marginTop: "30px" }}>
          <h2>All Tasks</h2>

          {tasks.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
            tasks.map(task => {
              const statusClass = getStatusClass(task.status);

              return (
                <div
                  key={task._id}
                  className={`admin-task-card ${statusClass}`}
                >
                  {/* Header */}
                  <div className="admin-card-header">
                    <h3>{task.title}</h3>

                    <button
                      className="delete-icon-btn"
                      onClick={() => handleDelete(task._id)}
                    >
                      ✕
                    </button>
                  </div>

                  {/* Body */}
                  <div className="admin-task-body">

                    <div className="task-meta">
                      <span>👤 {task.assignedTo?.name}</span>
                      <span>🧑‍💼 {task.assignedBy?.name}</span>
                    </div>

                    <div className="task-footer">
                      <span className="deadline">
                        📅 {
                          task.deadline
                            ? new Date(task.deadline).toLocaleDateString()
                            : "No Deadline"
                        }
                      </span>

                      <span className={`status-pill ${statusClass}`}>
                        {task.status}
                      </span>
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

function getStatusClass(status) {
  if (status === "To Do") return "todo";
  if (status === "In Progress") return "inprogress";
  if (status === "Completed") return "completed";
  return "";
}

export default AdminDashboard;