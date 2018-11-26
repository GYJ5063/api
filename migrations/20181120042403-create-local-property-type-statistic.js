'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('local_property_type_statistics', {
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
      Detached_num_ratio: {
        type: Sequelize.DECIMAL(5, 3)
      },
      Detached_average_value: {
        type: Sequelize.INTEGER(11)
      },
      Detached_average_size: {
        type: Sequelize.INTEGER(5)
      },
      Detached_per_size_value: {
        type: Sequelize.INTEGER(6)
      },
      Semi_Detached_num_ratio: {
        type: Sequelize.DECIMAL(5, 3)
      },
      Semi_Detached_average_value: {
        type: Sequelize.INTEGER(11)
      },
      Semi_Detached_average_size: {
        type: Sequelize.INTEGER(5)
      },
      Semi_Detached_per_size_value: {
        type: Sequelize.INTEGER(6)
      },
      Terrace_num_ratio: {
        type: Sequelize.DECIMAL(5, 3)
      },
      Terrace_average_value: {
        type: Sequelize.INTEGER(11)
      },
      Terrace_average_size: {
        type: Sequelize.INTEGER(5)
      },
      Terrace_per_size_value: {
        type: Sequelize.INTEGER(6)
      },
      Flat_num_ratio: {
        type: Sequelize.DECIMAL(5, 3)
      },
      Flat_average_value: {
        type: Sequelize.INTEGER(11)
      },
      Flat_average_size: {
        type: Sequelize.INTEGER(5)
      },
      Flat_per_size_value: {
        type: Sequelize.INTEGER(6)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('local_property_type_statistics');
  }
};