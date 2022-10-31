import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import axios from "axios";

export default function ChatBox() {
  const socket = useRef<Socket>(null);
  useEffect(() => {
    connectTwtichWS().then(() => {
      socket.current = io("http://localhost:4000", {
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd",
        },
      });
      socket.current.on("connect", () => {
        console.log(socket.current.id);
      });
      socket.current.on("hello", (arg) => {
        console.log(arg);
      });
    });
  }, []);
  async function connectTwtichWS() {
    await axios.get("/test/session");
  }
  return <div>hi</div>;
}
