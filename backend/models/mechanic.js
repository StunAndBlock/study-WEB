module.exports = (sequelize, DataTypes) => {
    const Mechanic = sequelize.define('Mechanic', {
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      carBrands: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
      }
    }, {});
    Mechanic.associate = function(models) {
      Mechanic.hasMany(models.Task);
    };
    return Mechanic;
  };