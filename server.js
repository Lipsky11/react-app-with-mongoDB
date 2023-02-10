const express = require("express");
const app = express();
const connectDb = require("./src/dbconnect.js");
const User = require("./src/User.model");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/users", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    console.log(`Error ${err.message}`);
  }
});

app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
});

app.listen(8000, () => {
  console.log(`Server is running on port ${8000}}`);
  connectDb().then(() => {
    console.log("MongoDB connected!");
  });
});
