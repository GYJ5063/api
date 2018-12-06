'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async t => {
      await queryInterface.addColumn(
        'leads',
        'address_id',
        {
          type: Sequelize.INTEGER(10).UNSIGNED,
          // needs to be nullable at this stage to not violate constraint
          allowNull: true,
          references: {
            model: "addresses",
            key: "id"
          }
        },
        { transaction: t }
      );

      // set values for the column
      await queryInterface.sequelize.query(
        `UPDATE leads l
        JOIN reports r ON r.id = l.report_id
        SET l.address_id = r.address_id`,
        { transaction: t }
      );

      // make column non nullable
      return await queryInterface.changeColumn(
        'leads',
        'address_id',
        {
          type: Sequelize.INTEGER(10).UNSIGNED,
          allowNull: false
        },
        { transaction: t }
      );
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('leads', 'leads_address_id_foreign_idx')
    .then(() => {
      return queryInterface.removeIndex('leads', 'leads_address_id_foreign_idx');
    }).then(() => {
      return queryInterface.removeColumn('leads', 'address_id');
    });
  }
};
