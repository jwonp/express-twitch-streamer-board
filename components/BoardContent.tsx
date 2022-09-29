import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import React from "react";
import Image from "next/image";
import ReactDOM from "react-dom";
interface dataType {
  content_id: string;
  title: string;
  author: string;
  date: number;
  update_date: number;
  content: string;
}
export default function BoardContent() {
  const [loading, setLoaing] = useState<Boolean>(false);

  const router = useRouter();

  const $content = useRef<HTMLCollection>();
  const contentIdx = router.query.index;
  const [data, setData] = useState<dataType>(null);

  async function getContent() {
    return await axios.post(
      "/board/getContent",
      JSON.stringify({ id: contentIdx }),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }

  useEffect(() => {
    const display = document.getElementById("diplay-result");
    console.log(display);
    getContent().then((res) => {
      console.log(res.data.content);
      $content.current = (
        new DOMParser().parseFromString(res.data.content, "text/html")
          .firstChild.lastChild as HTMLBodyElement
      ).children;
      console.log($content.current);
      for (let i = 0; i < $content.current.length; i++) {
        console.log($content.current.item(i));
        if ($content.current.item(i).id.startsWith("/upload")) {
          const ID = $content.current.item(i).id;
          const imgDiv = document.createElement("div");

          const img = document.createElement("img");
          img.src = ID;

          const heightRatio = img.height / 350;
          console.log(heightRatio);
          if (heightRatio > 1) {
            img.height = 350;
            img.width = img.width / heightRatio;
          }
          imgDiv.style.width = "100%";
          imgDiv.style.margin = "0 auto";
          imgDiv.style.display = "flex";
          imgDiv.style.justifyContent = "center";

          imgDiv.appendChild(img);
          display.appendChild(imgDiv);
        } else {
          display.appendChild($content.current.item(i));
        }
      }

      // console.log($wrapper.current.childNodes);
      setData(res.data);
      setLoaing(true);
    });
  }, []);

  return (
    <div className="wrapper">
      <div className="header-wrapper">
        <div className="board-name"></div>
        <div className="title">
          <label htmlFor="title" className="title-label">
            {data ? data.title : ""}
          </label>
          <div>{data ? data.author : ""}</div>
          <div>{data ? data.date : ""}</div>
        </div>
      </div>
      <div id="diplay-result" className="main-wrapper disable">
        {/* {data ? data.content : ""} */}
      </div>
      <style jsx>
        {`
          .wrapper {
            width: 80%;
            margin: 0 auto;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
          }
          .header-wrapper {
            padding: 8px 3px;
            padding-bottom: 12px;
            display: flex;

            justify-content: space-between;
            border-bottom: 2px solid #e7f6f2;
          }
          .board-name {
            font-size: 32px;
            padding: 2px;
            margin-right: 20px;
          }
          .title {
            border: 1px solid #e7f6f2;
            border-radius: 7px;
            padding: 0 15px;
          }
          .title-label {
            font-size: 24px;
            margin-right: 10px;
          }
          .main-wrapper {
            margin: 10px 2px;
            word-break: break-all;
            padding: 15px 12px;
            text-align: left;
            height: 350px;
            border: 1px solid #e7f6f2;
            border-radius: 8px;
            overflow-x: hidden;
            overflow-y: scroll;
            outline: none;
          }
          .main-wrapper::-webkit-scrollbar {
            display: none;
          }
          .main-wrapper::-webkit-scrollbar-thumb {
            display: none;
          }
          .main-wrapper::-webkit-scrollbar-track {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
