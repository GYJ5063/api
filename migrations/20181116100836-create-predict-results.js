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
      report_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "reports",
          key: "id"
        }
      },
      predict_price: {
        type: Sequelize.INTEGER(11)
      },
      probability: {
        type: Sequelize.DECIMAL(5, 2)
      },
      exist_in_epc: {
        type: Sequelize.BOOLEAN
      },
      predict_price_low: {
        type: Sequelize.INTEGER(11)
      },
      band: {
        type: Sequelize.DECIMAL(6, 4)
      },
      address_1: {
        type: Sequelize.STRING
      },
      predict_price_up: {
        type: Sequelize.INTEGER(11)
      },
      lat: {
        type: Sequelize.DECIMAL(10, 6)
      },
      lng: {
        type: Sequelize.DECIMAL(10, 6)
      },
      confidence_level: {
        type: Sequelize.INTEGER(4)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('predict_results');
  }
};