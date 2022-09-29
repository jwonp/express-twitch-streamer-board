import Navigator from "./Navigator";
import styles from "../styles/Layout.module.css";

export default function Layout(props: { children: JSX.Element }) {
  return (
    <div className={styles.wrapper}>
      <Navigator />

      <div className={styles.content}>
        <div id={"root-layout"} className={styles.container}>
          {props.children}
        </div>
        <div className={styles.streamerMode}>hi</div>
      </div>
    </div>
  );
}
