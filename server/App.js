require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { auth } = require("./config/auth");

const app = express();

app.use(cors({
  origin: "http://localhost:4200",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { toNodeHandler } = require("better-auth/node");

app.use("/api/auth", toNodeHandler(auth));

module.exports = app;