'use strict';
module.exports = (sequelize, DataTypes) => {
  const leads = sequelize.define('leads', {
      id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
      },
      first_name: {
          allowNull: true,
          type: DataTypes.STRING

      },
      last_name: {
          type: DataTypes.STRING
      },
      email: {
          type: DataTypes.STRING
      },
      phone_number: {
          type: DataTypes.STRING
      },
      sales_valuation: {
          type: DataTypes.DOUBLE
      },
      rental_valuation: {
          type: DataTypes.DOUBLE
      },
      company_id: {
          type: DataTypes.INTEGER(10).UNSIGNED,
          allowNull: true,
          references: {
              model: "companies",
              key: "id"
          }
      },
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
            models: "addresses",
            key: "id"
        }
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

    leads.associate = function(models) {
        leads.belongsTo(models.companies, { foreignKey: 'company_id', targetKey: 'id' });
        leads.valuation_address = leads.belongsTo(models.addresses, { as: 'valuation_address', foreignKey: 'address_id', targetKey: 'id' });
    };

  return leads;
};