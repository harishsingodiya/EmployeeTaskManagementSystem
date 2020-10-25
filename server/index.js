// Entry Point of the API Server
const express = require("express");
var mysql = require("mysql");
const auth = require("./api/auth.js");
const userApi = require("./api/userApi");
const tasks = require("./api/tasks");
var cors = require('cors')
const app = express();
app.use(cors())
var router = express.Router();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", auth);
app.use("/user", userApi);
app.use("/tasks", tasks);

app.use(router);

var port = 5000;
app.listen(port);
console.log("Server running on port " + port);
