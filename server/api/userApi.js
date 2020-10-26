var express = require("express");
var router = express.Router();
var pool = require("../db").pool;

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

async function asyncforEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

router.post("/users", (req, res) => {
  var params = req.body;
  var users = [];
  return new Promise(async (resolve, reject) => {
    return runSqlQueryAsyncSelect(
      "SELECT users.*, (select count(userId) from assigned_tasks as at, main_tasks as mt where mt.taskId=at.taskId and mt.status=1 and at.userId=users.userId) as tot_tasks, (select count(userId) from assigned_tasks as at, main_tasks as mt where mt.taskId=at.taskId and mt.status=1 and at.userId=users.userId and at.completed_status=1) as completed_tasks from users  where users.status=1 ORDER By users.userId DESC"
    ).then(async (result) => {
      await asyncforEach(result.result, async (user, index) => {
        var assigned_tasks = "";
        var completed_tasks = "";
        var incompleted_tasks = "";

        await runSqlQueryAsyncSelect(
          "SELECT at.* from assigned_tasks as at, main_tasks as mt where mt.taskId=at.taskId and mt.status=1 and at.userId=?",
          [user.userId]
        ).then(async (result1) => {
          await asyncforEach(result1.result, async (task, index) => {
            assigned_tasks = assigned_tasks + "," + task.taskId;

            if (task.completed_status == 1)
              completed_tasks = completed_tasks + "," + task.taskId;
            else incompleted_tasks = incompleted_tasks + "," + task.taskId;
          });
        });
        user.taskAssignedId = assigned_tasks;
        user.taskComptetedId = completed_tasks;
        user.taskInComptetedId = incompleted_tasks;
        users.push(user);
      });
      res.json(users);
    });
  });
});

router.post("/add_user", (req, res) => {
  var params = req.body;
  return runSqlQueryAsyncInsert(
    "INSERT INTO users (name, designation, working_hours, status) values(?,?,?,1)",
    [params.name, params.designation, params.wokingHours]
  ).then((result) => {
    res.send(result.insertId.toString());
  });
});

router.post("/delete_users", (req, res) => {
  var params = req.body;
  return runSqlQueryAsyncUpdate("UPDATE users set status = 0 where userId=?", [
    params.userId
  ]).then((result) => {
    res.json(result.result);
  });
});

router.post("/update_user", (req, res) => {
  var params = req.body;
  return runSqlQueryAsyncUpdate(
    "UPDATE users set name=?, designation=?, working_hours=? where userId=?",
    [params.name, params.designation, params.working_hours, params.userId]
  ).then((result) => {
    res.json(result.result);
  });
});

module.exports = router;
