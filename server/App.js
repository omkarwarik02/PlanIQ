require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { auth } = require("./config/auth");
const subjectRoutes = require("../server/Routes/subjectRoutes");
const aiRoutes =require("./Routes/aiRoutes");
const app = express();

const allowedOrigins = [
  "http://localhost:4200",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { toNodeHandler } = require("better-auth/node");

app.use("/api/auth", toNodeHandler(auth));
app.use("/api/subjects", subjectRoutes);
app.use("/api/subjects-list",subjectRoutes);
app.use("/api/ai",aiRoutes);

module.exports = app;
