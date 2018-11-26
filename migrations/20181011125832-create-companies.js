'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('companies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      telephone : {
        allowNull: false,
        type: Sequelize.STRING(15)
      },
      logo : {
          allowNull: true,
          type: Sequelize.STRING
      },
      primary_colour : {
          allowNull: true,
          type: Sequelize.STRING(8)
      },
      website_url : {
          allowNull: true,
          type: Sequelize.STRING
      },
      valuation_url : {
          allowNull: true,
          type: Sequelize.STRING
      },
      page_title : {
          allowNull: true,
          type: Sequelize.STRING
      },
      meta_description : {
          allowNull: true,
          type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('companies');
  }
};