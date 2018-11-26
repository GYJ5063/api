'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('national_avg_price_10y', {
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
      index_1: {
        type: Sequelize.INTEGER(11)
      },
      index_2: {
        type: Sequelize.INTEGER(11)
      },
      index_3: {
        type: Sequelize.INTEGER(11)
      },
      index_4: {
        type: Sequelize.INTEGER(11)
      },
      index_5: {
        type: Sequelize.INTEGER(11)
      },
      index_6: {
        type: Sequelize.INTEGER(11)
      },
      index_7: {
        type: Sequelize.INTEGER(11)
      },
      index_8: {
        type: Sequelize.INTEGER(11)
      },
      index_9: {
        type: Sequelize.INTEGER(11)
      },
      index_10: {
        type: Sequelize.INTEGER(11)
      },
      index_11: {
        type: Sequelize.INTEGER(11)
      },
      index_12: {
        type: Sequelize.INTEGER(11)
      },
      index_13: {
        type: Sequelize.INTEGER(11)
      },
      index_14: {
        type: Sequelize.INTEGER(11)
      },
      index_15: {
        type: Sequelize.INTEGER(11)
      },
      index_16: {
        type: Sequelize.INTEGER(11)
      },
      index_17: {
        type: Sequelize.INTEGER(11)
      },
      index_18: {
        type: Sequelize.INTEGER(11)
      },
      index_19: {
        type: Sequelize.INTEGER(11)
      },
      index_20: {
        type: Sequelize.INTEGER(11)
      },
      index_21: {
        type: Sequelize.INTEGER(11)
      },
      index_22: {
        type: Sequelize.INTEGER(11)
      },
      index_23: {
        type: Sequelize.INTEGER(11)
      },
      index_24: {
        type: Sequelize.INTEGER(11)
      },
      index_25: {
        type: Sequelize.INTEGER(11)
      },
      index_26: {
        type: Sequelize.INTEGER(11)
      },
      index_27: {
        type: Sequelize.INTEGER(11)
      },
      index_28: {
        type: Sequelize.INTEGER(11)
      },
      index_29: {
        type: Sequelize.INTEGER(11)
      },
      index_30: {
        type: Sequelize.INTEGER(11)
      },
      index_31: {
        type: Sequelize.INTEGER(11)
      },
      index_32: {
        type: Sequelize.INTEGER(11)
      },
      index_33: {
        type: Sequelize.INTEGER(11)
      },
      index_34: {
        type: Sequelize.INTEGER(11)
      },
      index_35: {
        type: Sequelize.INTEGER(11)
      },
      index_36: {
        type: Sequelize.INTEGER(11)
      },
      index_37: {
        type: Sequelize.INTEGER(11)
      },
      index_38: {
        type: Sequelize.INTEGER(11)
      },
      index_39: {
        type: Sequelize.INTEGER(11)
      },
      index_40: {
        type: Sequelize.INTEGER(11)
      },
      index_41: {
        type: Sequelize.INTEGER(11)
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('national_avg_price_10y');
  }
};