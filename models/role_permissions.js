'use strict';
module.exports = (sequelize, DataTypes) => {
  const role_permissions = sequelize.define('role_permissions', {
    role_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    permission_id: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, { timestamps: false, underscored: true });
  role_permissions.associate = function(models) {
    // associations can be defined here
  };
  return role_permissions;
};