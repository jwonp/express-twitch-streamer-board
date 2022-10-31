import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ListBar from "./ListBar";
import styles from "../styles/ListWrapper.module.css";
interface dateType {
  id: string;
  title: string;
  author: string;
  views: number;
  date: number;
}

export default function ListWrapper(props: { name: string }) {
  const [dataSet, setDataSet] = useState<dateType[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [selected, setSelected] = useState(1);
  async function getBoardIndex() {
    axios.get(`/board/getboardindex?board=${props.name}`).then((res) => {
      const count = parseInt(res.data.count);
      console.log(count);
      setMaxIndex(
        count % 10 !== 0 ? Math.trunc(count / 10) + 1 : Math.trunc(count / 10)
      );
    });
  }
  async function getBoardList() {
    axios
      .get(`/board/getboardlist?board=${props.name}&index=${selected}`)
      .then((res) => {
        setDataSet(res.data);
      });
  }
  useEffect(() => {
    getBoardIndex();
  }, []);
  useEffect(() => {
    getBoardList();
  }, [selected]);
  return (
    <div>
      {maxIndex}
      <div id="listbar-wrapper" className="listbar-wrapper">
        {dataSet && dataSet.length > 0 ? <ListBar data={dataSet[0]} /> : <></>}
        {dataSet && dataSet.length > 1 ? <ListBar data={dataSet[1]} /> : <></>}
        {dataSet && dataSet.length > 2 ? <ListBar data={dataSet[2]} /> : <></>}
        {dataSet && dataSet.length > 3 ? <ListBar data={dataSet[3]} /> : <></>}
        {dataSet && dataSet.length > 4 ? <ListBar data={dataSet[4]} /> : <></>}
        {dataSet && dataSet.length > 5 ? <ListBar data={dataSet[5]} /> : <></>}
        {dataSet && dataSet.length > 6 ? <ListBar data={dataSet[6]} /> : <></>}
        {dataSet && dataSet.length > 7 ? <ListBar data={dataSet[7]} /> : <></>}
        {dataSet && dataSet.length > 8 ? <ListBar data={dataSet[8]} /> : <></>}
        {dataSet && dataSet.length > 9 ? <ListBar data={dataSet[9]} /> : <></>}
      </div>
      <div className="navigator-wrapper">
        <div className={`${styles.navigatorItem}`}>{"<<"}</div>
        <div className={`${styles.navigatorItem}`}>{"<"}</div>

        <label
          htmlFor="radio1"
          className={`${styles.navigatorItem} ${
            maxIndex < 1 ? styles.hide : styles.visble
          }`}
        >
          {index + 1}
        </label>
        <input
          id="radio1"
          value={index + 1}
          name="navigator"
          type="radio"
          className="disable"
          onClick={(e) => {
            setSelected(parseInt((e.target as HTMLInputElement).value));
          }}
        />

        <label
          htmlFor="radio2"
          className={`${styles.navigatorItem} ${
            maxIndex < 2 ? styles.hide : styles.visble
          }`}
        >
          {index + 2}
        </label>
        <input
          id="radio2"
          value={index + 2}
          name="navigator"
          type="radio"
          className="disable"
          onClick={(e) => {
            setSelected(parseInt((e.target as HTMLInputElement).value));
          }}
        />

        <label
          htmlFor="radio3"
          className={`${styles.navigatorItem} ${
            maxIndex < 3 ? styles.hide : styles.visble
          }`}
        >
          {index + 3}
        </label>
        <input
          id="radio3"
          value={index + 3}
          name="navigator"
          type="radio"
          className="disable"
          onClick={(e) => {
            setSelected(parseInt((e.target as HTMLInputElement).value));
          }}
        />

        <label
          htmlFor="radio4"
          className={`${styles.navigatorItem} ${
            maxIndex < 4 ? styles.hide : styles.visble
          }`}
        >
          {index + 4}
        </label>
        <input
          id="radio4"
          value={index + 4}
          name="navigator"
          type="radio"
          className="disable"
          onClick={(e) => {
            setSelected(parseInt((e.target as HTMLInputElement).value));
          }}
        />

        <label
          htmlFor="radio5"
          className={`${styles.navigatorItem} ${
            maxIndex < 5 ? styles.hide : styles.visble
          }`}
        >
          {index + 5}
        </label>
        <input
          id="radio5"
          value={index + 5}
          name="navigator"
          type="radio"
          className="disable"
          onClick={(e) => {
            setSelected(parseInt((e.target as HTMLInputElement).value));
          }}
        />

        <label
          htmlFor="radio6"
          className={`${styles.navigatorItem} ${
            maxIndex < 6 ? styles.hide : styles.visble
          }`}
        >
          {index + 6}
        </label>
        <input
          id="radio6"
          value={index + 6}
          name="navigator"
          type="radio"
          className="disable"
          onClick={(e) => {
            setSelected(parseInt((e.target as HTMLInputElement).value));
          }}
        />

        <label
          htmlFor="radio7"
          className={`${styles.navigatorItem} ${
            maxIndex < 7 ? styles.hide : styles.visble
          }`}
        >
          {index + 7}
        </label>
        <input
          id="radio7"
          value={index + 7}
          name="navigator"
          type="radio"
          className="disable"
          onClick={(e) => {
            setSelected(parseInt((e.target as HTMLInputElement).value));
          }}
        />

        <label
          htmlFor="radio8"
          className={`${styles.navigatorItem} ${
            maxIndex < 8 ? styles.hide : styles.visble
          }`}
        >
          {index + 8}
        </label>
        <input
          id="radio8"
          value={index + 8}
          name="navigator"
          type="radio"
          className="disable"
          onClick={(e) => {
            setSelected(parseInt((e.target as HTMLInputElement).value));
          }}
        />

        <label
          htmlFor="radio9"
          className={`${styles.navigatorItem} ${
            maxIndex < 9 ? styles.hide : styles.visble
          }`}
        >
          {index + 9}
        </label>
        <input
          id="radio9"
          value={index + 9}
          name="navigator"
          type="radio"
          className="disable"
          onClick={(e) => {
            setSelected(parseInt((e.target as HTMLInputElement).value));
          }}
        />

        <label
          htmlFor="radio10"
          className={`${styles.navigatorItem} ${
            maxIndex < 10 ? styles.hide : styles.visble
          }`}
        >
          {index + 10}
        </label>
        <input
          id="radio10"
          value={index + 10}
          name="navigator"
          type="radio"
          className="disable"
          onClick={(e) => {
            setSelected(parseInt((e.target as HTMLInputElement).value));
          }}
        />

        <div className={`${styles.navigatorItem}`}>{">"}</div>
        <div className={`${styles.navigatorItem}`}>{">>"}</div>
      </div>
      <style jsx>
        {`
          .listbar-wrapper {
            padding: 8px;
            display: block;
          }
          .navigator-wrapper {
            display: flex;
            flex-flow: row;
            justify-content: center;
            padding: 8px;
            text-align: center;
            cursor: pointer;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            position: sticky;
          }

          .disable {
            display: none;
          }
        `}
      </style>
    </div>
  );
}
