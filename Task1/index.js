const express = require("express");
const app = express();
const PORT = 8000;
app.use(express.json());

let tasks = [];

app.get("/", (req, res) => {
  res.send("Simple tasks app");
});

//to get all the tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

//to create a new task
app.post("/tasks", (req, res) => {
  const { title, description, status } = req.body;
  if (!title || !description || !status)
    return res.status(400).json({ err: "You have to fill all the details" });
  const newTask = {
    id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    description,
    status,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

//get a single task by id
app.get("/tasks/:id", (req, res) => {
  const id = +req.params.id;
  const singleTask = tasks.filter((task) => task.id === id);
  if (!singleTask) return res.status(404).json({ err: "no task found" });
  res.status(200).json(singleTask);
});

//to update a single task
app.put("/tasks/:id", (req, res) => {
  const id = +req.params.id;
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return res.status(404).json({ error: "No tasks found" });

  const { title, description, status } = req.body;

  if (!title || !status || !description)
    return res.status(400).json({ error: "All the forms are required" });

  tasks.splice(index, 1, { id, title, status, description });

  res.status(200).json({ id, title, status, description });
});

//to delete a single task
app.delete("/tasks/:id", (req, res) => {
  const id = +req.params.id;
  const index = tasks.findIndex((task) => task.id === id);

  if (index === -1) return res.status(404).json({ error: "No tasks found" });

  tasks.splice(index, 1);

  res.status(200).json({ msg: "deleted" });
});

app.listen(PORT, () => {
  console.log("listning to port", PORT);
});
