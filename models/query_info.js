'use strict';
module.exports = (sequelize, DataTypes) => {
  const query_info = sequelize.define('query_info', {
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
      type: DataTypes.INTEGER(10).UNSIGNED,
      references: {
        model: "addresses",
        key: "id"
      }
    },
    number_habitable_rooms: DataTypes.INTEGER,
    built_from: DataTypes.ENUM('Enclosed End-Terrace', 'Enclosed Mid-Terrace', 'End-Terrace', 'Mid-Terrace', 'Semi-Detached', 'Detached'),
    total_floor_area: DataTypes.INTEGER,
    wall_type: DataTypes.ENUM('brick', 'cavity wall', 'timber', 'stone', 'cob', 'unknown'),
    property_type : DataTypes.ENUM('Flat', 'Maisonette', 'Bungalow', 'House')
  }, {});
  query_info.associate = function(models) {
    query_info.belongsTo(models.reports, { as: 'reports', foreignKey: 'report_id', targetKey: 'id' });
  };
  return query_info;
};