import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

const events = [];
app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);
  console.log("Event is logging", event);
  await Promise.all([
    axios
      .post("http://localhost:3333/events", event)
      .catch((err) => console.log(err.message)),
    axios
      .post("http://localhost:6969/events", event)
      .catch((err) => console.log(err.message)),
    axios
      .post("http://localhost:4010/events", event)
      .catch((err) => console.log(err.message)),
    axios
      .post("http://localhost:4001/events", event)
      .catch((err) => console.log(err.message)),
  ])
    .then(() => console.log("All done"))
    .catch((err) => console.log(`got the error :_--${err.message}`));

  res.send({ status: "ok" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4040, () => {
  console.log(`server is running on: http://localhost:4040`);
});
