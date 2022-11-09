import ListWrapper from "../components/ListWrapper";
import ListTitle from "../components/ListTitle";
import useSWR from "swr";
import IncorrectAccess from "../components/IncorrectAccess";
export default function BoardList(props: { name: string }) {
  const { data, error, mutate } = useSWR(`/authenticate/validate`);
  if (data) {
    return (
      <div className="wrapper">
        <ListTitle name={props.name} />
        <ListWrapper name={props.name} />
        <style jsx>
          {`
            .wrapper {
              width: 70%;
              margin: 0 auto;
            }
          `}
        </style>
      </div>
    );
  } else {
    if (error) return <IncorrectAccess />;
    else return <div>loading...</div>;
  }
}
