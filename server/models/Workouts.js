module.exports = (sequelize, DataTypes) => {
  const Workouts = sequelize.define("Workouts", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Workouts.associate = (models) => {
    Workouts.hasMany(models.Muscles, {
      onDelete: "cascade",
    });
    Workouts.hasMany(models.WorkoutEvents, {
      onDelete: "cascade",
    });
  };
  return Workouts;
};
