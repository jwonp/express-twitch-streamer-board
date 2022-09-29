const BoardExpress = require("express");
var CryptoJS = require("crypto-js");
import { runQuery } from "../db";
const BoardRouter = BoardExpress.Router();
interface SQLcontentType {
  content_id: string;
  board: string;
  title: string;
  author: string;
  date: number;
  update_date: number;
  content: string;
}
BoardRouter.post("/uploadContent", (req: any, res: any) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    const now = Date.now();
    const SqlData: SQLcontentType = {
      content_id: CryptoJS.AES.encrypt(
        `${getTitleName(req.body.board)}?${now}?${
          req.session.passport.user.data[0].id
        }`,
        process.env.BOARD_SECRET
      )
        .toString()
        .replaceAll("+", "*"),
      board: getTitleName(req.body.board),
      title: req.body.title,
      author: req.session.passport.user.data[0].id,
      date: now,
      update_date: now,
      content: req.body.content,
    };
    addContent(SqlData)
      .then(() => {
        res.send("Success");
      })
      .catch(() => {
        res.send("Fail");
      });
  }
});
BoardRouter.get("/getboardindex", (req: any, res: any) => {
  getallContentCountByBoard(getTitleName(req.query.board)).then((response) => {
    res.json(response[0]);
  });
});
BoardRouter.get("/getboardlist", (req: any, res: any) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    getContentsBySelected(getTitleName(req.query.board), req.query.index)
      .then((response) => {
        res.json(response);
      })
      .catch(() => {
        res.send("Fail");
      });
  }
});
BoardRouter.post("/getContent", (req: any, res: any) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    getContent(req.body.id)
      .then((response: any[]) => {
        res.json(response[0]);
      })
      .catch(() => {
        res.send("Fail");
      });
  }
});
function getTitleName(name: string): string {
  switch (name) {
    case "notice":
      return "NOT";
    case "summary":
      return "SUM";
    case "result":
      return "RES";
    case "collabo":
      return "COL";
    default:
      return "";
  }
}
async function getContent(id: string) {
  return await runQuery(`SELECT * FROM content WHERE content_id = "${id}"`);
}
async function addContent(data: SQLcontentType): Promise<any> {
  return await runQuery(
    `INSERT INTO content VALUES ("${data.content_id}","${data.board}","${data.title}","${data.author}","${data.date}","${data.update_date}","${data.content}")`
  ).then(async () => {
    await runQuery(
      `INSERT INTO content_tag VALUES ("${data.content_id}","0","0")`
    );
  });
}
async function getallContentCountByBoard(board: string): Promise<any> {
  return await runQuery(
    `SELECT COUNT(*) as count FROM content WHERE board = '${board}'`
  );
}
async function getContentsBySelected(
  board: string,
  selected: number
): Promise<any> {
  return await runQuery(`
    SELECT A.content_id as id, A.title as title, C.display_name as author, A.date as date, B.views as views, B.likes as likes FROM content as A LEFT JOIN content_tag as B ON A.content_id = B.content_id LEFT JOIN streamer as C ON A.author = C.user_id WHERE A.board = "${board}" ORDER BY date ASC LIMIT ${
    (selected - 1) * 10
  }, 10
  `);
}
module.exports = BoardRouter;
export {};
