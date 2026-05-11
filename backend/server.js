const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

const taskRoutes = require("./routes/taskRoutes");

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

// Test Route
app.get("/", (req, res) => {
    res.send("StudySync API Running");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});