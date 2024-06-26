module.exports = (sequelize, DataTypes) => {
  const Exercises = sequelize.define("Exercises", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Exercises;
};
