'use strict';
module.exports = (sequelize, DataTypes) => {
  const reports = sequelize.define('reports', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1
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
    reports.hasMany(models.comparable_properties, { foreignKey: 'report_id' });
    reports.hasMany(models.rental_comparable_properties, { foreignKey: 'report_id' });
    reports.hasMany(models.sales_history_analyze, { as: 'sales_history_analyze', foreignKey: 'report_id' });
    reports.hasMany(models.regional_housetype_price_10y, { as: 'regional_housetype_price_10y', foreignKey: 'report_id' });

    reports.hasOne(models.national_avg_price_10y, { as: 'national_avg_price_10y', foreignKey: 'report_id' });
    reports.hasOne(models.regional_price_10y, { as: 'regional_price_10y', foreignKey: 'report_id' });
    reports.hasOne(models.local_property_type_statistic, { foreignKey: 'report_id' });
    reports.hasOne(models.predict_price_10y, { as: 'predict_price_10y', foreignKey: 'report_id' });
    reports.hasOne(models.predict_results, { as: 'predict_results', foreignKey: 'report_id' });
    reports.hasOne(models.query_info, { as: 'query_info', foreignKey: 'report_id' });
  };
  return reports;
};