require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { auth } = require("./config/auth");
const subjectRoutes = require("../server/Routes/subjectRoutes");
const aiRoutes =require("./Routes/aiRoutes");
const app = express();

const allowedOrigins = [
  "http://localhost:4200",
  "https://helio-kohl.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

const isAllowedOrigin = (origin) =>
  !origin ||
  allowedOrigins.includes(origin) ||
  /^https:\/\/helio[a-z0-9-]*\.vercel\.app$/.test(origin);

app.use(
  cors({
    origin: (origin, callback) => {
      isAllowedOrigin(origin)
        ? callback(null, true)
        : callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { toNodeHandler } = require("better-auth/node");

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", toNodeHandler(auth));
app.use("/api/subjects", subjectRoutes);
app.use("/api/subjects-list",subjectRoutes);
app.use("/api/ai",aiRoutes);

module.exports = app;
