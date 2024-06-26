import React, { useEffect, useState } from "react";
import styles from "../style/Work.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import WorkModal from "../modals/WorkModal";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";

function Work() {
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");
  const [listOfEvents, setListOfEvents] = useState([]);
  const [listOfProjects, setListOfProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [projectId, setProjectId] = useState(1);
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [selectedEventId, setSelectedEventId] = useState(0);
  const [listOfProjectEvents, setListOfProjectEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  let navigate = useNavigate();
  let position = "0%";
  let padding = "0px";

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    } else {
      axios
        .post(
          process.env.REACT_APP_BACKEND_BASE_URL + "/events/byprojectid",
          {
            id: projectId,
          },
          {
            headers: {
              accessToken: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((response) => {
          setSelectedEvents(response.data.listOfEvents);
        });

      axios
        .get(process.env.REACT_APP_BACKEND_BASE_URL + "/projects", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfProjects(response.data.listOfProjects);
          if (response.data.listOfProjects.length !== 0) {
            setSelectedProjectId(response.data.listOfProjects[0].id);
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
        .get(process.env.REACT_APP_BACKEND_BASE_URL + "/tasks", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setTasks(response.data);
        });

      axios
        .get(process.env.REACT_APP_BACKEND_BASE_URL + "/projectevents", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setListOfProjectEvents(response.data.listOfProjectEvents);
        });

      axios
        .post(
          process.env.REACT_APP_BACKEND_BASE_URL + "/tasks/byeventid",
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
          setSelectedTasks(response.data);
        });

      axios
        .get(
          process.env.REACT_APP_BACKEND_BASE_URL + "/projects/defaultevents",
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
        .get(process.env.REACT_APP_BACKEND_BASE_URL + "/tasks/defaulttasks", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          console.log(response.data);
          setSelectedTasks(response.data);
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
    let pe = [];
    pe = listOfProjectEvents.filter((e) => e.ProjectId === id);
    let ei = [];
    for (let i = 0; i < pe.length; i++) {
      ei.push(pe[i].EventId);
    }
    let el = [];
    el = listOfEvents.filter((e) => ei.find((id) => id === e.id));
    setSelectedEvents(el);
    setSelectedEventId(el[0].id);
    getTasks(el[0].id);
  }

  function getTasks(id) {
    let t = [];
    t = tasks.filter((e) => e.EventId === id);
    setSelectedTasks(t);
  }

  function deleteProject(id) {
    axios.delete(
      process.env.REACT_APP_BACKEND_BASE_URL + `/projects/delete/${id}`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );
    setListOfProjects(listOfProjects.filter((e) => e.id !== id));
  }

  function deleteTask(id) {
    axios.delete(
      process.env.REACT_APP_BACKEND_BASE_URL + `/tasks/delete/${id}`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );
    setTasks(tasks.filter((e) => e.id !== id));
    setSelectedTasks(selectedTasks.filter((e) => e.id !== id));
  }

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Work</h1>
      <div>
        <div className={styles.projects}>
          <h2 className={styles.h1}>Projects</h2>
          {listOfProjects.map((project, key) => {
            if (edit) padding = "50px";
            return (
              <div style={{ paddingLeft: padding }}>
                {project.id === selectedProjectId ? (
                  <div
                    className={styles.selectedProject}
                    onClick={() => {
                      setProjectId(project.id);
                      getEvents(project.id, selectedEventId);
                      getTasks(selectedEventId);
                    }}
                  >
                    {project.name}
                  </div>
                ) : (
                  <div
                    className={styles.project}
                    onClick={() => {
                      setProjectId(project.id);
                      setSelectedProjectId(project.id);
                      getEvents(project.id, selectedEventId);
                    }}
                  >
                    {project.name}
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
                          setProjectId(project.id);
                        }}
                      />
                    </div>
                    <div
                      style={{ display: "inline", padding: "0px" }}
                      onClick={() => {
                        deleteProject(project.id);
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
          {listOfProjects.length === 0 ? (
            <p
              style={{
                color: "white",
                marginTop: "50px",
              }}
            >
              {" "}
              No project yet!{" "}
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
        {listOfProjects.length !== 0 && (
          <div style={{ marginBottom: "50px" }}>
            <h2 className={styles.h1}>Schedule</h2>
            {selectedEvents.map((event, key) => {
              return (
                <div>
                  {event.id === selectedEventId ? (
                    <div className={styles.selectedWork}>
                      <p>
                        <a style={{ margin: 5 }}>{getDayName(event.day)}</a>
                        <a style={{ margin: 5 }}>{event.hour}:00</a>
                      </p>
                    </div>
                  ) : (
                    <div
                      className={styles.work}
                      onClick={() => {
                        setSelectedEventId(event.id);
                        console.log(event.id);
                        getTasks(event.id);
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
        {listOfProjects.length !== 0 && (
          <div>
            <h2 className={styles.h1}>Tasks:</h2>
            <div className={styles.tasks}>
              {tasks === null ? (
                <div className={styles.task}>No Task</div>
              ) : (
                selectedTasks.map((task) => {
                  return (
                    <div>
                      <div className={styles.task}>{task.name}</div>
                      {edit && (
                        <div
                          style={{ display: "inline", padding: "0px" }}
                          onClick={() => {
                            deleteTask(task.id);
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
                setModal("addTask");
              }}
            >
              <AddIcon />
            </Fab>
          </div>
        )}
      </div>
      {openModal && (
        <WorkModal
          closeModal={setOpenModal}
          position={position}
          setTasks={setTasks}
          tasks={tasks}
          modal={modal}
          listOfProjects={listOfProjects}
          setListOfProjects={setListOfProjects}
          setOpenModal={setOpenModal}
          selectedProjectId={selectedProjectId}
          selectedEventId={selectedEventId}
          setSelectedTasks={setSelectedTasks}
          selectedTasks={selectedTasks}
        />
      )}
    </div>
  );
}

export default Work;
