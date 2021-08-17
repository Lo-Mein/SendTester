const functions = require("firebase-functions");
const express = require("express");

const app = express();

const cors = require("cors");
app.use(cors({ origin: true }));

const { signup, login } = require("./handlers/users");

//user routes
app.post("/signup", signup);
app.post("/login", login);

exports.api = functions.https.onRequest(app);
