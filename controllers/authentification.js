const { User } = require("../models")
const bcrypt = require("bcryptjs");

class Authentification {

    static async dummyhome(req, res) {
        try {
            res.render("dummyhome")
            
        } catch (error) {
            
        }
    }


    static async getRegister(req, res) {
        try {
            let { error } = req.query;
            res.render("auth/registerform", {error})

        } catch (error) {
            res.send(error)
        }
    }

    static async postRegister(req, res) {
        try {
            let {username, email, password, role} = req.body
            await User.create({
                username, email, password, role
            })

            res.redirect("/login")
            
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                let errorArr = error.errors.map(el => {
                    return el.message
                })
                res.redirect(`/register?error=${errorArr}`)
            // } else if(error.name === "SequelizeUniqueConstraintError"){
            //     let errorArr = error.errors.map((el) => {
            //         return el.message;
            //     });
            //     res.redirect(`/register?error=${errorArr}`);
            } else {
                res.send(error)

            }
        }
    }

    static async getLogin(req, res) {
        try {
            const {error} = req.query
            res.render("auth/loginform", {error})

        } catch (error) {
            res.send(error)
        }

    }

    static async postLogin(req, res) {
        try {
            //apakah dari username dan password yang diinput, usernya ada?
            //findOne User dari username. kalo dia nggak ada di database hasilnya null
            // kalo user nggak ada gak boleh masuk ke home, keluar error
            // kalo user ada compare plain password apakah sama dengna password hashed
            // kalo nggak sama, gak boleh masuk ke home, keluar error
            // kalo pasword sesuai, redirect ke home

            let {username, password} = req.body

            let data = await User.findOne({
                where: {
                    username
                }
            })

            if(data) {
                const isValidPassword = bcrypt.compareSync(password, data.password)
                if (isValidPassword) {
                    // berhasil login
                    req.session.userId = data.id 
                    // userId bebas, tapi intinya nanti akan dijadikan kondisi di route
                    // req.session.role = data.role
                    return res.redirect("/")
                } else {
                    const error = "Wrong password!"
                    return res.redirect(`/login?error=${error}`)
                }
            } else {
                const error = "Username not found!"
                return res.redirect(`/login?error=${error}`)
            }

        } catch (error) {
            res.redirect("/login")
        }

    }

    static async logout(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.redirect(`/login`)
                }
            })

        } catch (error) {
            res.send(error)
        }

    }


}

module.exports = Authentification