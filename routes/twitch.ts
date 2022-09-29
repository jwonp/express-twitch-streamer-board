import { noSSR } from "next/dynamic";

const TwitchExpress = require("express");
const TwitchRouter = TwitchExpress.Router();
const axios = require("axios").default;
TwitchRouter.get("/getIndexStreamerList", function (req: any, res: any) {
  if (req.session && req.session.passport && req.session.passport.user) {
    const userData = req.session.passport.user;

    console.log("id", userData.data[0].id);
    console.log("accessToken", userData.accessToken);
    getFollowedStreams(userData.data[0].id, userData.accessToken).then(
      (results) => {
        res.json(results.data);
      }
    );
  }
});

async function getFollowedStreams(id: string, token: string) {
  return await axios({
    method: "GET",
    url: `https://api.twitch.tv/helix/streams/followed?user_id=${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      "Client-Id": process.env.TWITCH_CLIENT_ID,
    },
  });
}
module.exports = TwitchRouter;
export {};
