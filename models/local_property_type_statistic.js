'use strict';
module.exports = (sequelize, DataTypes) => {
  const local_property_type_statistic = sequelize.define('local_property_type_statistic', {
    report_id: {
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: "reports",
        key: "id"
      }
    },
    Detached_num_ratio: {
      type: DataTypes.DECIMAL(5, 3),
      defaultValue: 0
    },
    Detached_average_value: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0
    },
    Detached_average_size: {
        type: DataTypes.INTEGER(5),
        defaultValue: 0
    },
    Detached_per_size_value: {
        type: DataTypes.INTEGER(6),
        defaultValue: 0
    },
    Semi_Detached_num_ratio: {
        type: DataTypes.DECIMAL(5, 3),
        defaultValue: 0
    },
    Semi_Detached_average_value: {
        type: DataTypes.INTEGER(11),
        defaultValue: 0
    },
    Semi_Detached_average_size: DataTypes.INTEGER(5),
    Semi_Detached_per_size_value: DataTypes.INTEGER(6),
    Terrace_num_ratio: DataTypes.DECIMAL(5, 3),
    Terrace_average_value: DataTypes.INTEGER(11),
    Terrace_average_size: DataTypes.INTEGER(5),
    Terrace_per_size_value: DataTypes.INTEGER(6),
    Flat_num_ratio: DataTypes.DECIMAL(5, 3),
    Flat_average_value: DataTypes.INTEGER(11),
    Flat_average_size: DataTypes.INTEGER(5),
    Flat_per_size_value: DataTypes.INTEGER(6)
  }, { timestamps: false });
  local_property_type_statistic.associate = function(models) {
    local_property_type_statistic.belongsTo(models.reports, { foreignKey: 'report_id', targetKey: 'id' });
  };
  return local_property_type_statistic;
};