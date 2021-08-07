module.exports = (sequelize, DataTypes) => {
	const Invoice = sequelize.define(
		'invoice', // table name
		{
			// Model attributes are defined here
			id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				primaryKey: true,
                autoIncrement: true
			},
			amount: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
            payment_mode: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
            tax_percentage: {
				type: DataTypes.STRING(11),
				allowNull: false,
			},
            discount_percentage: {
				type: DataTypes.STRING(11),
				allowNull: false,
			},
		},
		{
			// Other model options go here
            timestamps: true,
		}
	);

	return Invoice;
};