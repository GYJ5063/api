'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_roles', {
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED
      },
      role_id: {
        allowNull: false,
        type: Sequelize.INTEGER(10).UNSIGNED
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_roles');
  }
};