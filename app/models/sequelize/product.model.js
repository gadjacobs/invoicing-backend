module.exports = (sequelize, DataTypes) => {
	const Product = sequelize.define(
		'product', // table name
		{
			// Model attributes are defined here
			id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				primaryKey: true,
				autoIncrement: true
			},
			name: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT,
				allowNull: false,
			},

			stock: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			cost: {
				type: DataTypes.STRING(11),
				allowNull: false,
			},
		},
		{
			// Other model options go here
			timestamps: true,
		}
	);

	return Product;
};
