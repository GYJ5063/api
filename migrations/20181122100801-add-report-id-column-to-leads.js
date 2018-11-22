'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'leads',
      'report_id',
      {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "reports",
          key: "id"
        }
      }
    ).then(res => console.log(res))
     .catch(err => console.error(err));
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('leads', 'leads_report_id_foreign_idx')
    .then(() => {
      return queryInterface.removeIndex('leads', 'leads_report_id_foreign_idx');
    }).then(() => {
      return queryInterface.removeColumn('leads', 'report_id');
    });
  }
};
