'use strict';
module.exports = (sequelize, DataTypes) => {
  const comparable_properties = sequelize.define('comparable_properties', {
    report_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "reports",
        key: "id"
      }
    },
    address_id: {
      allowNull: false,
      references: { model: 'addresses', key: 'id'},
      type: DataTypes.INTEGER(10).UNSIGNED,
    },
    current_valuation: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    distance: {
      type: DataTypes.INTEGER(10)
    },
    sold_date: {
      type: DataTypes.DATE
    },
    sold_price: {
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    rooms: {
      type: DataTypes.INTEGER(3).UNSIGNED
    },
    size: {
      type: DataTypes.INTEGER(5)
    },
    lat: {
      type: DataTypes.DECIMAL(10, 6)
    },
    address_1: {
      type: DataTypes.STRING
    },
    lng: {
      type: DataTypes.DECIMAL(10, 6)
    },
    house_type_out: {
      type: DataTypes.STRING
    },
    postcode: {
      type: DataTypes.STRING(8)
    }
  }, { timestamps: false });
  comparable_properties.associate = function(models) {
    comparable_properties.belongsTo(models.reports, { foreignKey: 'report_id', targetKey: 'id' });
  };
  return comparable_properties;
};