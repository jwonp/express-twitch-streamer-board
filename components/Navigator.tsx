import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import styles from "../styles/NavigatorBar.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Navigator() {
  async function logout() {
    await axios.get("/authenticate/revoke");
    mutate({ login: null });
    router.push("/login");
  }
  const router = useRouter();
  const [imgSrc, setImgSrc] = useState("");
  const { data, mutate } = useSWR(`/authenticate/validate`);
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
          {data && data.login ? (
            <div className={`${styles.item}`}>
              <Image src={imgSrc} width={30} height={30} />
            </div>
          ) : (
            <div></div>
          )}
          {data && data.login ? (
            <Link href={"/"}>
              <div className={`${styles.item}`}>{data.login}</div>
            </Link>
          ) : (
            <div></div>
          )}
        </div>

        <div className={`${styles.section} ${styles.center}`}>
          {data && data.login ? (
            <>
              <Link href={"/board/notice"}>
                <div className={`${styles.item}`}>공지사항</div>
              </Link>
              <Link href={"/board/summary"}>
                <div className={`${styles.item}`}>컨텐츠 정리</div>
              </Link>
              <Link href={"/board/result"}>
                <div className={`${styles.item}`}>컨텐츠 진행 결과</div>
              </Link>
              <Link href={"/board/collabo"}>
                <div className={`${styles.item}`}>콜라보 제의</div>
              </Link>
            </>
          ) : (
            <div className={`${styles.center}`}></div>
          )}
        </div>

        <div className={`${styles.container} ${styles.end}`}>
          {data && data.login ? (
            <div onClick={logout} className={`${styles.item}`}>
              로그아웃
            </div>
          ) : (
            <Link href={"/login"}>
              <div className={`${styles.item}`}>로그인</div>
            </Link>
          )}
          {data && data.login ? (
            <div className={`${styles.item}`}>마이페이지</div>
          ) : (
            <div></div>
          )}
          {/* <div className={`${styles.item}`}>고객센터</div> */}
        </div>
      </div>
    </nav>
  );
}
