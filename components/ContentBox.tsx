import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/contentBox.module.css";

interface propsType {
  src: string;
  id: string;
}
export default function ContentBox(props: propsType) {
  const [src, setSrc] = useState<string>(null);
  const [withImage, setWithImage] = useState<boolean>(false);
  useEffect(() => {
    setSrc(props.src);
  }, []);
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
  function deleteContentBox() {
    const content = document.getElementById("content");
    const target = document.getElementById(props.id);
    if (content && target) {
      content.removeChild(target);
    }
  }
  return (
    <div className={`${styles.contentBox}`}>
      <div
        className={`${withImage ? styles.contentImageWrapper : styles.hidden}`}
        onClick={() => {
          console.log("clicked");
          document.getElementById(`imgInput${props.id}`).click();
        }}
      >
        <Image
          id={withImage ? `img@${props.id}` : ``}
          // className={`${styles.contentImage}`}
          src={src ? src : "/like.png"}
          width={140}
          height={200}
        />
      </div>
      <textarea
        id={`textarea${props.id}`}
        className={`${styles.contentTextarea} ${
          withImage ? styles.width65 : styles.width90
        }`}
        name={props.id}
      ></textarea>
      <div className={`${styles.contentBtnBox}`}>
        <a
          href={`#${props.id}`}
          className={`${styles.contentBtn}`}
          onClick={() => {
            const target = document.getElementById(props.id);
            const previoisSibling = target.previousElementSibling;
            if (previoisSibling) previoisSibling.before(target);
          }}
        >
          up
        </a>
        <a
          href={`#${props.id}`}
          className={`${styles.contentBtn}`}
          onClick={() => {
            const target = document.getElementById(props.id);
            const nextSibling = target.nextElementSibling;

            if (
              nextSibling &&
              nextSibling.id &&
              nextSibling.id !== "addContent"
            ) {
              nextSibling.after(target);
            }
          }}
        >
          down
        </a>
        <button
          className={`${styles.contentBtn}`}
          onClick={() => {
            const textarea = document.getElementById(
              `textarea${props.id}`
            ) as HTMLTextAreaElement;
            textarea.value = "";
          }}
        >
          clear
        </button>
        <button
          className={`${styles.contentBtn}`}
          onClick={() => {
            deleteContentBox();
          }}
        >
          delete
        </button>
        <button
          className={`${styles.contentBtn}`}
          onClick={() => {
            setWithImage(!withImage);
          }}
        >
          {withImage ? "Only Text" : "With Image"}
        </button>
        <input
          type="file"
          name="file"
          accept="image/png, image/jpeg"
          id={`imgInput${props.id}`}
          onChange={(e) => {
            uploadImage(e.target.files).then((res) => {
              setSrc(res.data);
            });
          }}
          className={`${styles.hidden}`}
        />
      </div>
    </div>
  );
}
