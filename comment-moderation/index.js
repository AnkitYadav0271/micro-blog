import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.post("/events", async (req, res) => {
  const { type, data, comId } = req.body;
  console.log("logging req body of moderation", req.body);
  console.log("Checking the comId at moderation ++++", comId);

  if (type === "CommentPost") {
    console.log("logging the data", data);
    let status = data.comment.includes("oranges") ? "rejected" : "approved";
    console.log("new status", status);
    try {
      await axios.post("http://localhost:4040/events", {
        type: "CommentUpdated",
        data: {
          id: data.id,
          status,
          comId,
          comment: data.comment,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  res.send({});
});

app.listen(4001, () => {
  console.log(`server is running on http://localhost:4001`);
});
