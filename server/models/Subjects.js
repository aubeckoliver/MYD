module.exports = (sequelize, DataTypes) => {
  const Subjects = sequelize.define("Subjects", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Subjects.associate = (models) => {
    Subjects.hasMany(models.Sections, {
      onDelete: "cascade",
    });
    Subjects.hasMany(models.SubjectEvents, {
      onDelete: "cascade",
    });
  };
  return Subjects;
};
