let { User, Category, Product, Cart, CartProduct, Profile } = require("../models")
const { Op } = require("sequelize")

class Controller {
    static async homepage(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
            
        }
    }

    static async bed(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
            
        }
    }

    static async bedcover(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
            
        }
    }

    static async cushions(req, res) {
        try {
            
        } catch (error) {
            res.send(error)
            
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

module.exports = Controller