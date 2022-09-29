import Image from "next/image";
import axios from "axios";
import useSWR from "swr";
export default function Home() {
  const { data, error, mutate } = useSWR(`/authenticate/validate`);
  async function getList() {
    return await axios.get("/twitch/getIndexStreamerList");
  }
  return (
    <div>
      <div>환영합니다</div>
      <button
        type="button"
        onClick={() => {
          if (data) {
            getList().then((res) => {
              console.log(res.data);
            });
          }
        }}
      >
        get list
      </button>
    </div>
  );
}
