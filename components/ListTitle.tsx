import Link from "next/link";
import { getEngToKorean } from "../funcs/convertBoardTitle";
export default function ListTitle(props: { name: string }) {
  return (
    <>
      <div className="wrapper">
        <div className="title">{getEngToKorean[props.name]}</div>
        <span className="search-bar">검색창</span>
        <Link href={{ pathname: "/board/edit", query: { name: props.name } }}>
          <span className="edit">글쓰기</span>
        </Link>
      </div>
      <style jsx>{`
        .wrapper {
          border: 1px soild #395b64;
          border-bottom: 1px solid #e7f6f2;
          display: flex;
          justify-content: space-between;
          -moz-user-select: none;
          -webkit-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .title {
          font-size: 36px;
          text-align: left;
          margin: 2px 20px;
        }
        .search-bar {
          padding: 10px 0;
          margin: 2px 0;
          width: 40%;
          border: 1px solid #e7f6f2;
        }
        .edit {
          padding: 10px 0;
          margin: 2px 20px;
          margin-right: 25px;
          text-decoration: none;
        }
      `}</style>
    </>
  );
}
