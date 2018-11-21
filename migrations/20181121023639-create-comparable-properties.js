'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comparable_properties', {
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
        },
        address_id: {
          allowNull: false,
          references: { model: 'addresses', key: 'id'},
          type: Sequelize.INTEGER(10).UNSIGNED,
        },
        current_valuation: {
          type: Sequelize.INTEGER(10).UNSIGNED
        },
        distance_to_query_property: {
          type: Sequelize.INTEGER(10)
        },
        sold_date: {
          type: Sequelize.DATE
        },
        sold_price: {
          type: Sequelize.INTEGER(10).UNSIGNED
        },
        rooms: {
          type: Sequelize.INTEGER(3).UNSIGNED
        },
        size: {
          type: Sequelize.INTEGER(5)
        },
        house_type: {
          type: Sequelize.STRING
        },
        lat: {
          type: Sequelize.DECIMAL
        },
        address_1: {
          type: Sequelize.STRING
        },
        lng: {
          type: Sequelize.DECIMAL
        },
        house_type_out: {
          type: Sequelize.STRING
        },
        postcode: {
          type: Sequelize.STRING(8)
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('comparable_properties');
  }
};