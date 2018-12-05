'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'companies',
      'secondary_colour',
      {
        type: Sequelize.STRING(8)
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('companies', 'secondary_colour');
  }
};
