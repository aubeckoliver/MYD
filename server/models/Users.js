module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dayStart: {
      type: DataTypes.INTEGER,
      defaultValue: 8,
    },
    dayEnd: {
      type: DataTypes.INTEGER,
      defaultValue: 22,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Events, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Projects, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Shopping, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Subjects, {
      onDelete: "cascade",
    });

    Users.hasMany(models.Workouts, {
      onDelete: "cascade",
    });
  };
  return Users;
};
