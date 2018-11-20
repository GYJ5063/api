'use strict';
module.exports = (sequelize, DataTypes) => {
  const reports = sequelize.define('reports', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    address_id: {
      allowNull: false,
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    company_id: {
      allowNull: false,
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    createdAt: {
      allowNull: false,
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      field: 'updated_at',
      type: DataTypes.DATE
    }
  }, {});
  reports.associate = function(models) {
    // TODO: add report associations
  };
  return reports;
};