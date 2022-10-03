const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB connect`);
  })
  .catch((err) => {
    console.log(err.message);
    console.log("what");
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
