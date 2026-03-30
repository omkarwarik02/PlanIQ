require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { auth } = require("./config/auth");
const subjectRoutes = require("../server/Routes/subjectRoutes");
const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { toNodeHandler } = require("better-auth/node");

app.use("/api/auth", toNodeHandler(auth));
app.use("/api/subjects", subjectRoutes);
app.use("/api/subjects-list",subjectRoutes);

module.exports = app;
