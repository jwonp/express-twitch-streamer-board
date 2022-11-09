import IncorrectAccess from "../../components/IncorrectAccess";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { reqGETbyClient } from "../../funcs/request";
import { mypage_content_list_bar } from "../../types/content";
import MypageListBar from "../../components/MypageListBar";

const contents = () => {
  const { data, error, mutate } = useSWR(`/authenticate/validate`);
  const [contentList, setcontentList] =
    useState<mypage_content_list_bar[]>(null);
  useEffect(() => {
    reqGETbyClient("/board/getContentsByUser").then((res) => {
      setcontentList(res.data);
    });
  }, []);
  if (data && data.id) {
    return (
      <div>
        <div className="title">내가 쓴 글</div>
        {contentList && contentList.length ? (
          contentList.map((item: mypage_content_list_bar, index: number) => (
            <MypageListBar key={index} data={item} />
          ))
        ) : (
          <div>작성한 글이 없습니다.</div>
        )}
        <style jsx>{`
          .title {
            font-size: xx-large;
            font-weight: bold;
            padding: 1% 0;
            margin-bottom: 3%;
            border-bottom: 1px solid #e7f6f2;
          }
        `}</style>
      </div>
    );
  } else {
    if (error) return <IncorrectAccess />;
    else return <div>loading...</div>;
  }
};

export default contents;
