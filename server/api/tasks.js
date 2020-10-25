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

router.post("/all_tasks", (req, res) => {
  var params = req.body;
  return new Promise(async (resolve, reject) => {
    return runSqlQueryAsyncSelect(
      "SELECT * from main_tasks where status=1 ORDER By due_date ASC"
    ).then((result) => {
      return runSqlQueryAsyncSelect(
        "SELECT * from sub_tasks where status=1 ORDER By taskId DESC"
      ).then((result1) => {
        res.json({
          mainTask: result.result,
          subTask: result1.result
        });
      });
    });
  });
});

router.post("/create_task", (req, response) => {
  var params = req.body;
  return new Promise(async (resolve, reject) => {
    return runSqlQueryAsyncInsert(
      "INSERT INTO main_tasks (name, working_hours, due_date, status) values(?,?,?,1)",
      [
        params.mainTask.taskName,
        params.mainTask.workingHours,
        params.mainTask.dueDate
      ]
    ).then((result) => {
      if (result.insertId) {
        params.subTask.forEach(async (subTask) => {
          return await runSqlQueryAsyncInsert(
            "INSERT INTO sub_tasks (taskId, name, due_date, status) values(?,?,?,1)",
            [result.insertId, subTask.taskName, subTask.dueDate]
          );
        });
        resolve();
      } else {
        reject("query_failed");
      }
    });
  })
    .then(() => {
      response.json({
        status: 200
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/assign_task", (req, response) => {
  var params = req.body;
  return new Promise(async (resolve, reject) => {
    return runSqlQueryAsyncInsert(
      "SELECT * from assigned_tasks where userId=? and taskId=?",
      [params.userId, params.taskId]
    ).then((result) => {
      if (result.result.length) {
        response.json({
          alreadyAssigned: true,
          assignedStatus: false
        });
      } else {
        resolve();
      }
    });
  })
    .then(() => {
      return runSqlQueryAsyncInsert(
        "INSERT INTO assigned_tasks (userId, taskId) values(?,?)",
        [params.userId, params.taskId]
      ).then((result) => {
        if (result.insertId) {
          response.json({
            alreadyAssigned: false,
            assignedStatus: true
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/submit_task", (req, response) => {
  var params = req.body;
  return new Promise(async (resolve, reject) => {
    return runSqlQueryAsyncUpdate(
      "UPDATE assigned_tasks set completed_on=CURRENT_TIMESTAMP, completed_status=? where userId=? and taskId=?",
      [params.status, params.userId, params.taskId]
    ).then((result) => {
      if (result.result.affectedRows) {
        response.end();
      }
    });
  }).catch((err) => {
    console.log(err);
  });
});

router.post("/all_task_assigned_users", (req, res) => {
  var params = req.body;
  return new Promise(async (resolve, reject) => {
    return runSqlQueryAsyncSelect(
      "SELECT users.userId, users.name, users.designation,  (select count(*) from assigned_tasks as at where at.userId=users.userId) as tot_assigned_task, (select count(*) from assigned_tasks as at where at.userId=users.userId and at.completed_status=1) as tot_free_task, (select count(*) from assigned_tasks as at where at.userId=users.userId and at.completed_status=0) as tot_busy_task   from users  where status=1 ORDER By userId ASC"
    ).then((result) => {
      res.json(result.result);
    });
  });
});

router.post("/delete_task", (req, res) => {
  var params = req.body;
  return new Promise(async (resolve, reject) => {
    return runSqlQueryAsyncUpdate(
      "UPDATE main_tasks set status=0 where taskId=?",
      [params.taskId]
    ).then(() => {
      res.end();
    });
  });
});

router.post("/update_task", (req, res) => {
  var params = req.body;
  console.log(params);
  return new Promise(async (resolve, reject) => {
    return runSqlQueryAsyncUpdate(
      "UPDATE main_tasks set name=?, working_hours=?, due_date=? where taskId=?",
      [
        params.mainTask.taskName,
        params.mainTask.workingHours,
        params.mainTask.dueDate,
        params.taskId
      ]
    ).then(async (result) => {
      await asyncforEach(params.subTask, async (subTask, index) => {
        if (subTask.subTaskId != 0) {
          return runSqlQueryAsyncUpdate(
            "UPDATE sub_tasks set name=?, status=? where taskId=? and subTaskId=?",
            [subTask.taskName, subTask.status, params.taskId, subTask.subTaskId]
          );
        } else {
          return runSqlQueryAsyncInsert(
            "INSERT INTO sub_tasks (taskId, name, due_date, status) values(?,?,?,1)",
            [params.taskId, subTask.taskName, subTask.dueDate]
          );
        }
      });
      resolve();
    });
  })
    .then(() => {
      res.end()
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
