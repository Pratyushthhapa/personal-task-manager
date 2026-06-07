const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const FILE_PATH = "./tasks.json";

const getTasks = () => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const saveTasks = (tasks) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
};

app.get("/tasks", (req, res) => {
  const tasks = getTasks();

  tasks.sort(
    (a, b) =>
      new Date(b.createdAt) - new Date(a.createdAt)
  );

  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title) {
    return res
      .status(400)
      .json({ message: "Title is required" });
  }

  const tasks = getTasks();

  const newTask = {
    id: Date.now(),
    title,
    description: description || "",
    dueDate: dueDate || "",
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  saveTasks(tasks);

  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const tasks = getTasks();

  const index = tasks.findIndex(
    (task) => task.id === id
  );

  if (index === -1) {
    return res
      .status(404)
      .json({ message: "Task not found" });
  }

  tasks[index] = {
    ...tasks[index],
    ...req.body,
  };

  saveTasks(tasks);

  res.json(tasks[index]);
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const tasks = getTasks();

  const filteredTasks = tasks.filter(
    (task) => task.id !== id
  );

  saveTasks(filteredTasks);

  res.json({
    message: "Task deleted successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});