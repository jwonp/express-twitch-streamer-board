import Link from "next/link";
import styles from "../styles/BoardPanel.module.css";
const BoardPanel = () => {
  return (
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
  );
};
export default BoardPanel;
