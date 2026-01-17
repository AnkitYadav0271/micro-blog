import express from "express";
import cors from "cors";
import axios from "axios";
import { randomBytes } from "crypto";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "PATCH", "DELETE", "UPDATE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
const PORT = 6969;
const commentArray = [];
app.post("/api/v1/:id/comment", async (req, res) => {
  const { id } = req.params;
  const comId = Math.random() * 10000;
  if (!req.body) return console.log("Req body is undefined");
  const { comment } = req.body;
  commentArray.push({ id, comment, comId });

  try {
    await axios.post("http://event-bus-srv:4040/events", {
      type: "CommentPost",
      data: {
        id,
        comId,
        comment,
        status: "pending",
      },
    });
  } catch (error) {
    console.log(`${error.message} error and submitting`);
  }

  res.status(200).json({
    success: true,
    message: "comment successful",
    comment: comment,
  });
});

app.get("/api/v1/:id/comments", function response(req, res) {
  try {
    const { id } = req.params;
    res.status(200).send(commentArray.filter((comment) => comment.id === id));
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentUpdated") {
    const { id, content, status, comId } = data;
    const postComments = commentArray.filter((comment) => comment.id === id);
    const changeComment = postComments.find(
      (comment) => comment.comId === comId
    );
    changeComment.status = status;
    try {
      await axios.post("http://event-bus-srv:4040/events", {
        id,
        content,
        status,
        comId,
      });
    } catch (err) {
      console.log(`${err.message} at post to query events`);
    }
  }
});

app.listen(PORT, function callback() {
  console.log(`server is running on http://localhost:${PORT}`);
});
