import Navigator from "./Navigator";
import styles from "../styles/Layout.module.css";
import ChatBox from "./ChatBot";
import { useAppSelector } from "../redux/hooks";
import useSWR from "swr";
export default function Layout(props: { children: JSX.Element }) {
  const { data, error, mutate } = useSWR(`/authenticate/validate`);
  const isChatbot = useAppSelector((state) => state.chatbotSwitch.value);
  return (
    <div className={styles.wrapper}>
      <Navigator />

      <div className={styles.content}>
        <div id={"root-layout"} className={styles.container}>
          {props.children}
        </div>

        <div className={styles.streamerMode}>
          {data && data.id && isChatbot ? <ChatBox /> : <></>}
        </div>
      </div>
    </div>
  );
}
