'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'users',
      'company_id',
      {
        type: Sequelize.INTEGER(10).UNSIGNED,
        allowNull: true,
        references: {
          model: "companies",
          key: "id"
      }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeConstraint('users', 'users_company_id_foreign_idx')
      .then(() => {
        return queryInterface.removeIndex('users', 'users_company_id_foreign_idx');
      }).then(() => {
        return queryInterface.removeColumn('users', 'company_id');
      });
  }
};
