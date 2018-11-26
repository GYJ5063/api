'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sales_history_analyzes', {
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
      price_chage_percent: Sequelize.DECIMAL(7, 4),
      price_change: Sequelize.INTEGER(11),
      sold_date: Sequelize.DATE,
      sold_price: Sequelize.INTEGER(11)
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sales_history_analyzes');
  }
};