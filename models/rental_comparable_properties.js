'use strict';
module.exports = (sequelize, DataTypes) => {
  const rental_comparable_properties = sequelize.define('rental_comparable_properties', {
    report_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "reports",
        key: "id"
      }
    },
    distance: {
      type: DataTypes.INTEGER(10)
    },
    available_from: {
      type: DataTypes.STRING
    },
    display_address: {
      type: DataTypes.STRING
    },
    lng: {
      type: DataTypes.DECIMAL
    },
    price: {
      type: DataTypes.INTEGER(11)
    },
    num_beds: {
      type: DataTypes.INTEGER
    },
    num_baths: {
      type: DataTypes.INTEGER
    },
    lat: {
      type: DataTypes.DECIMAL
    },
    front_image_url: {
      type: DataTypes.STRING
    },
    property_type: {
      type: DataTypes.STRING
    },
    furnished_state: {
      type: DataTypes.STRING
    }
  }, { timestamps: false });
  rental_comparable_properties.associate = function(models) {
    rental_comparable_properties.belongsTo(models.reports, { foreignKey: 'report_id', targetKey: 'id' });
  };
  return rental_comparable_properties;
};