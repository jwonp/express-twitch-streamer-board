import IncorrectAccess from "../../components/IncorrectAccess";
import useSWR from "swr";
import { reqGETbyClient } from "../../funcs/request";
import { useEffect, useState } from "react";
const clips = () => {
  const { data, error, mutate } = useSWR(`/authenticate/validate`);
  // useEffect(() => {
  //   reqGETbyClient("/board/getContentsByUser").then((res) => {
  //     setcontentList(res.data);
  //   });
  // }, []);
  if (data && data.id) {
    return (
      <div>
        <div className="title">클립</div>
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

export default clips;
