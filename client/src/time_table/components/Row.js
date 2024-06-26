import React from "react";
import styles from "../style/Row.module.css";

export default function Row({
  hour,
  setOpenModal,
  row,
  setPosition,
  setModal,
  setHour,
  setDay,
}) {
  function changePosition() {
    if (row < 14) {
      setPosition((row * 6).toString() + "%");
    } else {
      setPosition((row * 8).toString() + "%");
    }
  }

  return (
    <>
      <tr>
        <td rowSpan={2} style={{}} className={styles.timeline}>
          {hour}
        </td>
      </tr>
      <tr style={{ height: "60px" }}>
        <td
          rowSpan={2}
          className={styles.inside}
          onClick={() => {
            changePosition();
            setOpenModal(true);
            setModal(true);
            setHour(row);
            setDay(1);
          }}
        ></td>
        <td
          rowSpan={2}
          className={styles.inside}
          onClick={() => {
            changePosition();
            setOpenModal(true);
            setModal(true);
            setHour(row);
            setDay(2);
          }}
        ></td>
        <td
          rowSpan={2}
          className={styles.inside}
          onClick={() => {
            changePosition();
            setOpenModal(true);
            setModal(true);
            setHour(row);
            setDay(3);
          }}
        ></td>
        <td
          rowSpan={2}
          className={styles.inside}
          onClick={() => {
            changePosition();
            setOpenModal(true);
            setModal(true);
            setHour(row);
            setDay(4);
          }}
        ></td>
        <td
          rowSpan={2}
          className={styles.inside}
          onClick={() => {
            changePosition();
            setOpenModal(true);
            setModal(true);
            setHour(row);
            setDay(5);
          }}
        ></td>
        <td
          rowSpan={2}
          className={styles.inside}
          onClick={() => {
            changePosition();
            setOpenModal(true);
            setModal(true);
            setHour(row);
            setDay(6);
          }}
        ></td>
        <td
          rowSpan={2}
          className={styles.inside}
          onClick={() => {
            changePosition();
            setOpenModal(true);
            setModal(true);
            setHour(row);
            setDay(7);
          }}
        ></td>
      </tr>
    </>
  );
}
