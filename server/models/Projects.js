module.exports = (sequelize, DataTypes) => {
  const Projects = sequelize.define("Projects", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Projects.associate = (models) => {
    Projects.hasMany(models.Tasks, {
      onDelete: "cascade",
    });
    Projects.hasMany(models.ProjectEvents, {
      onDelete: "cascade",
    });
  };
  return Projects;
};
