module.exports = (sequelize, DataTypes) => {
	const Item = sequelize.define(
		'item', // table name
		{
			// Model attributes are defined here
			id: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
				primaryKey: true,
                autoIncrement: true
			},

			price: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},

            quantity: {
				type: DataTypes.INTEGER(11),
				allowNull: false,
			},
		},
		{
			// Other model options go here
            timestamps: true,
		}
	);

	return Item;
};

