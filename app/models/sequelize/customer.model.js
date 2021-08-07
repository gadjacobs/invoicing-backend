module.exports = (sequelize, DataTypes) => {
	const Customer = sequelize.define(
		'customer', // table name
		{
			// Model attributes are defined here
			id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			full_name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			
			mobile: {
				type: DataTypes.BIGINT(20),
				allowNull: false,
			},
			email: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
		},
		{
			// Other model options go here
			timestamps: true,
		}
	);

	return Customer;
};
