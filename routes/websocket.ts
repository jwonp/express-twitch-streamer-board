// const WebSocketExpress = require("express");
import { express } from "../server";
const WebSocketRouter = express.Router();
const axios = require("axios").default;
WebSocketRouter.get("/connectTwitchServer", (req: any, res: any) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    const user = req.session.passport.user;
    connectWithChatServer(
      user.accessToken,
      user.data[0].login,
      user.data[0].id
    ).then((response) => {
      res.json(response);
    });
  }
});
WebSocketRouter.get("/connectChatBotServer", (req: any, res: any) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    const user = req.session.passport.user;
    connectWithChatServer(
      user.accessToken,
      user.data[0].login,
      user.data[0].id
    ).then((response) => {
      res.json(response);
    });
  }
});
async function connectWithChatServer(token: string, login: string, id: string) {
  return await axios({
    method: "POST",
    url: "http://localhost:8080/chatbot/connectTwitchServer",
    data: { token: token, login: login, id: id },
    headers: {
      "Content-Type": "application/json",
    },
  });
}
module.exports = WebSocketRouter;
export {};
