import "../style/App.css";
import TimeTable from "../time_table/components/TimeTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../time_table/components/Modal";
import axios from "axios";

function Home({ user }) {
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState(false);
  const [position, setPosition] = useState("0%");
  const [day, setDay] = useState(0);
  const [listOfEvents, setListOfEvents] = useState([]);
  const [hour, setHour] = useState(0);
  const [eventType, setEventType] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .get(process.env.REACT_APP_BACKEND_BASE_URL + "/events/", {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          setListOfEvents(response.data.listOfEvents);
        });
    }
  }, []);

  return (
    <div className="App">
      <div
        style={{ margin: 0, marginTop: "100px", display: "block", zIndex: -1 }}
      >
        <TimeTable
          setOpenModal={setOpenModal}
          setModal={setModal}
          setPosition={setPosition}
          listOfEvents={listOfEvents}
          setDay={setDay}
          setHour={setHour}
          setEventType={setEventType}
          user={user}
        />
      </div>
      {openModal && (
        <Modal
          openModal={setOpenModal}
          position={position}
          modal={modal}
          day={day}
          hour={hour}
          setListOfEvents={setListOfEvents}
          listOfEvents={listOfEvents}
          eventType={eventType}
          setEventType={setEventType}
          user={user}
        />
      )}
    </div>
  );
}

export default Home;
