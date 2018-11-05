'use strict';
module.exports = (sequelize, DataTypes) => {
  const permissions = sequelize.define('permissions', {
    action: {
      allowNull: false,
      type: DataTypes.STRING
    },
    target: {
      allowNull: false,
      type: DataTypes.STRING
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {});
  permissions.associate = function(models) {
    permissions.belongsToMany(models.roles, { through: models.role_permissions, foreignKey: 'permission_id' });
  };
  return permissions;
};