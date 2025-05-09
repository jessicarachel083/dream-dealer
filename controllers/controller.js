let {
    User,
    Category,
    Product,
    Profile,
    Cart,
    CartProduct,
} = require("../models");
const { Op } = require("sequelize");
let qr = require("qrcode");
const formatPrice = require("../helpers/helper");
const product = require("../models/product");

class Controller {
    static async homepage(req, res) {
        try {
            let { userId } = req.session;
            let { search } = req.query;
            let data = await Product.findAll({
                include: Category,
                limit: 11,
            });
            if (search) {
                data = await Product.findAll({
                    include: Category,
                    limit: 15,
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`,
                        },
                    },
                });
            }
            res.render("landingPage", { data, formatPrice, search, userId });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async bed(req, res) {
        try {
            let { userId } = req.session;
            let data = await Product.productByCategories(Category, 1);
            // console.log(data);

            res.render("landingPage", { data, userId, formatPrice });
        } catch (error) {
            res.send(error);
        }
    }

    static async bedcover(req, res) {
        try {
            let { userId } = req.session;
            let data = await Product.productByCategories(Category, 2);
            // console.log(data);

            res.render("landingPage", { data, formatPrice, userId });
        } catch (error) {
            console.log(error);

            res.send(error);
        }
    }

    static async cushions(req, res) {
        try {
            let { userId } = req.session;

            let data = await Product.productByCategories(Category, 3);
            res.render("landingPage", { data, formatPrice, userId });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async getProfile(req, res) {
        try {
            let data = await User.findOne({
                where: {
                    id: req.session.userId,
                },
            });
            let profile = await Profile.findOne({
                where: {
                    UserId: data.id,
                },
            });

            res.render("addprofile", { data, profile });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async postProfile(req, res) {
        try {
            let { fullName, address, phoneNumber } = req.body;
            await Profile.update(
                {
                    fullName,
                    address,
                    phoneNumber,
                },
                {
                    where: {
                        UserId: req.session.userId,
                    },
                }
            );

            res.redirect("/");
        } catch (error) {
            res.send(error);
        }
    }
    static async cart(req, res) {
        try {
            let { notif, status } = req.query;
            let userId = req.session.userId;
            let data = await Cart.findOne({
                where: { UserId: userId },
                include: [{ model: CartProduct, include: [Product] }],
            });
            let sum = await CartProduct.sum("totalPrice", {
                where: { CartId: data.id },
            });
            let data2 = await Cart.findOne({
                where: { UserId: userId },
            });
            qr.toDataURL(
                "https://www.ncsc.gov.uk/images/library/QR-IMAGE.png",
                (err, src) => {
                    res.render("cart", {
                        data,
                        sum,
                        formatPrice,
                        notif,
                        qr: src,
                        status,
                        userId,
                        data2,
                    });
                }
            );
            // res.send(data);
        } catch (error) {
            res.send(error);
        }
    }
    static async addToCart(req, res) {
        try {
            let { idproduct } = req.params;
            let userId = req.session.userId;

            let cart = await Cart.findOne({ where: { UserId: userId } });
            let item = await Product.findOne({ where: { id: idproduct } });
            // if (!cart) {
            //     cart = await Cart.create({ UserId: userId });
            // }
            let cartProduct = await CartProduct.findOne({
                where: { CartId: cart.id, ProductId: idproduct },
            });
            if (cartProduct) {
                await cartProduct.increment("quantity");
                return res.redirect("/cart");
            }
            await CartProduct.create({
                CartId: cart.id,
                ProductId: item.id,
                quantity: 1,
                totalPrice: item.price,
            });

            res.redirect("/cart");
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }
    static async deleteProductCart(req, res) {
        try {
            let { idcart, idproduct } = req.params;
            let notif = await Product.findByPk(idproduct);
            let productName = notif.name;
            await CartProduct.destroy({
                where: {
                    ProductId: idproduct,
                },
            });
            res.redirect(`/cart?notif=${productName}`);
        } catch (error) {
            res.send(error);
        }
    }
    static async cartPayment(req, res) {
        try {
            let { idcart } = req.params;
            await CartProduct.destroy({
                where: {
                    CartId: idcart,
                },
            });
            res.redirect("/cart?status=success");
        } catch (error) {
            res.send(error);
        }
    }
}

// let {
//     User,
//     Category,
//     Product,
//     Store,
//     Cart,
//     CartProduct,
// } = require("../models");
// const { Op } = require("sequelize");
// const formatPrice = require("../helpers/helper");

// class Controller {
//     static async homepage(req, res) {
//         try {
//             let { search } = req.query;
//             let data = await Product.findAll({
//                 include: Category,
//                 limit: 11,
//             });
//             if (search) {
//                 data = await Product.findAll({
//                     include: Category,
//                     limit: 15,
//                     where: {
//                         name: {
//                             [Op.iLike]: `%${search}%`,
//                         },
//                     },
//                 });
//             }
//             res.render("landingPage", { data, formatPrice, search });
//         } catch (error) {
//             console.log(error);
//             res.send(error);
//         }
//     }

//     static async bed(req, res) {
//         try {
//             let { userId } = req.session;
//             let data = await Product.productByCategories(Category, 1);
//             // console.log(data);

//             res.render("landingPage", { data, userId, formatPrice });
//         } catch (error) {
//             res.send(error);
//         }
//     }

//     static async bedcover(req, res) {
//         try {
//             let { userId } = req.session;
//             let data = await Product.productByCategories(Category, 2);
//             // console.log(data);

//             res.render("landingPage", { data, formatPrice, userId });
//         } catch (error) {
//             console.log(error);

//             res.send(error);
//         }
//     }

//     static async cushions(req, res) {
//         try {
//             let { role } = req.session;

//             let data = await Product.productByCategories(Category, 3);
//             res.render("landingPage", { data, formatPrice, role });
//         } catch (error) {
//             console.log(error);

//             res.send(error);
//         }
//     }
//     static async getProfile(req, res) {
//         try {
//             let data = await User.findOne({
//                 where: {
//                     id: req.session.userId,
//                 },
//             });
//             let profile = await Profile.findOne({
//                 where: {
//                     UserId: data.id,
//                 },
//             });
//             // res.send(data)
//             // res.send(profile)
//             res.render("addprofile", { data, profile });
//         } catch (error) {
//             console.log(error);
//             res.send(error);
//         }
//     }

//     static async postProfile(req, res) {
//         try {
//             let { fullName, address, phoneNumber } = req.body;
//             let data = await Profile.findOne({
//                 where: {
//                     UserId: req.session.userId,
//                 },
//             });
//             if (data) {
//                 await Profile.update(
//                     {
//                         fullName,
//                         address,
//                         phoneNumber,
//                     },
//                     {
//                         where: {
//                             UserId: req.session.userId,
//                         },
//                     }
//                 );
//             } else {
//                 await Profile.create({
//                     fullName,
//                     address,
//                     phoneNumber,
//                     UserId: req.session.userId,
//                 });
//             }

//             res.redirect("/profile");
//         } catch (error) {
//             res.send(error);
//         }
//     }
// }

// module.exports = Controller;

module.exports = Controller;
