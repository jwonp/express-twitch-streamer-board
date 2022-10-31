const mysql = require("mysql");
const dotenv = require("dotenv");
const result = dotenv.config({ path: "./.env" });

const mysqlPool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: process.env.DB_CONNECTIONLIMIT,
});

export const runQuery = (query: string) => {
  return new Promise((resolve, reject) => {
    try {
      mysqlPool.getConnection(function (err: any, connection: any) {
        if (err) throw err;
        connection.query(
          query,
          function (error: any, results: any, fields: any) {
            if (error) {
              reject(error);
            }
            resolve(results);
          }
        );
        connection.release();
      });
    } catch (error) {
      reject(error);
    }
  });
};

export default mysqlPool;
