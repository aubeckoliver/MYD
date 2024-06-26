import React, { useEffect, useState } from "react";
import DayRow from "./DayRow";
import Row from "./Row";
import EndRow from "./EndRow";
import styles from "../style/TimeTable.module.css";
import SpecialRow from "./SpecialRow";
import axios from "axios";

export default function TimeTable({
  setOpenModal,
  setPosition,
  listOfEvents,
  setModal,
  setHour,
  setDay,
  setEventType,
}) {
  const [begin, setBegin] = useState(8);
  const [end, setEnd] = useState(22);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_BASE_URL + "/auth/getday", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setBegin(response.data.dayStart);
        setEnd(response.data.dayEnd);
      });
  }, []);

  let d = {};
  let data = [];

  listOfEvents.map((e) => {
    d = {
      hour: e.hour,
      days: { day: e.day, minutes: e.minutes, type: e.type },
    };
    data.push(d);
  });

  let events = [];

  for (let i = begin; i < end; i++) {
    events.push({ hour: i, days: [] });
  }

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < events.length; j++) {
      if (data[i].hour === events[j].hour) {
        events[j].days.push(data[i].days);
      }
    }
  }

  for (let i = 0; i < events.length; i++) {
    events[i].days.flat();
  }

  let first = false;

  if (events[0].days.length !== 0) {
    first = true;
  }

  let rows = events.map((e) => {
    if (e.hour !== begin) {
      if (e.days.length !== 0) {
        return (
          <SpecialRow
            hour={e.hour + ":00"}
            minutes={60}
            setOpenModal={setOpenModal}
            setModal={setModal}
            setPosition={setPosition}
            row={e.hour}
            days={e.days}
            setHour={setHour}
            setDay={setDay}
            setEventType={setEventType}
          />
        );
      } else {
        return (
          <Row
            hour={e.hour + ":00"}
            setModal={setModal}
            setOpenModal={setOpenModal}
            row={e.hour}
            setPosition={setPosition}
            setHour={setHour}
            setDay={setDay}
          />
        );
      }
    }
  });

  return (
    <div className={styles.container}>
      <table className={styles.time} style={{ borderColor: "lightyellow" }}>
        <DayRow
          hour={begin + ":00"}
          minutes={60}
          setOpenModal={setOpenModal}
          setPosition={setPosition}
          row={events[0].hour}
          first={first}
          setModal={setModal}
          setDay={setDay}
          setHour={setHour}
          days2={events[0].days}
          setEventType={setEventType}
          begin={begin}
          end={end}
        />
        {rows}
        <EndRow hour={end + ":00"} />
      </table>
    </div>
  );
}
