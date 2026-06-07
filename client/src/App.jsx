import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Title is required");
      return;
    }

    await axios.post(`${API_URL}/tasks`, {
      title,
      description,
      dueDate,
    });

    setTitle("");
    setDescription("");
    setDueDate("");

    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(`${API_URL}/tasks/${task.id}`, {
      completed: !task.completed,
    });

    fetchTasks();
  };

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    await axios.delete(`${API_URL}/tasks/${id}`);
    fetchTasks();
  };

  const editTask = async (task) => {
  const newTitle = prompt("Edit title", task.title);

  if (!newTitle) return;

  const newDescription = prompt(
    "Edit description",
    task.description
  );

  const newDueDate = prompt(
    "Edit due date (YYYY-MM-DD)",
    task.dueDate
  );

  await axios.put(`${API_URL}/tasks/${task.id}`, {
    title: newTitle,
    description: newDescription,
    dueDate: newDueDate,
  });

  fetchTasks();
};

const filteredTasks = tasks.filter((task) => {
  const matchesSearch = task.title
    .toLowerCase()
    .includes(searchTerm.toLowerCase());

  if (filter === "active")
    return !task.completed && matchesSearch;

  if (filter === "completed")
    return task.completed && matchesSearch;

  return matchesSearch;
});

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="container">
      <h1>Personal Task Manager</h1>

      <form onSubmit={addTask} className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <div className="stats">
        <span>Active: {activeCount}</span>
        <span>Completed: {completedCount}</span>
      </div>

      <input
  type="text"
  placeholder="Search tasks..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="search-box"
/>

      <div className="filters">
       <button
  className={filter === "all" ? "active-filter" : ""}
  onClick={() => setFilter("all")}
>
  All
</button>

<button
  className={filter === "active" ? "active-filter" : ""}
  onClick={() => setFilter("active")}
>
  Active
</button>

<button
  className={filter === "completed" ? "active-filter" : ""}
  onClick={() => setFilter("completed")}
>
  Completed
</button>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="empty">
          No tasks found
        </div>
      ) : (
        filteredTasks.map((task) => (
          <div key={task.id}
  className={`task-card ${
    !task.completed &&
    task.dueDate &&
    new Date(task.dueDate) < new Date()
      ? "overdue"
      : ""
  }`}>
            <h3
              style={{
                textDecoration: task.completed
                  ? "line-through"
                  : "none",
              }}
            >
              {task.title}
            </h3>

            <p>{task.description}</p>

            {task.dueDate && (
              <small>
                Due: {task.dueDate}
              </small>
            )}

            <div className="actions">
              <button
                onClick={() => toggleTask(task)}
              >
                {task.completed
                  ? "Mark Active"
                  : "Mark Complete"}
              </button>

              <button
  onClick={() => editTask(task)}
>
  Edit
</button>

              <button
                className="delete"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;