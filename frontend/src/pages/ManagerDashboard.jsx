import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "../axiosConfig";
import "../index.css";

function ManagerDashboard() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
    priority: "Medium",
  });

  // ===============================
  // Fetch Tasks
  // ===============================
  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks/manager-tasks");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ===============================
  // Fetch Employees
  // ===============================
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/users/employees");
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  // ===============================
  // Handle Input Change
  // ===============================
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  // ===============================
  // Create Task
  // ===============================
  const handleCreateTask = async () => {
    if (!task.title || !task.assignedTo) {
      alert("Title and Employee are required");
      return;
    }

    try {
      await axios.post("/tasks/create", task);

      setTask({
        title: "",
        description: "",
        assignedTo: "",
        deadline: "",
        priority: "Medium",
      });

      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Error creating task");
    }
  };

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

      setTasks((prev) =>
        prev.filter((task) => task._id !== taskId)
      );
    } catch (err) {
      console.error(err);
      alert("Error deleting task");
    }
  };

  const getTasksByStatus = (status) =>
    tasks
      .filter((task) => task.status === status)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const overdueCount = tasks.filter(
    (t) =>
      t.deadline &&
      new Date(t.deadline) < new Date() &&
      t.status !== "Completed"
  ).length;

  return (
    <>
      <Navbar role="manager" />

      <div className="kanban-container">
        <h1>Manager Control Panel</h1>

        {/* ===== Stats ===== */}
        <div className="stats-grid">
          <div className="card">📋 Total Tasks: {tasks.length}</div>
          <div className="card">
            ⏳ In Progress: {
              tasks.filter(t => t.status === "In Progress").length
            }
          </div>
          <div className="card">
            ⚠️ Overdue: {overdueCount}
          </div>
        </div>

        {/* ===== Create Task Section ===== */}
        <div className="section" style={{ marginTop: "30px" }}>
          <h2>Create New Task</h2>

          <input
            name="title"
            placeholder="Task Title"
            value={task.title}
            onChange={handleChange}
          />

          <input
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={handleChange}
          />

          <select
            name="assignedTo"
            value={task.assignedTo}
            onChange={handleChange}
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            name="deadline"
            value={task.deadline}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button onClick={handleCreateTask}>
            Create Task
          </button>
        </div>

        {/* ===== Kanban Board ===== */}
        <div className="kanban-board" style={{ marginTop: "40px" }}>
          {["To Do", "In Progress", "Completed"].map((status) => (
            <div className="kanban-column" key={status}>
              <h3>{status}</h3>

              {getTasksByStatus(status).map((task) => (
                <div key={task._id} className="kanban-card">
  
                  <div className="card-header">
                    <h4>{task.title}</h4>

                    <button
                      className="delete-icon-btn"
                      onClick={() => handleDelete(task._id)}
                    >
                      ✕
                    </button>
                  </div>

                  <p>👤 {task.assignedTo?.name}</p>

                  <small className="deadline-text">
                    {task.deadline
                      ? new Date(task.deadline).toLocaleDateString()
                      : "No Deadline"}
                  </small>

                </div>
                
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ManagerDashboard;