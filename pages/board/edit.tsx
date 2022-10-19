import IncorrectAccess from "../../components/IncorrectAccess";
import { useRouter } from "next/router";
import { createElement, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import styles from "../../styles/edit.module.css";
import axios from "axios";
import Image from "next/image";
import ContentBox from "../../components/ContentBox";
import React from "react";
import ReactDOM from "react-dom";
interface contentType {
  board: string;
  title: string;
  content: string;
}
function getTitleName(name: string | string[]): string {
  switch (name) {
    case "notice":
      return "공지사항";
    case "summary":
      return "컨텐츠 정리";
    case "result":
      return "컨텐츠 진행 결과";
    case "collabo":
      return "콜라보 제의";
    default:
      return "";
  }
}

export default function edit() {
  const { data, error, mutate } = useSWR(`/authenticate/validate`);
  const router = useRouter();

  const $copyContent = useRef<HTMLTextAreaElement>();
  const $title = useRef<HTMLInputElement>();
  const $content = useRef<HTMLDivElement>();
  const $addContent = useRef<HTMLDivElement>();
  const init_ID = `${Date.now()}`;
  useEffect(() => {}, []);
  async function uploadImage(files: FileList): Promise<any> {
    const file = files[0];
    const data = new FormData();

    data.append("image", file);
    data.append("text", file.name.substring(file.name.length - 3));

    return await axios({
      method: "POST",
      url: `/file/upload`,
      data: data,
      headers: {
        "Content-Type": "multipart/form-data;charset=utf-8",
      },
    });
  }
  function copyContent() {
    const children = $content.current.children;
    let cnt = 0;
    while (cnt < children.length - 1) {
      let id = children.item(cnt).id;
      let textarea = document.getElementById(
        `textarea${id}`
      ) as HTMLTextAreaElement;

      $copyContent.current.append(`<div>`);
      const WIDTH = "50%";
      const MARGIN = "33%";
      let img = document.getElementById(`img@${id}`) as HTMLImageElement;
      if (img) {
        img.removeAttribute("style");
        img.removeAttribute("data-nimg");
        img.removeAttribute("decoding");
        img.removeAttribute("srcset");
        img.removeAttribute("id");
        img.src = img.src.split("url=")[1].split("&w")[0];
        $copyContent.current.append(img.outerHTML);
      }

      $copyContent.current.append(`<p>${textarea.value}</p>`);
      $copyContent.current.append("</div>");
      cnt += 1;
    }
  }
  async function uploadContent() {
    const data: contentType = {
      board: router.query.name as string,
      title: $title.current.value,
      content: $copyContent.current.value.replaceAll('"', ""),
    };
    return await axios.post("/board/uploadContent", JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
  function submit() {
    copyContent();
    uploadContent().then((res) => {
      router.push(`/board/${router.query.name}`);
    });
  }
  function addContentBox() {
    const wrapper = document.createElement("div");
    const id = `${Date.now()}`;
    wrapper.id = id;
    const contentBox: JSX.Element = React.createElement(ContentBox, {
      src: null,
      id: id,
    });
    ReactDOM.render(contentBox, wrapper);
    $content.current.insertBefore(wrapper, $addContent.current);
  }
  if (data && data.login) {
    return (
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.editorHeader}`}>
          <div className={`${styles.boardName}`}>
            {getTitleName(router.query.name)}
          </div>
          <div className={`${styles.titleWrapper}`}>
            <label htmlFor="title" className={`${styles.titleLabel}`}>
              title
            </label>
            <input
              type="text"
              id="title"
              ref={$title}
              className={`${styles.titleInput}`}
            ></input>
          </div>
          <button
            className={`${styles.submit} ${styles.btn}`}
            onClick={() => {
              submit();
            }}
          >
            완료
          </button>
        </div>
        <div className={`${styles.editorBody}`}>
          <div className={`${styles.toolbar}`}>
            <textarea
              ref={$copyContent}
              id="copyContent"
              className={`${styles.hidden}`}
            />
            <input
              type="file"
              name="file"
              accept="image/png, image/jpeg"
              id="imgInput"
              onChange={(e) => {
                uploadImage(e.target.files).then((res) => {
                  console.log(res.data);
                });
              }}
              className={`${styles.hidden}`}
            />
          </div>

          <div id="content" ref={$content} className={`${styles.content}`}>
            <div id={init_ID}>
              <ContentBox src={""} id={init_ID} />
            </div>
            <div
              ref={$addContent}
              id="addContent"
              className={`${styles.contentAddBtn}`}
              onClick={() => {
                addContentBox();
              }}
            >
              Add More Article
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    if (error) return <IncorrectAccess />;
    else return <div>loading...</div>;
  }
}
