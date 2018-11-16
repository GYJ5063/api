'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('predict_results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      predict_price: {
        type: Sequelize.INTEGER
      },
      probability: {
        type: Sequelize.DECIMAL
      },
      exist_in_epc: {
        type: Sequelize.BOOLEAN
      },
      predict_price_low: {
        type: Sequelize.INTEGER
      },
      band: {
        type: Sequelize.DECIMAL
      },
      address_1: {
        type: Sequelize.STRING
      },
      predict_price_up: {
        type: Sequelize.INTEGER
      },
      lat: {
        type: Sequelize.DECIMAL
      },
      lng: {
        type: Sequelize.DECIMAL
      },
      confidence_level: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('predict_results');
  }
};