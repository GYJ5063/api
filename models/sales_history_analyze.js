'use strict';
module.exports = (sequelize, DataTypes) => {
  const sales_history_analyze = sequelize.define('sales_history_analyze', {
    report_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "reports",
        key: "id"
      }
    },
    price_chage_percent: DataTypes.DECIMAL(7, 4),
    price_change: DataTypes.INTEGER(11),
    sold_date: DataTypes.DATE,
    sold_price: DataTypes.INTEGER(11)
  }, { timestamps: false });
  sales_history_analyze.associate = function(models) {
    sales_history_analyze.belongsTo(models.reports, { foreignKey: 'report_id', targetKey: 'id' });
  };
  return sales_history_analyze;
};