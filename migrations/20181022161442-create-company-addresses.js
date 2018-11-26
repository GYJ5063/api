'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('company_addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      company_id: {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: false,
        references: {
          model: "companies",
          key: "id"
        }
      },
      postcode: {
        type: Sequelize.STRING(8),
        allowNull: false
      },
      town: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      building_number: {
        type: Sequelize.INTEGER(11),
        allowNull: false
      },
      building_name: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      sub_building_name: {
        type: Sequelize.STRING(30),
        allowNull: true
      },
      po_box: {
        type: Sequelize.STRING(6),
        allowNull: true
      },
      department_name: {
        type: Sequelize.STRING(60),
        allowNull: true
      },
      organisation_name: {
        type: Sequelize.STRING(60),
        allowNull: true
      },
      postcode_type: {
        type: Sequelize.STRING(1),
        allowNull: true
      },
      su_organisation_indicator: {
        type: Sequelize.STRING(1),
        allowNull: true
      },
      delivery_point_suffix: {
        type: Sequelize.STRING(2),
        allowNull: true
      },
      lat: {
        type: Sequelize.DECIMAL(10, 6),
        allowNull: true
      },
      lng: {
        type: Sequelize.DECIMAL(10, 6),
        allowNull: true
      },
      udprn: {
        type: Sequelize.INTEGER(11),
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('company_addresses');
  }
};