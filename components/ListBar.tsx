import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { list_bar } from "../types/content";
const likeSize = 11;

function convertNumberToData(now: number) {
  const date = new Date(now);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}
export default function ListBar(props: { data: list_bar }) {
  const [title, setTitle] = useState("No Title");
  const [author, setAuthor] = useState("No Author");
  const [views, setViews] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [date, setDate] = useState("0");
  const router = useRouter();
  useEffect(() => {
    if (props.data.title !== title) setTitle(props.data.title);
    if (props.data.author !== author) setAuthor(props.data.author);
    if (props.data.views !== views) setViews(props.data.views);
    if (convertNumberToData(props.data.date) !== date) {
      setDate(convertNumberToData(props.data.date));
    }
    getLike();
  }, [props]);
  async function clickLike() {
    await axios.get(`/board/setLike/${props.data.id}`).then((res) => {
      setIsLiked(res.data.isLiked);
      setLikes(res.data.count);
    });
  }
  async function getLike() {
    await axios.get(`/board/getLike/${props.data.id}`).then((res) => {
      setIsLiked(res.data.isLiked);
      setLikes(res.data.count);
    });
  }

  return (
    <>
      <div className="container">
        <Link href={`${router.asPath}/content?index=${props.data.id}`}>
          <span className="title">{title}</span>
        </Link>
        <div className="meta">
          <span className="author">{`${author}`}</span>
          <span className="views">{` : 조회수  ${views} : `}</span>
          <span
            className="likes"
            onClick={() => {
              clickLike();
            }}
          >
            {isLiked ? (
              <Image src={"/liked.png"} width={likeSize} height={likeSize} />
            ) : (
              <Image src={"/like.png"} width={likeSize} height={likeSize} />
            )}
            {` ${likes} : `}
          </span>
          <span className="date">{date}</span>
        </div>
      </div>
      <style jsx>{`
        .container {
          padding: 2px 20px;
          margin: 9px 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          border: 1px solid #e7f6f2;
          border-radius: 7px;
          justify-content: space-between;
          cursor: pointer;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .meta {
          font-size: 13px;
          padding: 4px;
        }
        .title {
          font-size: 19px;
          text-align: left;
          width: 40%;
        }
        .author {
          font-size: 17px;
        }
        .views {
          z-index: 9999;
        }
        .likes {
          z-index: 9999;
        }
      `}</style>
    </>
  );
}
