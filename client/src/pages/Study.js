import React, { useEffect, useState } from "react";
import styles from "../style/Study.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import StudyModal from "../modals/StudyModal";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";

function Study() {
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");
  const [listOfEvents, setListOfEvents] = useState([]);
  const [listOfSubjects, setListOfSubjects] = useState([]);
  const [sections, setSections] = useState([]);
  const [edit, setEdit] = useState(false);
  const [subjectId, setSubjectId] = useState(1);
  const [selectedSubjectId, setSelectedSubjectId] = useState(0);
  const [selectedEventId, setSelectedEventId] = useState(0);
  const [listOfSubjectEvents, setListOfSubjectEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedSections, setSelectedSections] = useState([]);

  let navigate = useNavigate();
  let position = "0%";
  let padding = "0px";

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .post(
          process.env.REACT_APP_BACKEND_BASE_URL + "/events/bysubjectid",
          {
            id: subjectId,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          setSelectedSubjectId(response.data.listOfEvents);
        });

      axios
        .get(process.env.REACT_APP_BACKEND_BASE_URL + "/subjects", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfSubjects(response.data.listOfSubjects);
          if (response.data.listOfSubjects.length !== 0) {
            setSelectedSubjectId(response.data.listOfSubjects[0].id);
          }
        });

      axios
        .get(process.env.REACT_APP_BACKEND_BASE_URL + "/events", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfEvents(response.data.listOfEvents);
        });

      axios
        .get(process.env.REACT_APP_BACKEND_BASE_URL + "/sections", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setSections(response.data);
        });

      axios
        .get(process.env.REACT_APP_BACKEND_BASE_URL + "/subjectevents", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfSubjectEvents(response.data.listOfSubjectEvents);
        });

      axios
        .post(
          process.env.REACT_APP_BACKEND_BASE_URL + "/sections/byeventid",
          {
            id: selectedEventId,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          setSelectedSections(response.data);
        });

      axios
        .get(
          process.env.REACT_APP_BACKEND_BASE_URL + "/subjects/defaultevents",
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then((response) => {
          console.log(response.data);
          setSelectedEvents(response.data);
          setSelectedEventId(response.data[0].id);
        });

      axios
        .get(
          process.env.REACT_APP_BACKEND_BASE_URL + "/sections/defaultsections",
          {
            headers: { accessToken: localStorage.getItem("accessToken") },
          }
        )
        .then((response) => {
          console.log(response.data);
          setSelectedSections(response.data);
        });
    }
  }, []);

  function getDayName(number) {
    if (number === 1) {
      return "Monday";
    } else if (number === 2) {
      return "Tuesday";
    } else if (number === 3) {
      return "Wednesday";
    } else if (number === 4) {
      return "Thursday";
    } else if (number === 5) {
      return "Friday";
    } else if (number === 6) {
      return "Saturday";
    } else {
      return "Sunday";
    }
  }

  function getEvents(id) {
    let se = [];
    se = listOfSubjectEvents.filter((e) => e.SubjectId === id);
    let ei = [];
    for (let i = 0; i < se.length; i++) {
      ei.push(se[i].EventId);
    }
    let el = [];
    el = listOfEvents.filter((e) => ei.find((id) => id === e.id));
    setSelectedEvents(el);
    setSelectedEventId(el[0].id);
    getSections(el[0].id);
  }

  function getSections(id) {
    let t = [];
    t = sections.filter((e) => e.EventId === id);
    setSelectedSections(t);
  }

  function deleteSubject(id) {
    axios.delete(
      process.env.REACT_APP_BACKEND_BASE_URL + `/subjects/delete/${id}`
    );
    setListOfSubjects(listOfSubjects.filter((e) => e.id !== id));
  }

  function deleteSection(id) {
    axios.delete(
      process.env.REACT_APP_BACKEND_BASE_URL + `/sections/delete/${id}`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );
    setSections(sections.filter((e) => e.id !== id));
    setSelectedSections(selectedSections.filter((e) => e.id !== id));
  }

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Study</h1>
      <div>
        <div className={styles.subjects}>
          <h2 className={styles.h1}>Subjects</h2>
          {listOfSubjects.map((subject, key) => {
            if (edit) padding = "50px";
            return (
              <div style={{ paddingLeft: padding }}>
                {subject.id === selectedSubjectId ? (
                  <div
                    className={styles.selectedSubject}
                    onClick={() => {
                      setSubjectId(subject.id);
                      getEvents(subject.id, selectedEventId);
                      getSections(selectedEventId);
                    }}
                  >
                    {subject.name}
                  </div>
                ) : (
                  <div
                    className={styles.subject}
                    onClick={() => {
                      setSubjectId(subject.id);
                      setSelectedSubjectId(subject.id);
                      getEvents(subject.id, selectedEventId);
                    }}
                  >
                    {subject.name}
                  </div>
                )}
                {edit && (
                  <>
                    <div style={{ display: "inline", padding: "0px" }}>
                      <EditIcon
                        fontSize="medium"
                        viewBox="0 0 22 22"
                        onClick={() => {
                          setOpenModal(true);
                          setModal("editProject");
                          setSubjectId(subject.id);
                        }}
                      />
                    </div>
                    <div
                      style={{ display: "inline", padding: "0px" }}
                      onClick={() => {
                        deleteSubject(subject.id);
                      }}
                    >
                      <ClearIcon fontSize="medium" viewBox="0 0 20 20" />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ marginBottom: "50px" }}>
          {listOfSubjects.length === 0 ? (
            <p
              style={{
                color: "white",
                marginTop: "50px",
              }}
            >
              {" "}
              No subject yet!{" "}
            </p>
          ) : (
            <Fab
              size="large"
              sx={{ bgcolor: "lime", zIndex: 0, margin: "2px" }}
              style={{ backgroundColor: "coral" }}
              aria-label="add"
              onClick={() => {
                setEdit(!edit);
              }}
              className={styles.fab}
            >
              {edit ? <DoneIcon /> : <EditIcon />}
            </Fab>
          )}
        </div>
        {listOfSubjects.length !== 0 && (
          <div style={{ marginBottom: "50px" }}>
            <h2 className={styles.h1}>Schedule</h2>
            {selectedEvents.map((event, key) => {
              return (
                <div>
                  {event.id === selectedEventId ? (
                    <div className={styles.selectedStudy}>
                      <p>
                        <a style={{ margin: 5 }}>{getDayName(event.day)}</a>
                        <a style={{ margin: 5 }}>{event.hour}:00</a>
                      </p>
                    </div>
                  ) : (
                    <div
                      className={styles.study}
                      onClick={() => {
                        setSelectedEventId(event.id);
                        getSections(event.id);
                      }}
                    >
                      <p>
                        <a style={{ margin: 5 }}>{getDayName(event.day)}</a>
                        <a style={{ margin: 5 }}>{event.hour}:00</a>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
        {listOfSubjects.length !== 0 && (
          <div>
            <h2 className={styles.h1}>Sections:</h2>
            <div className={styles.sections}>
              {sections === null ? (
                <div className={styles.section}>No Section yet</div>
              ) : (
                selectedSections.map((section) => {
                  return (
                    <div>
                      <div className={styles.section}>{section.name}</div>
                      {edit && (
                        <div
                          style={{ display: "inline", padding: "0px" }}
                          onClick={() => {
                            deleteSection(section.id);
                          }}
                        >
                          <ClearIcon fontSize="small" viewBox="-5 -11 30 30" />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
            <Fab
              size="small"
              sx={{ bgcolor: "lime", marginBottom: "20px", zIndex: 0 }}
              style={{ backgroundColor: "coral" }}
              aria-label="add"
              onClick={() => {
                setOpenModal(true);
                setModal("addSection");
              }}
            >
              <AddIcon />
            </Fab>
          </div>
        )}
      </div>
      {openModal && (
        <StudyModal
          closeModal={setOpenModal}
          position={position}
          setSections={setSections}
          sections={sections}
          modal={modal}
          listOfSubjects={listOfSubjects}
          setListOfSubjects={setListOfSubjects}
          setOpenModal={setOpenModal}
          selectedSubjectId={selectedSubjectId}
          selectedEventId={selectedEventId}
          setSelectedSections={setSelectedSections}
          selectedSections={selectedSections}
        />
      )}
    </div>
  );
}

export default Study;
