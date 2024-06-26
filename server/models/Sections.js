module.exports = (sequelize, DataTypes) => {
  const Sections = sequelize.define("Sections", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Sections;
};
