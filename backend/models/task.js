module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
      
    },
    carBrand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    operation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complexity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mechanicId: { // Здесь явно указываем имя столбца
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Mechanics',
        key: 'id',
      },
    },
  }, {});
  return Task;
};