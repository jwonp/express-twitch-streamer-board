import Navigator from "./Navigator";
import styles from "../styles/Layout.module.css";
import ChatBox from "./ChatBox";
import useSWR from "swr";
export default function Layout(props: { children: JSX.Element }) {
  const { data, error, mutate } = useSWR(`/authenticate/validate`);
  return (
    <div className={styles.wrapper}>
      <Navigator />

      <div className={styles.content}>
        <div id={"root-layout"} className={styles.container}>
          {props.children}
        </div>

        <div className={styles.streamerMode}>{data ? <ChatBox /> : <></>}</div>
      </div>
    </div>
  );
}
