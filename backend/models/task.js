module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      carBrand: {
        type: DataTypes.STRING,
        allowNull: false
      },
      operationName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {});
    Task.associate = function(models) {
      Task.belongsTo(models.Mechanic);
    };
    return Task;
  };