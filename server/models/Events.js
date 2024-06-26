module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define("Events", {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    day: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hour: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Events.associate = (models) => {
    Events.hasMany(models.Tasks, {
      onDelete: "cascade",
    });
    Events.hasMany(models.Sections, {
      onDelete: "cascade",
    });
    Events.hasMany(models.ProjectEvents, {
      onDelete: "cascade",
    });
    Events.hasMany(models.WorkoutEvents, {
      onDelete: "cascade",
    });
    Events.hasMany(models.SubjectEvents, {
      onDelete: "cascade",
    });
    Events.hasMany(models.ShoppingEvents, {
      onDelete: "cascade",
    });
  };
  return Events;
};
