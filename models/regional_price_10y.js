'use strict';
module.exports = (sequelize, DataTypes) => {
  const regional_price_10y = sequelize.define('regional_price_10y', {
    report_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "reports",
        key: "id"
      }
    },
    index_1: {
      type: DataTypes.INTEGER(11)
    },
    index_2: {
      type: DataTypes.INTEGER(11)
    },
    index_3: {
      type: DataTypes.INTEGER(11)
    },
    index_4: {
      type: DataTypes.INTEGER(11)
    },
    index_5: {
      type: DataTypes.INTEGER(11)
    },
    index_6: {
      type: DataTypes.INTEGER(11)
    },
    index_7: {
      type: DataTypes.INTEGER(11)
    },
    index_8: {
      type: DataTypes.INTEGER(11)
    },
    index_9: {
      type: DataTypes.INTEGER(11)
    },
    index_10: {
      type: DataTypes.INTEGER(11)
    },
    index_11: {
      type: DataTypes.INTEGER(11)
    },
    index_12: {
      type: DataTypes.INTEGER(11)
    },
    index_13: {
      type: DataTypes.INTEGER(11)
    },
    index_14: {
      type: DataTypes.INTEGER(11)
    },
    index_15: {
      type: DataTypes.INTEGER(11)
    },
    index_16: {
      type: DataTypes.INTEGER(11)
    },
    index_17: {
      type: DataTypes.INTEGER(11)
    },
    index_18: {
      type: DataTypes.INTEGER(11)
    },
    index_19: {
      type: DataTypes.INTEGER(11)
    },
    index_20: {
      type: DataTypes.INTEGER(11)
    },
    index_21: {
      type: DataTypes.INTEGER(11)
    },
    index_22: {
      type: DataTypes.INTEGER(11)
    },
    index_23: {
      type: DataTypes.INTEGER(11)
    },
    index_24: {
      type: DataTypes.INTEGER(11)
    },
    index_25: {
      type: DataTypes.INTEGER(11)
    },
    index_26: {
      type: DataTypes.INTEGER(11)
    },
    index_27: {
      type: DataTypes.INTEGER(11)
    },
    index_28: {
      type: DataTypes.INTEGER(11)
    },
    index_29: {
      type: DataTypes.INTEGER(11)
    },
    index_30: {
      type: DataTypes.INTEGER(11)
    },
    index_31: {
      type: DataTypes.INTEGER(11)
    },
    index_32: {
      type: DataTypes.INTEGER(11)
    },
    index_33: {
      type: DataTypes.INTEGER(11)
    },
    index_34: {
      type: DataTypes.INTEGER(11)
    },
    index_35: {
      type: DataTypes.INTEGER(11)
    },
    index_36: {
      type: DataTypes.INTEGER(11)
    },
    index_37: {
      type: DataTypes.INTEGER(11)
    },
    index_38: {
      type: DataTypes.INTEGER(11)
    },
    index_39: {
      type: DataTypes.INTEGER(11)
    },
    index_40: {
      type: DataTypes.INTEGER(11)
    },
    index_41: {
      type: DataTypes.INTEGER(11)
    },
    regional_name: {
      type: DataTypes.STRING
    },
    area_code: {
      type: DataTypes.STRING
    }
  }, { timestamps: false, tableName: 'regional_price_10y' });
  regional_price_10y.associate = function(models) {
    // associations can be defined here
  };
  return regional_price_10y;
};