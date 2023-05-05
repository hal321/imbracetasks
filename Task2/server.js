const express = require("express");
const app = express();
const port = 3001;
app.use(express.json());

let notes = [];

app.get("/notes", (req, res) => {
  res.status(200).send(notes);
});

app.post("/notes", (req, res) => {
  const { title, description } = req.body;

  if (!title || !description)
    return res.status(400).send({ error: "All the forms are required" });

  const newNotes = {
    id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
    title,
    description: description,
  };

  notes.push(newNotes);

  res.status(201).send(notes);
});

app.get("/notes/:id", (req, res) => {
  const id = +req.params.id;

  const note = notes.filter((item) => item.id === id);

  if (!note) return res.status(404).send({ error: "No notes found" });

  res.status(200).send(note);
});

app.put("/notes/:id", (req, res) => {
  const id = +req.params.id;

  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) return res.status(404).json({ error: "Note not found" });

  const { title, description } = req.body;

  if (!title || !description)
    return res.status(400).send({ error: "All the forms are required" });

  notes.splice(index, 1, { id, title, description });

  res.status(200).send(notes);
});

app.delete("/notes/:id", (req, res) => {
  const id = +req.params.id;

  const index = notes.findIndex((note) => note.id === id);

  if (index === -1) return res.status(404).json({ error: "Note not found" });

  notes.splice(index, 1);

  res.status(200).send(notes);
});

app.listen(port, () => {
  console.log(`server running at port:${port}`);
});
