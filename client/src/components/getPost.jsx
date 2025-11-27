import axios from "axios";
import { useEffect, useState } from "react";
import { CommentCreate } from "./commentCreate";
import { GetComment } from "./getComment";

export const GetPost = () => {
  const [posts, setPost] = useState({});

  const fetchPost = async () => {
    try {
      const res = await axios.get("http://localhost:4010/posts");
      console.log("logging the new response", res);
      let data = res.data;
      setPost((prev) => ({ ...prev, ...data }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {Object.values(posts).map((post) => {
        return (
          <div
            className="card"
            style={{ width: "30%", marginBottom: "20px" }}
            key={post.id}
          >
            <h1>{post.title}</h1>
            <GetComment comments = {post.comments} />
            <CommentCreate id={post.id} />
          </div>
        );
      })}
    </div>
  );
};
