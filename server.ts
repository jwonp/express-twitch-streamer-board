const dotenv = require("dotenv");
const result = dotenv.config({ path: "./.env" });

const express = require("express");
const next = require("next");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const OAuth2Strategy = require("passport-oauth").OAuth2Strategy;
const request = require("request");
const handlebars = require("handlebars");
const fileUpload = require("express-fileupload");

import mysqlPool from "./db";

const AuthRouter = require("./routes/authenticate");
const FileRouter = require("./routes/file");
const BoardRouter = require("./routes/board");
const TwitchRouter = require("./routes/twitch");
const TestRouter = require("./routes/test");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const TWITCH_SECRET = process.env.TWITCH_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;

app.prepare().then(() => {
  const server = express();
  server.use(
    session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false })
  );
  server.use(express.static("public"));
  server.use(express.json());
  server.use(express.urlencoded({ extends: false }));
  server.use(bodyParser.urlencoded({ extends: true }));
  server.use(bodyParser.text());
  server.use(bodyParser.json());
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(
    fileUpload({
      limits: { fileSize: 50 * 1024 * 1024 },
      uriDecodeFileNames: true,
    })
  );

  server.use("/authenticate", AuthRouter);
  server.use("/file", FileRouter);
  server.use("/board", BoardRouter);
  server.use("/twitch", TwitchRouter);
  server.use("/test", TestRouter);
  // If user has an authenticated session, display it, otherwise display link to authenticate
  server.get("/success", function (req: any, res: any) {
    if (req.session && req.session.passport && req.session.passport.user) {
      res.send(req.session.passport.user);
    } else {
      res.send("Fail to login");
    }
  });
  // Set route to start OAuth link, this is where you define scopes to request
  server.get(
    "/auth/twitch",
    passport.authenticate("twitch", {
      scope:
        "user:read:email user:read:follows user:read:subscriptions chat:edit chat:read",
    })
  );

  // Set route for OAuth redirect
  server.get(
    "/auth/twitch/callback",
    passport.authenticate("twitch", {
      successRedirect: "/board/notice",
      failureRedirect: "/login",
    })
  );
  server.all("*", (req: any, res: any, next: any) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});

// Override passport profile function to get user profile from Twitch API
OAuth2Strategy.prototype.userProfile = function (
  accessToken: string,
  done: any
) {
  var options = {
    url: "https://api.twitch.tv/helix/users",
    method: "GET",
    headers: {
      "Client-ID": TWITCH_CLIENT_ID,
      Accept: "application/vnd.twitchtv.v5+json",
      Authorization: "Bearer " + accessToken,
    },
  };

  request(options, function (error: any, response: any, body: any) {
    if (response && response.statusCode == 200) {
      done(null, JSON.parse(body));
    } else {
      done(JSON.parse(body));
    }
  });
};

passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.use(
  "twitch",
  new OAuth2Strategy(
    {
      authorizationURL: "https://id.twitch.tv/oauth2/authorize",
      tokenURL: "https://id.twitch.tv/oauth2/token",
      clientID: TWITCH_CLIENT_ID,
      clientSecret: TWITCH_SECRET,
      callbackURL: CALLBACK_URL,
      state: true,
    },
    function (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) {
      profile.accessToken = accessToken;
      profile.refreshToken = refreshToken;
      console.log("data", profile.data);
      mysqlPool.getConnection(function (err: any, connection: any) {
        if (err) throw err;
        connection.query(
          `SELECT * FROM streamer WHERE user_id = "${profile.data[0].id}"`,
          function (error: any, results: any, fields: any) {
            if (results.length === 0) {
              connection.query(
                `INSERT INTO streamer VALUES ("${profile.data[0].id}","${
                  profile.data[0].login
                }","${profile.data[0].display_name}","${
                  profile.data[0].profile_image_url
                }","${
                  profile.data[0].type === "" ? "NONE" : profile.data[0].type
                }","${
                  profile.data[0].broadcaster_type === ""
                    ? "NONE"
                    : profile.data[0].type
                }")`,
                function (error: any, results: any, fields: any) {
                  if (error) throw error;
                }
              );
              connection.query(
                `INSERT INTO token VALUES ("${profile.data[0].id}","${profile.accessToken}","${profile.refreshToken}")`,
                function (error: any, results: any, fields: any) {
                  if (error) throw error;
                  console.log(results);
                }
              );
            } else {
              if (results[0].display_name !== profile.data[0].display_name) {
                connection.query(
                  `UPDATE streamer SET display_name = "${profile.data[0].display_name}" WHERE user_id = "${profile.data[0].id}"`,
                  function (error: any, results: any, fields: any) {
                    if (error) throw error;
                  }
                );
              }
              if (results[0].type !== profile.data[0].type) {
                connection.query(
                  `UPDATE streamer SET type = "${profile.data[0].type}" WHERE user_id = "${profile.data[0].id}"`,
                  function (error: any, results: any, fields: any) {
                    if (error) throw error;
                  }
                );
              }
              if (
                results[0].broadcaster_type !== profile.data[0].broadcaster_type
              ) {
                connection.query(
                  `UPDATE streamer SET broadcaster_type = "${profile.data[0].broadcaster_type}" WHERE user_id = "${profile.data[0].id}"`,
                  function (error: any, results: any, fields: any) {
                    if (error) throw error;
                  }
                );
              }
              connection.query(
                `UPDATE token SET access_token = "${profile.accessToken}" , refresh_token = "${profile.refreshToken}" WHERE user_id = "${profile.data[0].id}"`,
                function (error: any, results: any, fields: any) {
                  if (error) throw error;
                }
              );
            }

            connection.release();
            if (error) throw error;
          }
        );
      });

      done(null, profile);
    }
  )
);

// Define a simple template to safely generate HTML with values from user's profile
var template = handlebars.compile(`
<html><head><title>Twitch Auth Sample</title></head>
<table>
    <tr><th>Access Token</th><td>{{accessToken}}</td></tr>
    <tr><th>Refresh Token</th><td>{{refreshToken}}</td></tr>
    <tr><th>Display Name</th><td>{{display_name}}</td></tr>
    <tr><th>Bio</th><td>{{bio}}</td></tr>
    <tr><th>Image</th><td>{{logo}}</td></tr>
</table></html>`);

export {};
