const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const path = require('path');

const user = require("./route/userroute");
const topic = require("./route/topicroute");

// Config

if (process.env.NODE_ENV !== "PRDUCTION") {
   require("dotenv").config({ path: "backend/config/config.env" });
 }

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/v1", user);
app.use("/api/v1", topic);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})

// Middleware for Errors

app.use(errorMiddleware);

module.exports = app;