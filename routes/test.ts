const TestExpress = require("express");
const TestRouter = TestExpress.Router();
const axios = require("axios").default;
TestRouter.get("/session", (req: any, res: any) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    const user = req.session.passport.user;
    connectWithChatServer(user.accessToken, user.data[0].login).then(
      (response) => {
        res.json(response);
      }
    );
  }
});

async function connectWithChatServer(token: string, login: string) {
  return await axios({
    method: "POST",
    url: "http://localhost:8080/chatbot/connect",
    data: { token: token, login: login },
    headers: {
      "Content-Type": "application/json",
    },
  });
}
module.exports = TestRouter;
export {};
