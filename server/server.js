const express = require("express");

const app = express();

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

const cors = require("cors");
app.use(cors());

const authRoutes = require("./routes/authRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");

//db connection
const dbConnection = require("./config/db");

app.listen(process.env.PORT || 4000, (error) => {
  if (error) {
    console.log(error);
  }
  console.log("Running on port", process.env.PORT || 4000);
});

// database configuration
dbConnection();

//routes
app.use("/api", authRoutes, inventoryRoutes);
