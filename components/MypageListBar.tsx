import Link from "next/link";
import { useRouter } from "next/router";
import { mypage_content_list_bar } from "../types/content";
import { routerPath } from "../types/routePaths";
import { getShortToEng, getShortToKorean } from "../funcs/convertBoardTitle";
import { convertDateNowToDate } from "../funcs/convertDateNowToDate";
import styles from "../styles/MypageListBar.module.css";
import { hideOverflowString } from "../funcs/hideOverflowString";
const MypageListBar = (props: {
  key: number;
  data: mypage_content_list_bar;
}) => {
  const router = useRouter();
  return (
    <Link
      href={`${routerPath.board}/${getShortToEng[props.data.board]}${
        routerPath.content
      }?index=${props.data.content_id}`}
    >
      <div className={styles.wrapper}>
        <div className={`${styles.item} ${styles.marginLeft}`}>
          {getShortToKorean[props.data.board]}
        </div>
        <div className={styles.item}>
          {hideOverflowString(props.data.title, 12)}
        </div>
        <div
          className={`${styles.item} ${styles.marginRight} ${styles.textAlignRight}`}
        >
          {convertDateNowToDate(props.data.update_date)}
        </div>
      </div>
    </Link>
  );
};

export default MypageListBar;
