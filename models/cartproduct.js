"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class CartProduct extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            CartProduct.belongsTo(models.Cart, {
                foreignKey: "CartId",
            });
            CartProduct.belongsTo(models.Product, {
                foreignKey: "ProductId",
            });
        }
        get pcsFormat() {
            return `${this.quantity}  Pcs`;
        }
    }
    CartProduct.init(
        {
            quantity: DataTypes.INTEGER,
            totalPrice: DataTypes.INTEGER,
            ProductId: DataTypes.INTEGER,
            CartId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "CartProduct",
        }
    );
    return CartProduct;
};
