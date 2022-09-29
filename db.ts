const mysql = require("mysql");
const mysqlPool = mysql.createPool({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "qwerty",
  database: "TwitchChatSite",
  connectionLimit: 5,
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
