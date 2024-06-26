module.exports = (sequelize, DataTypes) => {
  const Muscles = sequelize.define("Muscles", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Muscles.associate = (models) => {
    Muscles.hasMany(models.Exercises, {
      onDelete: "cascade",
    });
  };
  return Muscles;
};
