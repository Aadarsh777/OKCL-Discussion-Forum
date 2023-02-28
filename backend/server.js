const app = require("./app");

const mongoose = require("mongoose");

// Handling Uncaught Exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);

  process.exit(1);
});

// config
if (process.env.NODE_ENV !== "PRDUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Connecting to Database

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log(`MongoDB connected with server: ${data.connection.host}`);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
