import React, { useState, useEffect } from "react";
import styles from "../style/Workout.module.css";
import WorkoutModal from "../modals/WorkoutModal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";

function Workout() {
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState("");
  const [workoutId, setWorkoutId] = useState(0);
  const [muscleId, setMuscleId] = useState(0);
  const [exerciseId, setExerciseId] = useState(0);
  const [workouts, setWorkouts] = useState([]);
  const [muscles, setMuscles] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND_BASE_URL + "/workouts", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        setWorkouts(response.data.listOfWorkouts);
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
  }, []);

  let position = "0%";

  function deleteExercise(id) {
    axios.delete(
      process.env.REACT_APP_BACKEND_BASE_URL + `/exercises/delete/${id}`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );

    setExercises(exercises.filter((e) => e.id !== id));
  }

  function deleteMuscle(id) {
    axios.delete(
      process.env.REACT_APP_BACKEND_BASE_URL + `/muscles/delete/${id}`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );

    setMuscles(muscles.filter((e) => e.id !== id));
  }

  function deleteProg(id) {
    axios.delete(
      process.env.REACT_APP_BACKEND_BASE_URL + `/workouts/delete/${id}`,
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    );

    setWorkouts(workouts.filter((e) => e.id !== id));
  }

  return (
    <div className={styles.all}>
      <h1 className={styles.h1} style={{ marginBottom: "100px" }}>
        Workout
      </h1>
      {workouts !== undefined &&
        workouts.map((value) => {
          return (
            <div className={styles.prog}>
              <div style={{ margin: "20px" }}>
                <div style={{ marginBottom: "20px", display: "inline" }}>
                  {value.name}
                </div>
                {edit && (
                  <div style={{ display: "inline", padding: "0px" }}>
                    <div
                      style={{ display: "inline", padding: "0px" }}
                      onClick={() => {
                        setOpenModal(true);
                        setModal("Edit");
                        setWorkoutId(value.id);
                      }}
                    >
                      <EditIcon
                        fontSize="medium"
                        sx={{ marginLeft: "5px" }}
                        viewBox="0 0 22 22"
                      />
                    </div>
                    <div
                      style={{ display: "inline", padding: "0px" }}
                      onClick={() => {
                        deleteProg(value.id);
                      }}
                    >
                      <ClearIcon
                        fontSize="medium"
                        sx={{ marginLeft: "0px" }}
                        viewBox="0 0 20 20"
                      />
                    </div>
                  </div>
                )}
              </div>
              {muscles.map((muscle) => {
                if (muscle.WorkoutId === value.id) {
                  return (
                    <div className={styles.muscle}>
                      <div style={{ margin: "20px" }}>
                        <div
                          style={{ marginBottom: "20px", display: "inline" }}
                        >
                          {muscle.name}
                        </div>
                        {edit && (
                          <div style={{ display: "inline", padding: "0px" }}>
                            <div
                              style={{ display: "inline", padding: "0px" }}
                              onClick={() => {
                                setOpenModal(true);
                                setModal("muscleEdit");
                                setMuscleId(muscle.id);
                              }}
                            >
                              <EditIcon
                                fontSize="small"
                                sx={{ marginLeft: "5px" }}
                                viewBox="0 0 22 22"
                              />
                            </div>
                            <div
                              style={{ display: "inline", padding: "0px" }}
                              onClick={() => {
                                deleteMuscle(muscle.id);
                              }}
                            >
                              <ClearIcon
                                fontSize="small"
                                sx={{ marginLeft: "0px" }}
                                viewBox="0 0 20 20"
                              />
                            </div>
                          </div>
                        )}
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
                                  {edit && (
                                    <div
                                      style={{
                                        display: "inline",
                                        padding: "0px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "inline",
                                          padding: "0px",
                                        }}
                                        onClick={() => {
                                          setOpenModal(true);
                                          setModal("exerciseEdit");
                                          setExerciseId(exercise.id);
                                        }}
                                      >
                                        <EditIcon
                                          fontSize="small"
                                          sx={{ marginLeft: "5px" }}
                                          viewBox="0 0 22 22"
                                        />
                                      </div>
                                      <div
                                        style={{
                                          display: "inline",
                                          padding: "0px",
                                        }}
                                        onClick={() => {
                                          deleteExercise(exercise.id);
                                        }}
                                      >
                                        <ClearIcon
                                          fontSize="small"
                                          sx={{ marginLeft: "0px" }}
                                          viewBox="0 0 20 20"
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </>
                            );
                          }
                        })}
                      </div>
                      <Fab
                        size="small"
                        sx={{ bgcolor: "lime", zIndex: 0 }}
                        style={{ backgroundColor: "coral" }}
                        aria-label="add"
                        onClick={() => {
                          setOpenModal(true);
                          setModal("exercise");
                          setMuscleId(muscle.id);
                        }}
                        className={styles.fab}
                      >
                        <AddIcon />
                      </Fab>
                    </div>
                  );
                }
              })}
              <Fab
                size="medium"
                sx={{ bgcolor: "lime", zIndex: 0 }}
                style={{ backgroundColor: "coral" }}
                aria-label="add"
                onClick={() => {
                  setOpenModal(true);
                  setModal("muscle");
                  setWorkoutId(value.id);
                }}
                className={styles.fab}
              >
                <AddIcon />
              </Fab>
            </div>
          );
        })}
      <div className={styles.btns}>
        <Fab
          size="large"
          sx={{ bgcolor: "lime", zIndex: 0, margin: "2px" }}
          style={{ backgroundColor: "coral" }}
          aria-label="add"
          onClick={() => {
            setOpenModal(true);
            setModal("workout");
          }}
          className={styles.fab}
        >
          <AddIcon />
        </Fab>
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
      </div>

      {openModal && (
        <WorkoutModal
          closeModal={setOpenModal}
          position={position}
          setWorkouts={setWorkouts}
          workouts={workouts}
          modal={modal}
          workoutId={workoutId}
          muscleId={muscleId}
          setOpenModal={setOpenModal}
          muscles={muscles}
          setMuscles={setMuscles}
          exercises={exercises}
          setExercises={setExercises}
          exerciseId={exerciseId}
        />
      )}
    </div>
  );
}

export default Workout;
