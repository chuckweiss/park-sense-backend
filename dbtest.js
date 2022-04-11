const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Hello1234!",
  database: "db",
});

// pool.getConnection((e) => {
//   if (e) throw e;
//   console.log("Connected to MySQL");
// });

const query = "SELECT * FROM inventory";
// pool.query(query, (error, results, fields) => {
//   if (error) throw error;
//   console.log(results[0]);
// });

connection.connect();

connection.query(query, (e, res) => {
  if (e) throw e;
  console.log(res[0]);
});

connection.end();
