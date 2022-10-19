import Image from "next/image";
import axios from "axios";
import useSWR from "swr";
export default function Home() {
  const { data, error, mutate } = useSWR(`/authenticate/validate`);
  async function getList() {
    return await axios.get("/twitch/getIndexStreamerList");
  }
  async function testChatServer() {
    return await axios.get("/test/session");
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
      <button
        type="button"
        onClick={() => {
          if (data) {
            testChatServer().then((res) => {
              console.log(res.data);
              console.log("good");
            });
          }
        }}
      >
        test chat server
      </button>
    </div>
  );
}
