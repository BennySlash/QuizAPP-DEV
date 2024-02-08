const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const scoreRouter = require("./routes/score");
const getScoreRouter = require("./routes/getScore");
const mongoose = require("mongoose");

const MONGO_URI =
  "mongodb+srv://biniyamayele:Testing1234@cluster0.xl8ulig.mongodb.net/";

// const dotenv = require("dotenv");
const app = express();

// dotenv.config({ path: "config/config.env" });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSucessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/", scoreRouter);
app.use("/", getScoreRouter);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
