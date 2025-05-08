let { User, Category, Product, Cart, CartProduct, Profile } = require("../models")
const { Op } = require("sequelize")
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

    static async search(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
            
        }
    }

    static async getProfile (req, res) {
        try {
            let data = await User.findOne({
                where: {
                    id : req.session.userId
                }
            })
            let profile = await Profile.findOne({
                where: {
                    UserId : data.id
                }
            })
            // res.send(data)
            // res.send(profile)
            res.render("addprofile", {data, profile})
            
        } catch (error) {
            console.log(error);
            res.send(error)
            
        }
    }

    static async postProfile (req, res) {
        try {
            let { fullName, address, phoneNumber } = req.body
            let data = await Profile.findOne({
                where: {
                    UserId : req.session.userId
                }
            })
            if (data) {
                await Profile.update({
                    fullName, 
                    address, 
                    phoneNumber,
                    }, {
                        where: {
                            UserId : req.session.userId
                        }
                    })
            } else {
                await Profile.create({
                    fullName, 
                    address, 
                    phoneNumber,
                    UserId : req.session.userId
                })
            }
            
            res.redirect("/profile")
            
        } catch (error) {
            res.send(error)
            
        }
    }



}

module.exports = Controller;
