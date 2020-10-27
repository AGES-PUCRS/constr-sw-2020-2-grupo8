import express from "express";

import routes from "./routes/routes";

/* Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks. */
import mongoose from "mongoose";

import cors from "cors";

import { serve, setup } from "swagger-ui-express";

import { load } from "yamljs";

const swaggerDocument = load("./swagger.yml");

const port = 3333;
let url = process.env.MONGO_URL || "localhost";

mongoose.connect(`mongodb://${url}/disciplinas`, {
  // authSource: "admin",
  // user: "root",
  // pass: "password",
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use("/api/docs", serve, setup(swaggerDocument));

app.listen(port, () => console.log(`\nApp listening on port ${port}!`));
