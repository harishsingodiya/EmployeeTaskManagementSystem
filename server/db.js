const mysql = require("mysql");
var pool;
pool = mysql.createPool({
  connectionLimit: 80,
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "user_management"
});


module.exports.pool = pool;

module.exports.getConnection = function() {
  return new Promise((resolve, reject) => {
    module.exports.pool.getConnection(function(err, conn) {
      if (err) reject("failed_to_get_db_connection");
      else resolve(conn);
    });
  });
};

