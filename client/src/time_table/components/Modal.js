import React, { useEffect, useState } from "react";
import styles from "../style/Modal.module.css";
import axios from "axios";
import CircleIcon from "@mui/icons-material/Circle";
import { Link } from "react-router-dom";

export default function Modal({
  openModal,
  position,
  modal,
  day,
  hour,
  setListOfEvents,
  listOfEvents,
  user,
  eventType,
}) {
  const [name, setName] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [project, setProject] = useState([]);
  const [study, setStudy] = useState([]);
  const [sections, setSections] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [workout, setWorkout] = useState([]);
  const [muscles, setMuscles] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [shopping, setShopping] = useState([]);
  const [items, setItems] = useState([]);
  const [listOfShopping, setListOfShopping] = useState([]);
  const [shoppingName, setShoppingName] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("Work");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_BASE_URL + "/workouts", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setWorkouts(response.data.listOfWorkouts);
        if (response.data.listOfWorkouts.length !== 0) {
          setWorkoutName(response.data.listOfWorkouts[0].name);
        }
      });

    axios
      .get(process.env.REACT_APP_BACKEND_BASE_URL + "/shopping", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setListOfShopping(response.data.listOfShopping);
        if (response.data.listOfShopping.length !== 0) {
          setShoppingName(response.data.listOfShopping[0].name);
        }
      });

    axios
      .get(process.env.REACT_APP_BACKEND_BASE_URL + "/muscles", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setMuscles(response.data.listOfMuscles);
      });

    axios
      .get(process.env.REACT_APP_BACKEND_BASE_URL + "/exercises", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setExercises(response.data.listOfExercises);
      });

    axios
      .get(process.env.REACT_APP_BACKEND_BASE_URL + "/tasks", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setTasks(response.data);
      });

    axios
      .get(process.env.REACT_APP_BACKEND_BASE_URL + "/sections", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setSections(response.data);
      });

    axios
      .get(process.env.REACT_APP_BACKEND_BASE_URL + "/items", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setItems(response.data.listOfItems);
      });

    if (modal === false) {
      if (eventType === "Work") {
        axios
          .post(
            process.env.REACT_APP_BACKEND_BASE_URL + "/projects/project",
            {
              hour: hour,
              day: day,
            },
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
          )
          .then((response) => {
            setProject(response.data);
          });
      } else if (eventType === "Study") {
        axios
          .post(
            process.env.REACT_APP_BACKEND_BASE_URL + "/subjects/subject",
            {
              hour: hour,
              day: day,
            },
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
          )
          .then((response) => {
            setStudy(response.data);
          });
      } else if (eventType === "Workout") {
        axios
          .post(
            process.env.REACT_APP_BACKEND_BASE_URL + "/workouts/workout",
            {
              hour: hour,
              day: day,
            },
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
          )
          .then((response) => {
            setWorkout(response.data);
          });
      } else if (eventType === "Shopping") {
        axios
          .post(
            process.env.REACT_APP_BACKEND_BASE_URL + "/shopping/shopping",
            {
              hour: hour,
              day: day,
            },
            {
              headers: {
                accessToken: localStorage.getItem("accessToken"),
              },
            }
          )
          .then((response) => {
            setShopping(response.data);
          });
      }
    }
  }, []);

  const onSubmit = () => {
    let data = {};

    if (selectedEventType === "Work") {
      data = {
        parameter: {
          name: name,
          UserId: user.id,
        },
        event: {
          type: selectedEventType,
          hour: hour,
          day: day,
          UserId: user.id,
        },
      };
    } else if (selectedEventType === "Shopping") {
      data = {
        parameter: {
          name: shoppingName,
          UserId: user.id,
        },
        event: {
          type: selectedEventType,
          hour: hour,
          day: day,
          UserId: user.id,
        },
      };
    } else if (selectedEventType === "Study") {
      data = {
        parameter: {
          name: name,
          UserId: user.id,
        },
        event: {
          type: selectedEventType,
          hour: hour,
          day: day,
          UserId: user.id,
        },
      };
    } else if (selectedEventType === "Workout") {
      data = {
        parameter: {
          name: workoutName,
          UserId: user.id,
        },
        event: {
          type: selectedEventType,
          hour: hour,
          day: day,
          UserId: user.id,
        },
      };
    }

    axios
      .post(process.env.REACT_APP_BACKEND_BASE_URL + "/events/new", data, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          setListOfEvents([...listOfEvents, response.data]);
        }
      });

    openModal(false);
  };

  function deleteWork() {
    axios
      .delete(
        process.env.REACT_APP_BACKEND_BASE_URL +
          `/projects/delete/${project.id}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });

    setListOfEvents(
      listOfEvents.filter((e) => !(e.day === day && e.hour === hour))
    );
  }

  function deleteStudy() {
    axios
      .delete(
        process.env.REACT_APP_BACKEND_BASE_URL + `/subjects/delete/${study.id}`,
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });

    setListOfEvents(
      listOfEvents.filter((e) => !(e.day === day && e.hour === hour))
    );
  }

  function deleteShopping() {
    axios
      .post(
        process.env.REACT_APP_BACKEND_BASE_URL + "/shopping/deleteevent",
        {
          day: day,
          hour: hour,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });

    setListOfEvents(
      listOfEvents.filter((e) => !(e.day === day && e.hour === hour))
    );
  }

  function deleteWorkout() {
    axios
      .post(
        process.env.REACT_APP_BACKEND_BASE_URL + "/workouts/deleteevent",
        {
          day: day,
          hour: hour,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });

    setListOfEvents(
      listOfEvents.filter((e) => !(e.day === day && e.hour === hour))
    );
  }

  function deleteStudy() {
    axios
      .delete(
        process.env.REACT_APP_BACKEND_BASE_URL + `/subjects/delete/${study.id}`
      )
      .then(
        (response) => {
          console.log(response.data);
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

    setListOfEvents(
      listOfEvents.filter((e) => !(e.day === day && e.hour === hour))
    );
  }

  if (modal) {
    return (
      <div className={styles.modalContainer} style={{ top: position }}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => openModal(false)}>X</button>
        </div>
        <div className={styles.title}>
          <h2 className={styles.header}>New Event</h2>
        </div>
        <div className={styles.body}>
          <form className={styles.form}>
            <label className={styles.label}>Event </label>
            <br />
            <select
              name="event"
              className={styles.select}
              onChange={(event) => setSelectedEventType(event.target.value)}
            >
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Workout">Workout</option>
              <option value="Shopping">Shopping</option>
            </select>

            <div className={styles.event}>
              <div className={styles.eventType}>{selectedEventType}</div>
              {selectedEventType === "Workout" ||
              selectedEventType === "Shopping" ? (
                selectedEventType === "Workout" ? (
                  <div>
                    {workouts.length !== 0 ? (
                      <select
                        className={styles.workoutSelect}
                        onChange={(event) => setWorkoutName(event.target.value)}
                      >
                        {workouts.map((w) => {
                          return <option>{w.name}</option>;
                        })}
                      </select>
                    ) : (
                      <Link to="/workout">
                        <button>Add plan</button>
                      </Link>
                    )}
                  </div>
                ) : (
                  <div>
                    {listOfShopping.length !== 0 ? (
                      <select
                        className={styles.shoppingSelect}
                        onChange={(event) =>
                          setShoppingName(event.target.value)
                        }
                      >
                        {listOfShopping.map((w) => {
                          return <option>{w.name}</option>;
                        })}
                      </select>
                    ) : (
                      <Link to="/shopping">
                        <button>Add shopping list</button>
                      </Link>
                    )}
                  </div>
                )
              ) : (
                <div>
                  <label className={styles.name}>Name: </label>
                  <br />
                  <input
                    name="name"
                    type="text"
                    className={styles.data}
                    onChange={(event) => setName(event.target.value)}
                  ></input>
                </div>
              )}
            </div>
            <button
              id="btn"
              type="submit"
              className={styles.button}
              onClick={onSubmit}
            >
              Create
            </button>
          </form>
        </div>
      </div>
    );
  } else {
    if (eventType === "Work") {
      return (
        <div className={styles.modalContainer} style={{ top: position }}>
          <div className={styles.titleCloseBtn}>
            <button onClick={() => openModal(false)}>X</button>
          </div>
          <div className={styles.title}>
            <h2 className={styles.header} style={{ marginBottom: "20px" }}>
              {project.name}
            </h2>
          </div>
          <div className={styles.body}>
            <div className={styles.header}>
              <h3 className={styles.header}>
                Tasks:
                <ul style={{ display: "block", padding: "10px" }}>
                  {tasks.map((t) => {
                    if (t.ProjectId === project.id)
                      return (
                        <li
                          style={{
                            display: "block",
                            fontSize: "20px",
                            margin: "5px",
                          }}
                        >
                          <CircleIcon
                            sx={{
                              width: "10px",
                              height: "10px",
                              marginRight: "5px",
                            }}
                          />
                          {t.name}
                        </li>
                      );
                  })}
                </ul>
                <button
                  id="btn"
                  type="submit"
                  className={styles.button}
                  onClick={() => {
                    deleteWork();
                    openModal(false);
                  }}
                  style={{ marginTop: "40px" }}
                >
                  Delete Event
                </button>
              </h3>
            </div>
          </div>
        </div>
      );
    } else if (eventType === "Study") {
      return (
        <div className={styles.modalContainer} style={{ top: position }}>
          <div className={styles.titleCloseBtn}>
            <button onClick={() => openModal(false)}>X</button>
          </div>
          <div className={styles.title}>
            <h2 className={styles.header} style={{ marginBottom: "20px" }}>
              {study.name}
            </h2>
          </div>
          <div className={styles.body}>
            <div className={styles.header}>
              <h3 className={styles.header}>
                Sections:
                <ul style={{ display: "block", padding: "10px" }}>
                  {sections.map((t) => {
                    if (t.SubjectId === study.id)
                      return (
                        <li
                          style={{
                            display: "block",
                            fontSize: "20px",
                            margin: "5px",
                          }}
                        >
                          <CircleIcon
                            sx={{
                              width: "10px",
                              height: "10px",
                              marginRight: "5px",
                            }}
                          />
                          {t.name}
                        </li>
                      );
                  })}
                </ul>
                <button
                  id="btn"
                  type="submit"
                  className={styles.button}
                  onClick={() => {
                    deleteStudy();
                    openModal(false);
                  }}
                  style={{ marginTop: "40px" }}
                >
                  Delete Event
                </button>
              </h3>
            </div>
          </div>
        </div>
      );
    } else if (eventType === "Workout") {
      return (
        <div className={styles.modalContainer} style={{ top: position }}>
          <div className={styles.titleCloseBtn}>
            <button onClick={() => openModal(false)}>X</button>
          </div>
          <div className={styles.title}>
            <h2 className={styles.header} style={{ marginBottom: "20px" }}>
              {workout.name}
            </h2>
          </div>
          <div className={styles.body}>
            {muscles.map((muscle) => {
              if (muscle.WorkoutId === workout.id) {
                return (
                  <div className={styles.muscle}>
                    <div style={{ margin: "20px" }}>
                      <div style={{ marginBottom: "20px", display: "inline" }}>
                        {muscle.name}
                      </div>
                    </div>
                    <div className={styles.exercises}>
                      {exercises.map((exercise) => {
                        if (exercise.MuscleId === muscle.id) {
                          return (
                            <>
                              <div className={styles.exercise}>
                                <div style={{ display: "inline" }}>
                                  {exercise.name} {exercise.sets} x{" "}
                                  {exercise.reps}
                                </div>
                              </div>
                            </>
                          );
                        }
                      })}
                    </div>
                  </div>
                );
              }
            })}
            <button
              id="btn"
              type="submit"
              className={styles.button}
              onClick={() => {
                deleteWorkout();
                openModal(false);
              }}
              style={{ marginTop: "10px" }}
            >
              Delete Event
            </button>
          </div>
        </div>
      );
    } else if (eventType === "Shopping") {
      return (
        <div className={styles.modalContainer} style={{ top: position }}>
          <div className={styles.titleCloseBtn}>
            <button onClick={() => openModal(false)}>X</button>
          </div>
          <div className={styles.title}>
            <h2 className={styles.header} style={{ marginBottom: "20px" }}>
              {shopping.name}
            </h2>
          </div>
          <div className={styles.body}>
            <div className={styles.header}>
              <h3 className={styles.header}>
                Items:
                <ul style={{ display: "block", padding: "10px" }}>
                  {items.map((i) => {
                    if (i.ShoppingId === shopping.id)
                      return (
                        <li
                          style={{
                            display: "block",
                            fontSize: "20px",
                            margin: "5px",
                          }}
                        >
                          <CircleIcon
                            sx={{
                              width: "10px",
                              height: "10px",
                              marginRight: "5px",
                            }}
                          />
                          {i.name}
                        </li>
                      );
                  })}
                </ul>
                <button
                  id="btn"
                  type="submit"
                  className={styles.button}
                  onClick={() => {
                    openModal(false);
                    deleteShopping();
                  }}
                  style={{ marginTop: "40px" }}
                >
                  Delete Event
                </button>
              </h3>
            </div>
          </div>
        </div>
      );
    }
  }
}
