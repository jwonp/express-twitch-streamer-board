import { express } from "../server";
import { excuteSelect } from "../funcs/excuteSql";
const UserRouter = express.Router();
UserRouter.get("/getUserIDandLogin", (req: any, res: any) => {
  if (req.session && req.session.passport && req.session.passport.user) {
    const userData = req.session.passport.user.data[0];
    res.json({ id: userData.id, login: userData.login });
  }
});
UserRouter.post("/getToken", (req: any, res: any) => {
  excuteSelect(`access_token`, `token`, `user_id=${req.body.id}`).then(
    (result: any) => {
      res.json(result[0].access_token);
    }
  );
});

module.exports = UserRouter;
