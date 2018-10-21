/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('addresses', {
		id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		postcode: {
			type: DataTypes.STRING(8),
			allowNull: false
		},
		town: {
			type: DataTypes.STRING(30),
			allowNull: false
		},
		dependent_locality: {
			type: DataTypes.STRING(35),
			allowNull: true
		},
		double_dependent_locality: {
			type: DataTypes.STRING(35),
			allowNull: true
		},
		thoroughfare: {
			type: DataTypes.STRING(80),
			allowNull: true
		},
		dependent_thoroughfare: {
			type: DataTypes.STRING(80),
			allowNull: true
		},
		building_number: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		building_name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		sub_building_name: {
			type: DataTypes.STRING(30),
			allowNull: true
		},
		po_box: {
			type: DataTypes.STRING(6),
			allowNull: true
		},
		department_name: {
			type: DataTypes.STRING(60),
			allowNull: true
		},
		organisation_name: {
			type: DataTypes.STRING(60),
			allowNull: true
		},
		postcode_type: {
			type: DataTypes.STRING(1),
			allowNull: true
		},
		su_organisation_indicator: {
			type: DataTypes.STRING(1),
			allowNull: true
		},
		delivery_point_suffix: {
			type: DataTypes.STRING(2),
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		lat: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		lng: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		udprn: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		postcode_details_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true,
			references: {
				model: 'postcode_details',
				key: 'id'
			}
		}
	}, {
		tableName: 'addresses'
	});
};
