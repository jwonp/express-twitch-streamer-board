const BoardExpress = require("express");
var CryptoJS = require("crypto-js");
import { runQuery } from "../db";
import { getEngToShort, getShortToKorean } from "../funcs/convertBoardTitle";
import {
  content as content_type,
  board_content as board_content_type,
  mypage_content_list_bar,
} from "../types/content";
// const axios = require("axios").default;
const BoardRouter = BoardExpress.Router();

BoardRouter.post("/uploadContent", (req: any, res: any) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    console.log(req.body);
    const now = Date.now();
    const SqlData: content_type = {
      content_id: CryptoJS.AES.encrypt(
        `${getEngToShort[req.body.board]}?${now}?${
          req.session.passport.user.data[0].id
        }`,
        process.env.BOARD_SECRET
      )
        .toString()
        .replaceAll("+", "3")
        .replaceAll("/", "5"),
      board: getEngToShort[req.body.board],
      title: req.body.title,
      author: req.session.passport.user.data[0].id,
      date: now,
      update_date: now,
      content: req.body.content,
      views: 0,
    };
    addContent(SqlData)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(401);
      });
  }
});
BoardRouter.get("/getboardindex", (req: any, res: any) => {
  getallContentCountByBoard(getEngToShort[req.query.board]).then((response) => {
    res.json(response[0]);
  });
});
BoardRouter.get("/getboardlist", (req: any, res: any) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    getContentsBySelected(getEngToShort[req.query.board], req.query.index)
      .then((response) => {
        res.json(response);
      })
      .catch((reason) => {
        res.sendStatus(401);
      });
  }
});
BoardRouter.get("/getContentsByUser", (req: any, res: any) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    const user = req.session.passport.user;
    console.log(user);
    getContentsByUser(user.data[0].id).then(
      (result: mypage_content_list_bar[]) => {
        console.log(result);
        res.json(result);
      }
    );
  }
});
BoardRouter.post("/getContent", (req: any, res: any) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    console.log(req.session.passport.user);
    getContent(req.body.id)
      .then((getContentResponse: any[]) => {
        const result = getContentResponse[0];
        getDisplayNameByUserID(result.author).then(
          (getDisplayNameByUserIDResponse) => {
            const display_name = getDisplayNameByUserIDResponse[0].display_name;
            result.content = result.content
              .replaceAll("%3A", ":")
              .replaceAll("%2F", "/");
            const ContentResponse: board_content_type = {
              board: getShortToKorean[result.board],
              title: result.title,
              author: display_name,
              update_date: result.update_date,
              content: result.content,
            };
            res.json(ContentResponse);
          }
        );
      })
      .catch(() => {
        res.sendStatus(401);
      });
  }
});
BoardRouter.get("/setLike/:id", function (req: any, res: any) {
  if (req.session && req.session.passport && req.session.passport.user) {
    const user = req.session.passport.user.data[0];
    const userID = user.id;
    const contentID = req.params.id;
    chkLike(userID, contentID)
      .then((chkLikeResult: any[]) => {
        if (chkLikeResult[0].count === 0) {
          addLike(userID, contentID).then(() => {
            getLikeCount(contentID).then((getLikeResult: any[]) => {
              res.json({
                isLiked: true,
                count: getLikeResult[0].count,
              });
            });
          });
        } else {
          deleteLike(userID, contentID).then(() => {
            getLikeCount(contentID).then((getLikeResult: any[]) => {
              res.json({
                isLiked: false,
                count: getLikeResult[0].count,
              });
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(401);
      });
  }
});
BoardRouter.get("/getLike/:id", function (req: any, res: any) {
  if (req.session && req.session.passport && req.session.passport.user) {
    const user = req.session.passport.user.data[0];
    const userID = user.id;
    const contentID = req.params.id;
    getLikeCount(contentID)
      .then((likeCountResult: any[]) => {
        chkLike(userID, contentID).then((chkLikeResult: any[]) => {
          res.json({
            isLiked: chkLikeResult[0].count === 1 ? true : false,
            count: likeCountResult[0].count,
          });
        });
      })
      .catch((err) => {
        res.sendStatus(401);
      });
  }
});
BoardRouter.get("/addViewCount/:id", function (req: any, res: any) {
  if (req.session && req.session.passport && req.session.passport.user) {
    const contentID = req.params.id;
    addViews(contentID);
  }
});

async function getContent(id: string) {
  return await runQuery(
    `SELECT board, title, author, update_date, content FROM content WHERE content_id = "${id}"`
  );
}
async function addContent(data: content_type): Promise<any> {
  return await runQuery(
    `INSERT INTO content VALUES ("${data.content_id}","${data.board}","${data.title}","${data.author}","${data.date}","${data.update_date}","${data.content}","${data.views}")`
  );
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
  return await runQuery(`SELECT A.content_id as id, A.title as title, B.display_name as author, A.date as date, A.views as views FROM content as A LEFT JOIN streamer as B ON A.author = B.user_id WHERE A.board = "${board}" ORDER BY date ASC LIMIT ${
    (selected - 1) * 10
  }, 10
  `);
}
async function getDisplayNameByUserID(id: number): Promise<any> {
  return await runQuery(
    `SELECT display_name FROM streamer WHERE user_id=${id}`
  );
}

async function getLikeCount(contentID: string) {
  return await runQuery(`
    SELECT COUNT(*) as count FROM content_like WHERE content_id = "${contentID}"
  `);
}
async function chkLike(userID: string, contentID: string): Promise<any> {
  //count는 0또는 1
  return await runQuery(
    `SELECT COUNT(*) as count FROM content_like WHERE user_id = "${userID}" AND content_id = "${contentID}"`
  );
}
async function addLike(userID: string, contentID: string) {
  return await runQuery(
    `INSERT INTO content_like VALUES ("${contentID}","${userID}")`
  );
}
async function deleteLike(userID: string, contentID: string) {
  return await runQuery(
    `DELETE FROM content_like WHERE user_id = "${userID}" AND content_id = "${contentID}"`
  );
}
async function addViews(contentID: string) {
  return await runQuery(
    `UPDATE content SET views = views + 1 WHERE content_id = "${contentID}"`
  );
}
async function getViews(contentID: string) {
  return await runQuery(
    `SELECT views FROM content WHERE content_id = "${contentID}"`
  );
}
const getContentsByUser = async (userID: string) => {
  return await runQuery(
    `SELECT content_id, board, title, update_date FROM content WHERE author="${userID}"`
  );
};
module.exports = BoardRouter;
export {};
