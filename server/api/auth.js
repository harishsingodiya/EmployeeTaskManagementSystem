var express = require("express");
var router = express.Router();
var pool = require("../db").pool;
const jwt = require("jsonwebtoken");
const JWT_SECRET = "LKJ*(@BN823jhsdf!@*(";
function runSqlQueryAsyncSelect(query, params) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, result) => {
      resolve({ err: err, result: result });
    });
  });
}

function runSqlQueryAsyncInsert(query, params) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, result) => {
      resolve({
        err: err,
        result: result,
        insertId: result ? result.insertId : null
      });
    });
  });
}

function runSqlQueryAsyncUpdate(query, params) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, result) => {
      resolve({ err: err, result: result });
    });
  });
}

function runSqlQueryAsyncDelete(query, params) {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, result) => {
      resolve({ err: err, result: result });
    });
  });
}

function getSessionToken(data) {
  const token = jwt.sign({ data }, JWT_SECRET, { expiresIn: "10h" });
  return token;
}

function verifyToken(token) {
  if (!token) return 400;
  try {
    const verified = jwt.verify(token, JWT_SECRET);
    return verified;
  } catch (error) {
    return 401;
  }
}

router.post("/login", (req, res) => {
  var params = req.body;
  return runSqlQueryAsyncSelect(
    "SELECT * from admin where username=? and password=?",
    [params.username, params.password]
  ).then((result) => {
    if (result.result.length) {
      var token = getSessionToken(params);
      res.json({
        status: 200,
        accessToken: token
      });
    } else {
      res.json({
        status: 400
      });
    }
  });
});

router.post("/verify_token", (req, res) => {
  var params = req.body;
  var token = verifyToken(params.accessToken);
  res.json({
    token: token
  });
});

module.exports = router;
