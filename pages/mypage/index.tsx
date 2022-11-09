import IncorrectAccess from "../../components/IncorrectAccess";
import useSWR from "swr";
export default function mypage() {
  const { data, error, mutate } = useSWR(`/authenticate/validate`);
  if (data) {
    return (
      <>
        <div>mypage</div>
      </>
    );
  } else {
    if (error) return <IncorrectAccess />;
    else return <div>loading...</div>;
  }
}
