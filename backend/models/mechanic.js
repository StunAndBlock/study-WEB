module.exports = (sequelize, DataTypes) => {
    const Mechanic = sequelize.define('Mechanic', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      carBrands: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      }
    }, 
    {
      tableName: 'Mechanics',
    });
    Mechanic.associate = function(models) {
      Mechanic.hasMany(models.Task, {
        foreignKey: 'mechanicId', // Указываем ключ для связи
        as: 'tasks', // Удобный алиас
      });
    };
    return Mechanic;
  };

  