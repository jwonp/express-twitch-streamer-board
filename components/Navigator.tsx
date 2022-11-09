import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import styles from "../styles/NavigatorBar.module.css";
import Image from "next/image";
import BoardPanel from "./BoardPanel";
import MypagePanel from "./MypagePanel";
import { useRouter } from "next/router";
import { routerPath } from "../types/routePaths";
import { switchChatbot } from "../redux/features/chatbotSwitch";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
export default function Navigator() {
  async function logout() {
    await axios.get("/authenticate/revoke");
    mutate({ id: null });
    router.push("/login");
  }
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState("");
  const { data, mutate } = useSWR(`/authenticate/validate`);
  const dispatch = useAppDispatch();
  const isChatbot = useAppSelector((state) => state.chatbotSwitch.value);
  useEffect(() => {
    axios({
      method: "get",
      url: `/authenticate/getProfileImage`,
    }).then((res) => {
      setImgSrc(res.data.imgSrc);
    });
  }, []);

  return (
    <nav className={styles.globalnav}>
      <div className={styles.container}>
        <div className={`${styles.section} ${styles.start}`}>
          {data && data.id ? (
            <div className={`${styles.item}`}>
              <Image src={imgSrc} width={30} height={30} />
            </div>
          ) : (
            <></>
          )}
          {data && data.id ? (
            <Link href={"/"}>
              <div className={`${styles.item}`}>{data.login}</div>
            </Link>
          ) : (
            <div></div>
          )}
        </div>
        <div className={`${styles.section} ${styles.center}`}>
          {data && data.id ? (
            router.route.startsWith(routerPath.mypage) ? (
              <MypagePanel />
            ) : (
              <BoardPanel />
            )
          ) : (
            <div className={`${styles.center}`}></div>
          )}
        </div>
        <div className={`${styles.container} ${styles.end}`}>
          <div
            className={`${styles.item}`}
            onClick={() => {
              dispatch(switchChatbot());
            }}
          >
            {isChatbot ? "chatbot off" : "chatbot on"}
          </div>
          {data && data.id ? (
            <div onClick={logout} className={`${styles.item}`}>
              로그아웃
            </div>
          ) : (
            <Link href={"/login"}>
              <div className={`${styles.item}`}>로그인</div>
            </Link>
          )}
          {data && data.id ? (
            router.route.startsWith(routerPath.mypage) ? (
              <Link href={"/"}>
                <div className={`${styles.item}`}>메인으로</div>
              </Link>
            ) : (
              <Link href={"/mypage"}>
                <div className={`${styles.item}`}>마이페이지</div>
              </Link>
            )
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </nav>
  );
}
