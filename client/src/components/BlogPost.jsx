import axios from "axios";
import { useState } from "react";

export const BlogPost = () => {
  const [title, setTitle] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3333/api/v1/post", { title })
      .then((_res) => {
      })
      .catch((err) => console.log(err));
      setTitle("");
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <>
      <h3>Write your blog here</h3>

      <form action="/" typeof="submit" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="post">Title:</label>
          <input
            type="text"
            id="post"
            className="form-control"
            value={title}
            onChange={handleChange}
          />

          <br />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};
