import axios from "axios";
import { useState } from "react";

export const CommentCreate = ({ id }) => {
  const [comment, setComment] = useState("");
  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:6969/api/v1/${id}/comment`,{comment:comment})
      .then()
      .catch((err) => console.log(err));
      setComment("");
  };
  return (
    <div className="container">
      <form action="" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="input">Write your comment</label>
          <input
            type="text"
            className="form-control"
            value={comment}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary" onSubmit={handleSubmit}>
          submit
        </button>
      </form>
    </div>
  );
};
