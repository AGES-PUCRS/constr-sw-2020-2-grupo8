const express = require("express");

/* Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks. */
const mongoose = require("mongoose");

const requiredir = require("require-dir");

const cors = require("cors");

const swaggerUi = require("swagger-ui-express");

const YAML = require("yamljs");

const swaggerDocument = YAML.load("./swagger.yml");

const port = 3000;
const url = "mongodb://localhost:27017/disciplinas";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

requiredir("./Models");

const routes = require("./Routes/routes.js");

app.use("/api", routes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => console.log(`App listening on port ${port}!`));
