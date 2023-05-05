import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [notes, setNotes] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [values, setValues] = useState({
    id: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    axios("/notes")
      .then((res) => {
        setNotes(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    try {
      const { data } = await axios.post("/notes", values);
      //console.log(values);
      console.log(data);
      setNotes(data);
      setValues({
        id: "",
        title: "",
        description: "",
      });
    } catch (error) {
      setErrMsg(error.response.data.error);
    }
  };

  const handleChange = (e) => {
    setErrMsg("");
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleEdit = async (id) => {
    try {
      const { data } = await axios.put(`/notes/${id}`, values);
      setNotes(data);
      setValues({
        title: "",
        description: "",
      });
    } catch (error) {
      setErrMsg(error.response.data.error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/notes/${id}`);
      setNotes(data);
    } catch (error) {
      setErrMsg(error.response.data.error);
    }
  };
  console.log(errMsg);
  return (
    <div>
      <h1>Note App</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input name="title" value={values.title} onChange={handleChange} />
        <label>Description:</label>
        <textarea
          name="description"
          value={values.description}
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
      <h2 style={{ color: "red" }}>{errMsg}</h2>
      <h2>Notes</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <div>{note.title}</div>
            <div>{note.description}</div>
            <button onClick={() => handleEdit(note.id)}>Edit</button>
            <button onClick={() => handleDelete(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
