import { NextRouter, useRouter } from "next/router";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/BoardContent.module.css";
import React from "react";
import Image from "next/image";
import ReactDOM from "react-dom";
import { board_content } from "../types/content";

export default function BoardContent() {
  const [loading, setLoaing] = useState<Boolean>(false);
  const router = useRouter();
  const index = router.asPath.split("=")[1];
  const $content = useRef<NodeList>();

  const [data, setData] = useState<board_content>(null);
  async function addViewCount(contentID: string) {
    await axios.get(`/board/addViewCount/${contentID}`);
  }
  async function getContent() {
    return await axios.post(
      "/board/getContent",
      JSON.stringify({ id: index }),
      {
        headers: {
          "Content-Type": `application/json`,
        },
      }
    );
  }
  function convertDateNow(now: number): string {
    const date = new Date(now);
    return `${date.getFullYear()}년 ${
      date.getMonth() + 1
    }월 ${date.getDate()}일 ${date.getHours()}:${date.getMinutes()}`;
  }
  useEffect(() => {
    const display = document.getElementById("diplay-result");
    getContent().then((res) => {
      // console.log(res.data.content);

      const parsedHtmlTag = new DOMParser().parseFromString(
        res.data.content,
        "text/html"
      ).firstChild.lastChild.childNodes;

      $content.current = parsedHtmlTag;

      for (let i = 0; i < $content.current.length; ) {
        if ($content.current.item(i).childNodes.length > 1) {
          (
            $content.current.item(i).childNodes[0] as HTMLImageElement
          ).classList.add(styles.image);
        }
        display.append($content.current.item(i));
      }

      setData(res.data);
      setLoaing(true);
      console.log(router.query.index as string);
      addViewCount(router.query.index as string);
    });
  }, []);

  return (
    <div className="wrapper">
      <div className="header-wrapper">
        <div className="board-name">{data ? data.board : ""}</div>
        <div className="title">| 제목 | {data ? data.title : ""} |</div>
        <div className="title">| 작성자 | {data ? data.author : ""} |</div>
        <div className="title">
          | 작성일 | {data ? convertDateNow(data.update_date) : ""} |
        </div>
      </div>

      <div id="diplay-result" className="main-wrapper disable">
        {/* {data ? data.content : ""} */}
      </div>
      <style jsx>
        {`
          .wrapper {
            width: 90%;
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
            font-size: 26px;
            justify-content: space-between;
            border-bottom: 2px solid #e7f6f2;
          }

          .main-wrapper {
            margin: 10px 2px;
            word-break: break-all;
            padding: 15px 12px;
            text-align: left;
            font-size: 26px;
            height: 750px;
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
