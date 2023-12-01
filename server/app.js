const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const promptRoutes = require("./routes/promptRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const chatRoutes = require("./routes/chatRoutes");
const connectToMongo = require("./db");

connectToMongo();

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    // origin: "https://promptai-client.onrender.com/",
  })
);

app.use("/api/user", userRoutes);
app.use("/api/prompt", promptRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/chat", chatRoutes);

app.listen(5000, () => {
  console.log("Connected to the port 5000");
});
