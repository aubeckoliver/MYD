import React, { useState } from "react";
import styles from "../style/WorkModal.module.css";
import axios from "axios";

export default function WorkOutModal({
  closeModal,
  setTasks,
  tasks,
  modal,
  setOpenModal,
  selectedProjectId,
  setListOfProjects,
  listOfProjects,
  selectedEventId,
  setSelectedTasks,
  selectedTasks,
}) {
  const [taskName, setTaskName] = useState("");
  const [projectName, setProjectName] = useState("");

  function addTask() {
    axios
      .post(
        process.env.REACT_APP_BACKEND_BASE_URL + "/tasks/new",
        {
          name: taskName,
          ProjectId: selectedProjectId,
          EventId: selectedEventId,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          console.log(response.data);
          setTasks([...tasks, response.data]);
          setSelectedTasks([...selectedTasks, response.data]);
        }
      });
  }

  function editProject() {
    axios.put(
      process.env.REACT_APP_BACKEND_BASE_URL + "/projects/edit",
      {
        newName: projectName,
        id: selectedProjectId,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );
    const newListOfProjects = listOfProjects.map((e) => {
      if (e.id === selectedProjectId) {
        return { ...e, name: projectName };
      } else {
        return e;
      }
    });
    setListOfProjects(newListOfProjects);
  }

  if (modal === "addTask") {
    return (
      <div className={styles.modalContainer} style={{ top: "40%" }}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className={styles.title}>
          <h1 className={styles.header}>Add Task</h1>
        </div>
        <div className={styles.body}>
          <form className={styles.form}>
            <br />
            <label className={styles.label}>Name: </label>
            <br />
            <input
              name="task"
              type="text"
              className={styles.data}
              onChange={(event) => setTaskName(event.target.value)}
            ></input>
            <br />
            <button
              id="btn"
              type="submit"
              className={styles.button}
              onClick={(e) => {
                addTask();
                e.preventDefault();
                setOpenModal(false);
              }}
            >
              Create!
            </button>
          </form>
        </div>
      </div>
    );
  } else if (modal === "editProject") {
    return (
      <div className={styles.modalContainer} style={{ top: "40%" }}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className={styles.title}>
          <h1 className={styles.header}>Edit Project</h1>
        </div>
        <div className={styles.body}>
          <form className={styles.form}>
            <label className={styles.label}>Name: </label>
            <br />
            <input
              name="project"
              type="text"
              className={styles.data}
              onChange={(event) => {
                setProjectName(event.target.value);
              }}
            ></input>
            <br />
            <button
              id="btn"
              type="submit"
              className={styles.button}
              onClick={(e) => {
                editProject();
                e.preventDefault();
                setOpenModal(false);
              }}
            >
              Create!
            </button>
          </form>
        </div>
      </div>
    );
  }
}
