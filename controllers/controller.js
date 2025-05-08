let {
    User,
    Category,
    Product,
    Store,
    Cart,
    CartProduct,
} = require("../models");
const { Op, where } = require("sequelize");
const formatPrice = require("../helpers/helper");

class Controller {
    static async homepage(req, res) {
        try {
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
            res.render("landingPage", { data, formatPrice, search });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    }

    static async bed(req, res) {
        try {
            let { role } = req.session;
            let data = await Product.productByCategories(Category, 1);
            // console.log(data);

            res.render("landingPage", { data, role, formatPrice });
        } catch (error) {
            res.send(error);
        }
    }

    static async bedcover(req, res) {
        try {
            let { role } = req.session;
            let data = await Product.productByCategories(Category, 2);
            // console.log(data);

            res.render("landingPage", { data, formatPrice, role });
        } catch (error) {
            console.log(error);

            res.send(error);
        }
    }

    static async cushions(req, res) {
        try {
            let { role } = req.session;

            let data = await Product.productByCategories(Category, 3);
            res.render("landingPage", { data, formatPrice, role });
        } catch (error) {
            console.log(error);

            res.send(error);
        }
    }

    // static async search(req, res) {
    //     try {
    //     } catch (error) {
    //         res.send(error);
    //     }
    // }
}

module.exports = Controller;
