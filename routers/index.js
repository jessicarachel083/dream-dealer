const express = require("express");
const router = express.Router();

const Controller = require("../controllers/controller");
const Authentification = require("../controllers/authentification");

// middleware
// const access = function(req, res, next){
//     if(!req.session.isLoggedIn){
//         res.redirect('/login')
//     }else{
//         next()
//     }
//   }
const isLoggedIn = function (req, res, next) {
    if (!req.session.userId) {
        const error = "Please log in first!";
        res.redirect(`/login?error=${error}`);
    } else {
        next();
    }
};

// home routes
router.get("/", Controller.homepage);
router.get("/bed", Controller.bed);
router.get("/bedcover", Controller.bedcover);
router.get("/cushions", Controller.cushions);
// router.get("/search", Controller.search);

router.get("/cart", isLoggedIn, Controller.cart);
router.get("/:idproduct/addtocart", isLoggedIn, Controller.addToCart);
router.get(
    "/cart/:idcart/delete/:idproduct",
    isLoggedIn,
    Controller.deleteProductCart
);
router.get("/cart/:idcart/payment", isLoggedIn, Controller.cartPayment);
// router.get("/product/add", access, Controller.testingRoute);
// router.post("/product/add", access, Controller.testingRoute);
// router.get("/profile", access, Controller.getProfile);
// router.post("/profile/update", access, Controller.postProfile);

// admin routes
// router.get('/admin', access, AdminController.dashboard)
// router.get('/admin/stores', access, AdminController.getAllStores)
// router.get('/admin/users', access, AdminController.getAllUsers)

router.get("/register", Authentification.getRegister);
router.post("/register", Authentification.postRegister);
router.get("/login", Authentification.getLogin);
router.post("/login", Authentification.postLogin);
router.get("/logout", Authentification.logout);

router.get("/", isLoggedIn, Authentification.dummyhome);

// router.get("/", isLoggedIn, Authentification.dummyhome);

// // home routes
// router.get("/", Controller.homepage);
// router.get("/bed", Controller.bed);
// router.get("/bedcover", Controller.bedcover);
// router.get("/cushions", Controller.cushions);
// router.get("/search", Controller.search);

// router.get("/cart", access , Controller.cart);
// router.get("/:idproduct/addtocart", access, Controller.addToCart);
// router.get("/cart/:idcart/delete/:idproduct", access, Controller.deleteProductCart);
// router.get("/cart/:idcart/payment", access, Controller.cartPayment);
// router.get("/product/add", access, Controller.testingRoute);
// router.post("/product/add", access, Controller.testingRoute);
router.get("/profile", isLoggedIn, Controller.getProfile);
router.post("/profile", isLoggedIn, Controller.postProfile);

// // admin routes
// router.get('/admin', access, AdminController.dashboard)
// router.get('/admin/stores', access, AdminController.getAllStores)
// router.get('/admin/users', access, AdminController.getAllUsers)

//DRAFT - PLEASE IGNORE

// middleware
// const access = function(req, res, next){
//     if(!req.session.isLoggedIn){
//         res.redirect('/login')
//     }else{
//         next()
//     }
//   }

// router.use(function(req, res, next) {
//     console.log("Hello world", Date.now());
//     console.log(req.session);
//     if(!req.session.sudahloginbosku) {
//     // if(!req.session.userId) {
//         const error = "Please login first!"
//         res.redirect(`/login?error=${error}`)
//     } else {
//         next()
//     }
// })

// router.use(function(req, res, next) {
//     console.log("Hello world", Date.now());
//     console.log(req.session);
//     if(req.session.userId && req.session.role !== "seller") {
//         const error = "Seller has no access!"
//         res.redirect(`/login?error=${error}`)
//     } else {
//         next()
//     }
// })

// router.use(isLoggedIn)

// const isSeller = function(req, res, next) {
//     console.log("Hello world", Date.now());
//     console.log(req.session);
//     if(req.session.userId && req.session.role !== "buyer") {
//         const error = "Buyer has no access!"
//         res.redirect(`/login?error=${error}`)
//     } else {
//         next()
//     }
// }

// const coba = function(req, res, next) {
//     console.log("Hello world", Date.now());
//     next()
// }

// const coba2 = function(req, res, next) {
//     console.log("Hello world", Date.now());
//     next()
// }

module.exports = router;
