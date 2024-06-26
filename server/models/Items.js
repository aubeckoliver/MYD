module.exports = (sequelize, DataTypes) => {
  const Items = sequelize.define("Items", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Items;
};
