module.exports = (sequelize, DataTypes) => {
  const Shopping = sequelize.define("Shopping", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Shopping.associate = (models) => {
    Shopping.hasMany(models.Items, {
      onDelete: "cascade",
    });
    Shopping.hasMany(models.ShoppingEvents, {
      onDelete: "cascade",
    });
  };
  return Shopping;
};
