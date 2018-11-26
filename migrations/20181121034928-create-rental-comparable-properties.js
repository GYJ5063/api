'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rental_comparable_properties', {
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
      distance: {
        type: Sequelize.INTEGER(10)
      },
      available_from: {
        type: Sequelize.STRING
      },
      display_address: {
        type: Sequelize.STRING
      },
      lng: {
        type: Sequelize.DECIMAL(10, 6)
      },
      price: {
        type: Sequelize.INTEGER(11)
      },
      num_beds: {
        type: Sequelize.INTEGER
      },
      num_baths: {
        type: Sequelize.INTEGER
      },
      lat: {
        type: Sequelize.DECIMAL(10, 6)
      },
      front_image_url: {
        type: Sequelize.STRING
      },
      property_type: {
        type: Sequelize.STRING
      },
      furnished_state: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('rental_comparable_properties');
  }
};