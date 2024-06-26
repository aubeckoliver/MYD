import React from "react";
import styles from "../style/SpecialRow.module.css";
import WorkIcon from "@mui/icons-material/Work";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

function SpecialRow({
  hour,
  setOpenModal,
  row,
  minutes,
  setPosition,
  days,
  setModal,
  setHour,
  setDay,
  setEventType,
}) {
  let height = (minutes * 2).toString() + "px";
  let padding = ((minutes * 2 - 20) / 2 - 2).toString() + "px";

  let cells = [
    { event: false, type: "" },
    { event: false, type: "" },
    { event: false, type: "" },
    { event: false, type: "" },
    { event: false, type: "" },
    { event: false, type: "" },
    { event: false, type: "" },
  ];

  for (let i = 0; i < days.length; i++) {
    for (let j = 0; j < cells.length; j++) {
      if (days[i].day === j + 1) {
        cells[j].event = true;
        cells[j].type = days[i].type;
      }
    }
  }

  function changePosition() {
    if (row < 14) {
      setPosition((row * 6).toString() + "%");
    } else {
      setPosition((row * 8).toString() + "%");
    }
  }

  function getIcon(type) {
    let icon;

    if (type === "Study") {
      return (
        <AutoStoriesIcon
          sx={{
            background: "rgb(213, 224, 235)",
            padding: padding,
            color: "black",
          }}
        />
      );
    } else if (type === "Work") {
      return (
        <WorkIcon
          sx={{
            color: "black",
            background: "rgb(213, 224, 235)",
            padding: padding,
          }}
        />
      );
    } else if (type === "Workout") {
      return (
        <FitnessCenterIcon
          sx={{
            color: "black",
            background: "rgb(213, 224, 235)",
            padding: padding,
          }}
        />
      );
    } else if (type === "Shopping") {
      return (
        <ShoppingCartIcon
          sx={{
            color: "black",
            background: "rgb(213, 224, 235)",
            padding: padding,
          }}
        />
      );
    }
  }

  return (
    <>
      <tr style={{ zIndex: -1 }}>
        <td rowSpan={2} className={styles.timeline}>
          {hour}
        </td>
      </tr>
      <tr style={{ height: "60px" }}>
        {cells.at(0).event === true ? (
          <td
            rowSpan={2}
            className={styles.inside}
            style={{ padding: "0", verticalAlign: "top" }}
          >
            <div
              className={styles.event}
              onClick={() => {
                changePosition();
                setOpenModal(true);
                setModal(false);
                setHour(row);
                setDay(1);
                setEventType(cells.at(0).type);
              }}
              style={{ height: height }}
            >
              {getIcon(cells.at(0).type)}
            </div>
          </td>
        ) : (
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
        )}
        {cells.at(1).event === true ? (
          <td
            rowSpan={2}
            className={styles.inside}
            style={{ padding: "0", verticalAlign: "top" }}
          >
            <div
              className={styles.event}
              onClick={() => {
                changePosition();
                setOpenModal(true);
                setModal(false);
                setHour(row);
                setDay(2);
                setEventType(cells.at(1).type);
              }}
              style={{ height: height }}
            >
              {getIcon(cells.at(1).type)}
            </div>
          </td>
        ) : (
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
        )}
        {cells.at(2).event === true ? (
          <td
            rowSpan={2}
            className={styles.inside}
            style={{ padding: "0", verticalAlign: "top" }}
          >
            <div
              className={styles.event}
              onClick={() => {
                changePosition();
                setOpenModal(true);
                setModal(false);
                setHour(row);
                setDay(3);
                setEventType(cells.at(2).type);
              }}
              style={{ height: height }}
            >
              {getIcon(cells.at(2).type)}
            </div>
          </td>
        ) : (
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
        )}
        {cells.at(3).event === true ? (
          <td
            rowSpan={2}
            className={styles.inside}
            style={{ padding: "0", verticalAlign: "top" }}
          >
            <div
              className={styles.event}
              onClick={() => {
                changePosition();
                setOpenModal(true);
                setModal(false);
                setHour(row);
                setDay(4);
                setEventType(cells.at(3).type);
              }}
              style={{ height: height }}
            >
              {getIcon(cells.at(3).type)}
            </div>
          </td>
        ) : (
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
        )}
        {cells.at(4).event === true ? (
          <td
            rowSpan={2}
            className={styles.inside}
            style={{ padding: "0", verticalAlign: "top" }}
          >
            <div
              className={styles.event}
              onClick={() => {
                changePosition();
                setOpenModal(true);
                setModal(false);
                setHour(row);
                setDay(5);
                setEventType(cells.at(4).type);
              }}
              style={{ height: height }}
            >
              {getIcon(cells.at(4).type)}
            </div>
          </td>
        ) : (
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
        )}
        {cells.at(5).event === true ? (
          <td
            rowSpan={2}
            className={styles.inside}
            style={{ padding: "0", verticalAlign: "top" }}
          >
            <div
              className={styles.event}
              onClick={() => {
                changePosition();
                setOpenModal(true);
                setModal(false);
                setHour(row);
                setDay(6);
                setEventType(cells.at(5).type);
              }}
              style={{ height: height }}
            >
              {getIcon(cells.at(5).type)}
            </div>
          </td>
        ) : (
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
        )}
        {cells.at(6).event === true ? (
          <td
            rowSpan={2}
            className={styles.inside}
            style={{ padding: "0", verticalAlign: "top" }}
          >
            <div
              className={styles.event}
              onClick={() => {
                changePosition();
                setOpenModal(true);
                setModal(false);
                setHour(row);
                setDay(7);
                setEventType(cells.at(6).type);
              }}
              style={{ height: height }}
            >
              {getIcon(cells.at(6).type)}
            </div>
          </td>
        ) : (
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
        )}
      </tr>
    </>
  );
}

export default SpecialRow;
