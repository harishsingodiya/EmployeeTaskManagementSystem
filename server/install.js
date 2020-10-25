/*
Run this file once before running the server.
This creates the required database and tables.
*/

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname + "/.env") });
var mysql = require("mysql");

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});
connection.connect();

function runSqlQueryAsync(query, params) {
  return new Promise((resolve, reject) => {
    connection.query(query, params, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

// Initialize users table
var createDbQuery = "CREATE DATABASE " + process.env.DB_DATABASE;
return runSqlQueryAsync(createDbQuery)
  .then(() => {
    connection.end();
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      port: "3306",
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    });
    connection.connect();
  })
  .then(() => {
    return runSqlQueryAsync(
      `
      CREATE TABLE admin (
        id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
        username varchar(100) NOT NULL,
        password varchar(100) NOT NULL,
        status int(11) NOT NULL DEFAULT 1
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
    `
    );
  })
  .then(() => {
    return runSqlQueryAsync(`INSERT INTO admin (id, username, password, status) VALUES
    (1, 'admin', '123', 1);`);
  })

  .then(() => {
    return runSqlQueryAsync(
      `
      CREATE TABLE assigned_tasks (
        id int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
        userId int(11) NOT NULL,
        taskId int(11) NOT NULL,
        completed_on datetime DEFAULT NULL,
        completed_status int(11) NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `
    );
  })
  .then(() => {
    return runSqlQueryAsync(`
    CREATE TABLE main_tasks (
      taskId int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
      name varchar(500) NOT NULL,
      working_hours varchar(100) NOT NULL,
      due_date varchar(100) NOT NULL,
      status int(11) NOT NULL DEFAULT 1
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;`);
  })
  .then(() => {
    return runSqlQueryAsync(`CREATE TABLE sub_tasks (
      subTaskId int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
      taskId int(11) NOT NULL,
      name varchar(500) NOT NULL,
      due_date varchar(100) NOT NULL,
      status int(11) NOT NULL DEFAULT 1
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1; `);
  })
  .then(() => {
    return runSqlQueryAsync(`
    CREATE TABLE users (
      userId int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
      name varchar(100) NOT NULL,
      designation varchar(100) NOT NULL,
      working_hours varchar(11) NOT NULL,
      profile_pic varchar(500) NOT NULL,
      created_on datetime NOT NULL DEFAULT current_timestamp(),
      status int(11) NOT NULL DEFAULT 1
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  })
  .then(() => {
    connection.end();
    console.log("Database created successfully");
    process.exit();
  })
  .catch((err) => {
    connection.end();
    console.log("Failed to initialize database.");
    console.log(err);
    process.exit();
  });
