module.exports = (sequelize, DataTypes) => {
    const CarBrand = sequelize.define('CarBrand', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
    }, {});
  
    return CarBrand;
  };