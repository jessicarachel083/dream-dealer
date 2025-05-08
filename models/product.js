"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Product.belongsTo(models.Category, {
                foreignKey: "CategoryId",
            });
            Product.hasMany(models.CartProduct, {
                foreignKey: "ProductId",
            });
        }
        static async productByCategories(Categories, CartId) {
            try {
                return Product.findAll({
                    include: Categories,
                    where: {
                        CategoryId: CartId,
                    },
                });
            } catch (error) {
                throw error;
            }
        }
    }
    Product.init(
        {
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            description: DataTypes.STRING,
            CategoryId: DataTypes.INTEGER,
            imageUrl: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Product",
        }
    );
    return Product;
};
