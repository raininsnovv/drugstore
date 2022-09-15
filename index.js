require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const app = express();

const port = 3090;
app.use(express.json());

app.use(require("./routes/users.route"));
app.use(require("./routes/drugs.route"));
app.use(require("./routes/categories.route"));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_SERVER);
    console.log("MongoDB connected");
  } catch (e) {
    console.log("ERROR", e.message);
  }
};
app.listen(port, () => {
  console.log("app listening at port 3090");
});

connectDB();
