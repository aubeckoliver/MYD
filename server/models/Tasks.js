module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define("Tasks", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Tasks;
};
