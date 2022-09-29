import IncorrectAccess from "../../components/IncorrectAccess";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import styles from "../../styles/edit.module.css";
import axios from "axios";
import Image from "next/image";
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
  const [imgSrc, setImgSrc] = useState<string>("");
  const $content = useRef<HTMLDivElement>();
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
  function attachImageOnContent(url: string) {
    const divTag = document.createElement("div");
    const imgTag = document.createElement("img");

    divTag.classList.add(styles.contentImgWrapper);

    imgTag.src = url;
    imgTag.classList.add(styles.contentImg);

    divTag.appendChild(imgTag);
    $content.current.appendChild(imgTag);
  }
  if (data && data.login) {
    return (
      <div className={`${styles.wrapper}`}>
        <div className={`${styles.editorHeader}`}>
          <div className={`${styles.boardName}`}>
            {getTitleName(router.query.name)}
          </div>
          <button
            className={`${styles.submit} ${styles.btn}`}
            onClick={() => {}}
          >
            완료
          </button>
        </div>
        <div className={`${styles.editorBody}`}>
          <div className={`${styles.toolbar}`}>
            <button
              type="button"
              className={`${styles.imgInsert} ${styles.btn}`}
              onClick={() => {
                document.getElementById("imgInput").click();
              }}
            >
              이미지 삽입
            </button>
            <input
              type="file"
              name="file"
              accept="image/png, image/jpeg"
              id="imgInput"
              onChange={(e) => {
                uploadImage(e.target.files).then((res) => {
                  attachImageOnContent(res.data);
                });
              }}
              //   className={`${styles.hidden}`}
            />
          </div>
          <div
            ref={$content}
            className={`${styles.content}`}
            contentEditable={true}
          ></div>
          <textarea id="copyContent" className={`${styles.hidden}`}></textarea>
        </div>
      </div>
    );
  } else {
    if (error) return <IncorrectAccess />;
    else return <div>loading...</div>;
  }
}
