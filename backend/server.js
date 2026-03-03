const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const AuthRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true, 
  })
);

app.use(express.json());
app.use(cookieParser());


// Routes
app.use("/api/auth", AuthRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);