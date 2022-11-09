// const FileExpress = require("express");
import { express } from "../server";
const FileRouter = express.Router();
const axios = require("axios").default;
const fs = require("fs");
const FormData = require("form-data");

FileRouter.post("/upload", function (req: any, res: any) {
  const form = new FormData();
  form.append("image", req.files.image.data);
  form.append("name", req.body.text);
  sendImage(form).then((response) => {
    console.log(response.data);
    res.json(response.data);
  });
  // async () => {
  //
  // };

  // const uploadPath = appRoot + "/public/upload/" + sampleFile.name;
  // let id = "";
  // if (req.session && req.session.passport && req.session.passport.user) {
  //   id = req.session.passport.user.data[0].id;
  // }
  // // Use the mv() method to place the file somewhere on your server
  // const filename = sampleFile.name.split(".");
  // const renamed = `${id}${Date.now()}.${filename[1]}`;
  // sampleFile.mv(uploadPath, function (err: any) {
  //   if (err) return res.status(500).send(err);
  //   rename(
  //     appRoot + "/public/upload/" + sampleFile.name,
  //     appRoot + "/public/upload/" + renamed,
  //     (err) => {
  //       if (err) throw err;
  //       res.json(renamed);
  //     }
  //   );
  // });
});

module.exports = FileRouter;
export {};

async function sendImage(img: any) {
  return await axios({
    method: "POST",
    url: "http://localhost:8888/files/uploadImage",
    data: img,
    headers: {
      "Content-Type": "multipart/form-data;charset=utf-8",
    },
  });
}

// FileRouter.get("/getFileList", (req: any, res: any) => {
//   const directoryPath = path.join(appRoot, "public", "upload");
//   fs.readdir(directoryPath, function (err: any, files: any[]) {
//     res.json(files);
//   });
// });

// FileRouter.get("/changeFileList", (req: any, res: any) => {
//   const list: string[] = [];
//   //joining path of directory
//   const directoryPath = path.join(appRoot, "public", "upload");
//   //passsing directoryPath and callback function
//   fs.readdir(directoryPath, function (err: any, files: any[]) {
//     //handling error
//     if (err) {
//       return console.log("Unable to scan directory: " + err);
//     }
//     // res.json(files);
//     // listing all files using forEach

//     files.forEach(function (file) {
//       const filename = file.split(".");
//       rename(
//         appRoot + "/public/upload/" + file,
//         appRoot +
//           "/public/upload/" +
//           `${Math.ceil(Math.random() * 10000)}.${filename[1]}`,
//         (err) => {
//           if (err) throw err;
//           console.log("Rename complete!");
//         }
//       );
//     });
//   });
// });
