'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
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
  roles.associate = function (models) {
    roles.belongsToMany(models.users, { through: models.user_roles, foreignKey: 'role_id' });

    // assignment done for nesting
    roles.permissions = roles.belongsToMany(models.permissions, { through: models.role_permissions, foreignKey: 'role_id' });
  };
  return roles;
};