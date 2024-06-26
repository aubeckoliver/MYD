import React from "react";
import styles from "../style/DayRow.module.css";
import WorkIcon from "@mui/icons-material/Work";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

export default function DayRow({
  hour,
  minutes,
  setOpenModal,
  row,
  setPosition,
  setModal,
  setDay,
  setHour,
  days2,
  setEventType,
  begin,
  end,
}) {
  let height = (minutes * 2).toString() + "px";
  let padding = ((minutes * 2 - 20) / 2 - 2).toString() + "px";

  function changePosition() {
    if (row < 14) {
      setPosition((row * 6).toString() + "%");
    } else {
      setPosition((row * 8).toString() + "%");
    }
  }

  let cells = [
    { event: false, type: "" },
    { event: false, type: "" },
    { event: false, type: "" },
    { event: false, type: "" },
    { event: false, type: "" },
    { event: false, type: "" },
    { event: false, type: "" },
  ];

  for (let i = 0; i < days2.length; i++) {
    for (let j = 0; j < cells.length; j++) {
      if (days2[i].day === j + 1) {
        cells[j].event = true;
        cells[j].type = days2[i].type;
      }
    }
  }

  function getIcon(type) {
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
      <tr>
        <td rowSpan={2} className={styles.timeline}>
          {hour}
        </td>
        <td className={styles.day}>Monday</td>
        <td className={styles.day}>Tuesday</td>
        <td className={styles.day}>Wednesday</td>
        <td className={styles.day}>Thursday</td>
        <td className={styles.day}>Friday</td>
        <td className={styles.day}>Saturday</td>
        <td className={styles.day}>Sunday</td>
      </tr>
      <tr>
        {cells.at(0).event === true ? (
          <td rowSpan={2} className={styles.frontCell}>
            <div
              className={styles.event}
              onClick={() => {
                changePosition();
                setOpenModal(true);
                setModal(false);
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
            className={styles.frontCell}
            onClick={() => {
              changePosition();
              setOpenModal(true);
              setModal(true);
              setDay(1);
              setHour(begin);
            }}
          >
            <div
              style={{ height: height }}
              className={styles.frontCellContent}
            ></div>
          </td>
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
              setDay(2);
              setHour(begin);
            }}
          >
            <div
              style={{ height: height }}
              className={styles.insideCellContent}
            ></div>
          </td>
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
              setDay(3);
              setHour(begin);
            }}
          >
            <div
              style={{ height: height }}
              className={styles.insideCellContent}
            ></div>
          </td>
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
              setDay(4);
              setHour(begin);
            }}
          >
            <div
              style={{ height: height }}
              className={styles.insideCellContent}
            ></div>
          </td>
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
              setDay(5);
              setHour(begin);
            }}
          >
            <div
              style={{ height: height }}
              className={styles.insideCellContent}
            ></div>
          </td>
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
              setDay(6);
              setHour(begin);
            }}
          >
            <div
              style={{ height: height }}
              className={styles.insideCellContent}
            ></div>
          </td>
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
              setDay(7);
              setHour(begin);
            }}
          >
            <div
              style={{ height: height }}
              className={styles.insideCellContent}
            ></div>
          </td>
        )}
      </tr>
    </>
  );
}
