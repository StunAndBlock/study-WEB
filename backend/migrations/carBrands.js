module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable('CarBrands', {
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true,
          unique: true
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    },
  
    async down(queryInterface, Sequelize) {
      await queryInterface.dropTable('CarBrands');
    }
  };