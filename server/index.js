const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const eventsRouter = require("./routes/Events");
app.use("/events", eventsRouter);

const projectsRouter = require("./routes/Projects");
app.use("/projects", projectsRouter);

const tasksRouter = require("./routes/Tasks");
app.use("/tasks", tasksRouter);

const workoutsRouter = require("./routes/Workouts");
app.use("/workouts", workoutsRouter);

const exercisesRouter = require("./routes/Exercises");
app.use("/exercises", exercisesRouter);

const musclesRouter = require("./routes/Muscles");
app.use("/muscles", musclesRouter);

const shoppingRouter = require("./routes/Shopping");
app.use("/shopping", shoppingRouter);

const itemsRouter = require("./routes/Items");
app.use("/items", itemsRouter);

const subjectsRouter = require("./routes/Subjects");
app.use("/subjects", subjectsRouter);

const sectionsRouter = require("./routes/Sections");
app.use("/sections", sectionsRouter);

const projectEventsRouter = require("./routes/ProjectEvents");
app.use("/projectevents", projectEventsRouter);

const workoutEventsRouter = require("./routes/WorkoutEvents");
app.use("/workoutevents", workoutEventsRouter);

const subjectEventsRouter = require("./routes/SubjectEvents");
app.use("/subjectevents", subjectEventsRouter);

const shoppingEventsRouter = require("./routes/ShoppingEvents");
app.use("/shoppingEvents", shoppingEventsRouter);

app.use("/health", (req, res, next) => {
  res.json({});
  next();
});

db.sequelize.sync().then(() => {
  app.listen(3002, () => {
    console.log("Server running...");
  });
});
