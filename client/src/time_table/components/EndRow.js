import React from "react";
import styles from "../style/EndRow.module.css";

export default function EndRow({ hour }) {
  return (
    <>
      <tr style={{ height: "50px" }}>
        <td rowSpan={2} className={styles.timeline}>
          {hour}
        </td>
      </tr>
      <tr style={{ height: "50px" }}>
        <td className={styles.last}></td>
        <td className={styles.last}></td>
        <td className={styles.last}></td>
        <td className={styles.last}></td>
        <td className={styles.last}></td>
        <td className={styles.last}></td>
        <td className={styles.last}></td>
      </tr>
    </>
  );
}
