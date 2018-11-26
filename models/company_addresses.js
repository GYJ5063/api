'use strict';
module.exports = (sequelize, DataTypes) => {
  const company_addresses = sequelize.define('company_addresses', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    company_id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      references: {
        model: "companies",
        key: "id"
      }
    },
    postcode: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    town: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    building_number: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    building_name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    sub_building_name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    po_box: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    department_name: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    organisation_name: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    postcode_type: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    su_organisation_indicator: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    delivery_point_suffix: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    lat: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true
    },
    lng: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true
    },
    udprn: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, { timestamps: false });
  company_addresses.associate = function (models) {
    company_addresses.belongsTo(models.companies, { as: 'companies', foreignKey: 'company_id', targetKey: 'id' });
  };
  return company_addresses;
};