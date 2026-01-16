import express from "express";
import postRouter from "./routes/post.routes.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: `http://localhost:5173`,
    credentials: true,
  })
);
const PORT = 3333;
app.use(express.urlencoded());
app.use(express.json());

app.get("/", (req, res) => {
  console.log("Request", req);
  //   console.log("Response", res);
  res.send("Hello darling");
});

app.use("/api/v1/", postRouter);

app.post("/events", (req, res) => {
  console.log("Oho got the req", req.body.type);
  res.send("got it buddy");
});

app.listen(PORT, () => {
  console.log("Version 4 is coming :):(");
  console.log(`post server is running on http://localhost:${PORT}`);
});
