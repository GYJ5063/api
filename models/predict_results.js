'use strict';
module.exports = (sequelize, DataTypes) => {
  const predict_results = sequelize.define('predict_results', {
    band: DataTypes.DECIMAL,
    confidence_level: DataTypes.INTEGER,
    exist_in_epc: DataTypes.BOOLEAN,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    predict_price: DataTypes.INTEGER,
    predict_price_low: DataTypes.INTEGER,
    predict_price_up: DataTypes.INTEGER,
    probability: DataTypes.DECIMAL
  }, { timestamps: false });
  predict_results.associate = function(models) {
    // associations can be defined here
  };
  return predict_results;
};