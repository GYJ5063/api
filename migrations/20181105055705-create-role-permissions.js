'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('role_permissions', {
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      permission_id: {
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('role_permissions');
  }
};