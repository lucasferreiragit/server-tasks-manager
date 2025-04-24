const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "task",
    {
      id: {
        type: DataTypes.UUID,

        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      priority: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
        defaultValue: "1",
        allowNull: false,
      },
    },
    { timestamps: true, createdAt: "createdAt", updatedAt: "updatedAt" }
  );
};
