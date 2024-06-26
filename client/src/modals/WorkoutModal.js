import React, { useState } from "react";
import styles from "../style/WorkoutModal.module.css";
import axios from "axios";

export default function WorkoutModal({
  closeModal,
  setWorkouts,
  workouts,
  modal,
  workoutId,
  muscleId,
  setOpenModal,
  muscles,
  setMuscles,
  exercises,
  setExercises,
  exerciseId,
}) {
  const [name, setName] = useState(" ");
  const [muscleName, setMuscleName] = useState(" ");
  const [exerciseName, setExerciseName] = useState(" ");
  const [sets, setSets] = useState(0);
  const [reps, setReps] = useState(0);

  function handleWorkOutChange() {
    axios
      .post(
        process.env.REACT_APP_BACKEND_BASE_URL + "/workouts/new",
        {
          name: name,
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
          setWorkouts([...workouts, response.data]);
        }
      });
  }

  function handleMusclesChange() {
    axios
      .post(
        process.env.REACT_APP_BACKEND_BASE_URL + "/muscles/new",
        {
          name: muscleName,
          WorkoutId: workoutId,
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
          setMuscles([...muscles, response.data]);
        }
      });
  }

  function handleExercisesChange() {
    axios
      .post(
        process.env.REACT_APP_BACKEND_BASE_URL + "/exercises/new",
        {
          name: exerciseName,
          MuscleId: muscleId,
          reps: reps,
          sets: sets,
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
          setExercises([...exercises, response.data]);
        }
      });
  }

  function editExercise() {
    if (exerciseName !== " ") {
      axios.put(
        process.env.REACT_APP_BACKEND_BASE_URL + "/exercises/editname",
        {
          newName: exerciseName,
          id: exerciseId,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );
      const newExercises = exercises.map((e) => {
        if (e.id === exerciseId) {
          return { ...e, name: exerciseName };
        } else {
          return e;
        }
      });
      setExercises(newExercises);
    }

    if (sets !== 0) {
      axios.put(
        process.env.REACT_APP_BACKEND_BASE_URL + "/exercises/editsets",
        {
          newReps: sets,
          id: exerciseId,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      const newExercises = exercises.map((e) => {
        if (e.id === exerciseId) {
          return { ...e, sets: sets };
        } else {
          return e;
        }
      });

      setExercises(newExercises);
    }

    if (reps !== 0) {
      axios.put(
        process.env.REACT_APP_BACKEND_BASE_URL + "/exercises/editreps",
        {
          newReps: reps,
          id: exerciseId,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      );

      const newExercises = exercises.map((e) => {
        if (e.id === exerciseId) {
          return { ...e, reps: reps };
        } else {
          return e;
        }
      });

      setExercises(newExercises);
    }
  }

  function editMuscle() {
    axios.put(
      process.env.REACT_APP_BACKEND_BASE_URL + "/muscles/edit",
      {
        newName: muscleName,
        id: muscleId,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );

    const newMuscles = muscles.map((e) => {
      if (e.id === muscleId) {
        return { ...e, name: muscleName };
      } else {
        return e;
      }
    });

    setMuscles(newMuscles);
  }

  function editWorkout() {
    axios.put(
      process.env.REACT_APP_BACKEND_BASE_URL + "/workouts/edit",
      {
        newName: name,
        id: workoutId,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );

    const newWorkouts = muscles.map((e) => {
      if (e.id === workoutId) {
        return { ...e, name: name };
      } else {
        return e;
      }
    });

    setWorkouts(newWorkouts);
  }

  if (modal === "workout") {
    return (
      <div className={styles.modalContainer} style={{ top: "40%" }}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className={styles.title}>
          <h1 className={styles.header}>New Workout</h1>
        </div>
        <div className={styles.body}>
          <form className={styles.form}>
            <br />
            <label className={styles.label}>Name: </label>
            <br />
            <input
              name="workout"
              type="text"
              className={styles.data}
              onChange={(event) => setName(event.target.value)}
            ></input>
            <br />
            <button
              id="btn"
              type="submit"
              className={styles.button}
              onClick={(e) => {
                handleWorkOutChange();
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
  } else if (modal === "muscle") {
    return (
      <div className={styles.modalContainer} style={{ top: "40%" }}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className={styles.title}>
          <h1 className={styles.header}>New Muscle</h1>
        </div>
        <div className={styles.body}>
          <form className={styles.form}>
            <br />
            <label className={styles.label}>Name: </label>
            <br />
            <input
              name="muscle"
              type="text"
              className={styles.data}
              onChange={(event) => {
                setMuscleName(event.target.value);
              }}
            ></input>
            <br />
            <button
              id="btn"
              type="submit"
              className={styles.button}
              onClick={(e) => {
                handleMusclesChange();
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
  } else if (modal === "exercise") {
    return (
      <div className={styles.modalContainer} style={{ top: "40%" }}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className={styles.title}>
          <h1 className={styles.header}>New Exercise</h1>
        </div>
        <div className={styles.body}>
          <form className={styles.exerciseForm}>
            <br />
            <label className={styles.label}>Name: </label>
            <br />
            <input
              name="exercise"
              type="text"
              className={styles.data}
              style={{ marginBottom: "15px" }}
              onChange={(event) => setExerciseName(event.target.value)}
            />
            <br />
            <label className={styles.label}>Sets: </label>
            <input
              name="sets"
              type="number"
              className={styles.sets}
              style={{ marginRight: "5px" }}
              onChange={(event) => setSets(event.target.value)}
            />
            <label className={styles.label} style={{ marginLeft: "5px" }}>
              Reps:{" "}
            </label>
            <input
              name="reps"
              type="number"
              className={styles.reps}
              style={{ marginLeft: 0 }}
              onChange={(event) => setReps(event.target.value)}
            />
            <br />
            <button
              id="btn"
              type="submit"
              className={styles.exerciseButton}
              onClick={(e) => {
                handleExercisesChange();
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
  } else if (modal === "exerciseEdit") {
    return (
      <div className={styles.modalContainer} style={{ top: "40%" }}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className={styles.title}>
          <h1 className={styles.header}>Edit Exercise</h1>
        </div>
        <div className={styles.body}>
          <form className={styles.exerciseForm}>
            <br />
            <label className={styles.label}>Name: </label>
            <br />
            <input
              name="exercise"
              type="text"
              className={styles.data}
              style={{ marginBottom: "15px" }}
              onChange={(event) => setExerciseName(event.target.value)}
            />
            <br />
            <label className={styles.label}>Sets: </label>
            <input
              name="sets"
              type="number"
              className={styles.sets}
              style={{ marginRight: "5px" }}
              onChange={(event) => setSets(event.target.value)}
            />
            <label className={styles.label} style={{ marginLeft: "5px" }}>
              Reps:{" "}
            </label>
            <input
              name="reps"
              type="number"
              className={styles.reps}
              style={{ marginLeft: 0 }}
              onChange={(event) => setReps(event.target.value)}
            />
            <br />
            <button
              id="btn"
              type="submit"
              className={styles.button}
              onClick={(e) => {
                editExercise();
                e.preventDefault();
                setOpenModal(false);
              }}
            >
              Edit!
            </button>
          </form>
        </div>
      </div>
    );
  } else if (modal === "muscleEdit") {
    return (
      <div className={styles.modalContainer} style={{ top: "40%" }}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className={styles.title}>
          <h1 className={styles.header}>Edit Muscle</h1>
        </div>
        <div className={styles.body}>
          <form className={styles.form}>
            <br />
            <label className={styles.label}>Name: </label>
            <input
              name="muscle"
              type="text"
              className={styles.data}
              onChange={(event) => setMuscleName(event.target.value)}
            ></input>
            <br />
            <button
              id="btn"
              type="submit"
              className={styles.button}
              onClick={(e) => {
                editMuscle();
                e.preventDefault();
                setOpenModal(false);
              }}
            >
              Edit!
            </button>
          </form>
        </div>
      </div>
    );
  } else if (modal === "workoutEdit") {
    return (
      <div className={styles.modalContainer} style={{ top: "40%" }}>
        <div className={styles.titleCloseBtn}>
          <button onClick={() => closeModal(false)}>X</button>
        </div>
        <div className={styles.title}>
          <h1 className={styles.header}>Edit Workout</h1>
        </div>
        <div className={styles.body}>
          <form className={styles.form}>
            <br />
            <label className={styles.label}>Name: </label>
            <input
              name="workout"
              type="text"
              className={styles.data}
              onChange={(event) => setName(event.target.value)}
            ></input>
            <br />
            <button
              id="btn"
              type="submit"
              className={styles.button}
              onClick={(e) => {
                editWorkout();
                e.preventDefault();
                setOpenModal(false);
              }}
            >
              Edit!
            </button>
          </form>
        </div>
      </div>
    );
  }
}
