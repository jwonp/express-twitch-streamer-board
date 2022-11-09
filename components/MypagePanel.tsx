import Link from "next/link";
import styles from "../styles/MypagePanel.module.css";
const MypagePanel = () => {
  return (
    <>
      <Link href={"/mypage/clips"}>
        <div className={`${styles.item}`}>클립</div>
      </Link>
      <Link href={"/mypage/contents"}>
        <div className={`${styles.item}`}>내가 쓴 글</div>
      </Link>
      <Link href={"/mypage/profile"}>
        <div className={`${styles.item}`}>프로필</div>
      </Link>
    </>
  );
};
export default MypagePanel;
