'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('query_infos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      report_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "reports",
          key: "id"
        }
      },
      address_id: {
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED,
        references: {
          model: "addresses",
          key: "id"
        }
      },
      number_habitable_rooms: Sequelize.INTEGER,
      built_from: Sequelize.ENUM('Enclosed End-Terrace', 'Enclosed Mid-Terrace', 'End-Terrace', 'Mid-Terrace', 'Semi-Detached', 'Detached'),
      total_floor_area: Sequelize.INTEGER,
      wall_type: Sequelize.ENUM('brick', 'cavity wall', 'timber', 'stone', 'cob', 'unknown'),
      property_type : Sequelize.ENUM('Flat', 'Maisonette', 'Bungalow', 'House')
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('query_infos');
  }
};