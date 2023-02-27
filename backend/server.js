
const { errorMonitor } = require("events");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./Middleware/errorMiddleware");
const connectDB = require("./Config/db");
const cors = require('cors');

const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./Routes/Routes"));

app.use(errorHandler);

app.listen(port, () => console.log(`server started on port ${port}`));