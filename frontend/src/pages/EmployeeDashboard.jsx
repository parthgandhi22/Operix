import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "../axiosConfig";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "@hello-pangea/dnd";
import "../index.css";

function EmployeeDashboard() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("/tasks/my-tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ===============================
  // Drag End Handler
  // ===============================
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    // OPTIMISTIC UPDATE
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );

    try {
      await axios.patch(`/tasks/update-status/${taskId}`, {
        status: newStatus,
      });
    } catch (err) {
      console.error(err);
      fetchTasks(); // rollback if error
    }
  };

  const getTasksByStatus = (status) =>
    tasks
      .filter((task) => task.status === status)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      <Navbar role="Employee" />

      <div className="kanban-container">
        <h1>My Kanban Board</h1>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="kanban-board">

            {["To Do", "In Progress", "Completed"].map((status) => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    className="kanban-column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h3>{status}</h3>

                    {getTasksByStatus(status).map((task, index) => (
                      <Draggable
                        key={task._id}
                        draggableId={task._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="kanban-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h4>{task.title}</h4>
                            <p>{task.description}</p>
                            <small>
                              {task.deadline
                                ? new Date(task.deadline).toLocaleDateString()
                                : "No Deadline"}
                            </small>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}

          </div>
        </DragDropContext>
      </div>
    </>
  );
}

export default EmployeeDashboard;