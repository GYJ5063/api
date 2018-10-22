'use strict';
module.exports = (sequelize, DataTypes) => {
  const companies = sequelize.define('companies', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER(10).UNSIGNED
    },
    telephone : {
      allowNull: false,
      type: DataTypes.STRING(10)
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  companies.associate = function(models) {
    companies.hasMany(models.users, { foreignKey: 'company_id' });
    companies.hasMany(models.leads, { foreignKey: 'company_id' });
    companies.hasOne(models.company_addresses, { as: 'address', foreignKey: 'company_id' });
  };
  return companies;
};