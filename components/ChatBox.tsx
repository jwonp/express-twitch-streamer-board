import { useEffect, useRef } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { reqGETbyClient } from "../funcs/request";
export default function ChatBox() {
  const socket = useRef<Socket>(null);
  const $chatContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    reqGETbyClient("/user/getUserIDandLogin").then((res) => {
      console.log(res.data);
      socket.current = io("http://localhost:4000", {
        query: res.data,
        withCredentials: true,
        extraHeaders: {
          "my-custom-header": "abcd",
        },
      });

      socket.current.on("connect", () => {
        console.log(socket.current.id);
      });

      socket.current.on("chat", (arg) => {
        console.log(arg);
        if ($chatContainer.current) {
          const chatLine = document.createElement("div");
          chatLine.innerText = arg;
          $chatContainer.current.appendChild(chatLine);
        }
      });
      socket.current.on("socketID", (arg) => {
        console.log(arg);
      });
      // connectTwtichWS();
    });
  }, []);
  async function connectTwtichWS() {
    await axios.get("/websocket/connectTwitchServer");
  }
  return (
    <div>
      <div>hi</div>
      <div ref={$chatContainer} className="chatContainer"></div>
    </div>
  );
}
