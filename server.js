const express = require("express");
const server = express();
const mongoose = require("mongoose");
const path = require("path");

const bodyParser = require("body-parser");
server.use(bodyParser.json());
const cors = require("cors");
server.use(cors());

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose.connect(
  process.env.MONGODB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log("Connected to the Design 45 Database");
  }
);
mongoose.set("useFindAndModify", false);


const usersRoute = require("./controllers/users");
server.use("/api/users", usersRoute, () => {});
const contentsRoute = require("./controllers/contents");
server.use("/api/contents", contentsRoute, () => {});



server.use(express.static("./client/build"));
server.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});


const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>
  console.log(`Server is running on: ${process.env.PORT}`)
);
