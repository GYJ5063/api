'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_roles = sequelize.define('user_roles', {
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    role_id: {
      allowNull: false,
      type: DataTypes.INTEGER(10).UNSIGNED
    }
  }, { timestamps: false });
  user_roles.associate = function (models) {
    // associations can be defined here
  };
  return user_roles;
};