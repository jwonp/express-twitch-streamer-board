import Navigator from "./Navigator";
import styles from "../styles/Layout.module.css";
import ChatBox from "./ChatBox";

export default function Layout(props: { children: JSX.Element }) {
  return (
    <div className={styles.wrapper}>
      <Navigator />

      <div className={styles.content}>
        <div id={"root-layout"} className={styles.container}>
          {props.children}
        </div>
        <div className={styles.streamerMode}>
          <ChatBox />
        </div>
      </div>
    </div>
  );
}
