const AuthExpress = require("express");
const AuthRequest = require("request");
const qs = require("qs");
const AuthRouter = AuthExpress.Router();
import { runQuery } from "../db";
interface RevokeTokenData {
  client_id: string;
  token: string;
}
AuthRouter.get("/getProfileImage", (req: any, res: any) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    getProfileImage(req.session.passport.user.data[0].id).then(
      (data: any[]) => {
        res.json({ imgSrc: data[0].profile_image_url });
      }
    );
  }
});
AuthRouter.get("/validate", (req: any, res: any) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    // checkAdmin(req.session.passport.user.data[0].id);
    getAccessToken(req.session.passport.user.data[0].id).then((data: any[]) => {
      const options = {
        url: "https://id.twitch.tv/oauth2/validate",
        method: "GET",
        headers: {
          Authorization: `OAuth ${data[0].access_token}`,
        },
      };
      AuthRequest(options, function (error: any, response: any, body: any) {
        if (response && response.statusCode == 200) {
          res.json({ login: JSON.parse(body).login });
        } else {
          res.send("Fail to validation");
        }
      });
    });
  }
});
AuthRouter.get("/revoke", (req: any, res: any) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    getAccessToken(req.session.passport.user.data[0].id).then((data: any[]) => {
      const revokeData: RevokeTokenData = {
        client_id: `${process.env.TWITCH_CLIENT_ID}`,
        token: `${data[0].access_token}`,
      };
      const options = {
        method: "POST",
        headers: { "Content-Type": `application/x-www-form-urlencoded` },
        body: qs.stringify(revokeData),
        url: "https://id.twitch.tv/oauth2/revoke",
      };

      AuthRequest(options, function (error: any, response: any, body: any) {
        if (response && response.statusCode == 200) {
          res.send("OK");
        } else {
          res.json(response.status);
        }
      });
    });
  }
});
async function getAccessToken(id: string): Promise<any> {
  return await runQuery(
    `SELECT access_token FROM token WHERE user_id = "${id}"`
  );
}
async function getRefreshToken(id: string): Promise<any> {
  return await runQuery(
    `SELECT refresh_token FROM token WHERE user_id = "${id}"`
  );
}
async function getProfileImage(id: string): Promise<any> {
  return await runQuery(
    `SELECT profile_image_url FROM streamer WHERE user_id = "${id}"`
  );
}
async function checkAdmin(id: string) {
  await runQuery(`SELECT user_id FROM streamer WHERE user_id = "${id}"`).then(
    (res: any[]) => {
      if (res.length === 1) return true;
      else false;
    }
  );
  return false;
}
module.exports = AuthRouter;
export {};
