const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
require("dotenv").config();

const app = express();
let server;

//middleware

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: "20mb" }));
app.use(bodyParser.json({ limit: "20mb" }));

app.use("/api/users/", userRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connection established"))
  .catch((er) => console.log("Error connectig to mongoDB", er));

server = app.listen(process.env.PORT, () => {
  console.log(`Node Server running on ${process.env.PORT}`);
});
