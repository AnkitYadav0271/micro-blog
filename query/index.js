import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const posts = {};
app.use(bodyParser.json());
app.use(cors());

const eventHandler = (type, data) => {
  if (type === "CommentPost") {
    const { id, comment, status, comId } = data;
    posts[id].comments.push({ id, comId, comment, status });
  }

  if (type === "postCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentUpdated") {
    const { id, comment, status, comId } = data;
    const post = posts[id];

    const commentFiltered = post.comments.find(
      (comment) => (comment.comId = comId)
    );
    commentFiltered.status = status;
    commentFiltered.comment = comment;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  eventHandler(type, data);
});

app.listen(4010, async () => {
  console.log(`server is running on http://localhost:4010`);
  const result = await axios.get("http://event-bus-srv:4040/events");
  console.log("logging result in query", result);
  for (let event of result.data) {
    console.log("event", event.data);
    eventHandler(event.type, event.data);
  }
});
