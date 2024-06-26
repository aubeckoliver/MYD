import React, { useState, useEffect } from "react";
import styles from "../style/StudyModal.module.css";
import axios from "axios";

export default function WorkOutModal({
  closeModal,
  setSections,
  sections,
  modal,
  setOpenModal,
  selectedSubjectId,
  setListOfSubjects,
  listOfSubjects,
  selectedEventId,
  setSelectedSections,
  selectedSections,
}) {
  const [sectionName, setSectionName] = useState("");
  const [subjectName, setSubjectName] = useState("");

  function addSection() {
    axios
      .post(
        process.env.REACT_APP_BACKEND_BASE_URL + "/sections/new",
        {
          name: sectionName,
          SubjectId: selectedSubjectId,
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
          setSections([...sections, response.data]);
          setSelectedSections([...selectedSections, response.data]);
        }
      });
  }

  function editSubject() {
    axios.put(
      process.env.REACT_APP_BACKEND_BASE_URL + "/subjects/edit",
      {
        newName: subjectName,
        id: selectedSubjectId,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );
    const newListOfSubjects = listOfSubjects.map((e) => {
      if (e.id === selectedSubjectId) {
        return { ...e, name: subjectName };
      } else {
        return e;
      }
    });
    setListOfSubjects(newListOfSubjects);
  }

  if (modal === "addSection") {
    return (
      <div className={styles.modalContainer} style={{ top: "40%" }}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className={styles.title}>
          <h1 className={styles.header}>Add Section</h1>
        </div>
        <div className={styles.body}>
          <form className={styles.form}>
            <br />
            <label className={styles.label}>Name: </label>
            <br />
            <input
              name="section"
              type="text"
              className={styles.data}
              onChange={(event) => setSectionName(event.target.value)}
            ></input>
            <br />
            <button
              id="btn"
              type="submit"
              className={styles.button}
              onClick={(e) => {
                addSection();
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
  } else if (modal === "editSubject") {
    return (
      <div className={styles.modalContainer} style={{ top: "40%" }}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className={styles.title}>
          <h1 className={styles.header}>Edit Subject</h1>
        </div>
        <div className={styles.body}>
          <form className={styles.form}>
            <label className={styles.label}>Name: </label>
            <br />
            <input
              name="subject"
              type="text"
              className={styles.data}
              onChange={(event) => {
                setSubjectName(event.target.value);
              }}
            ></input>
            <br />
            <button
              id="btn"
              type="submit"
              className={styles.button}
              onClick={(e) => {
                editSubject();
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
