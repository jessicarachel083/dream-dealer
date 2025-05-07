const express = require("express");
const Controller = require("../controllers/controller");
const Authentification = require("../controllers/authentification");
const router = express.Router();

// middleware
const access = function(req, res, next){
    if(!req.session.isLoggedIn){
        res.redirect('/login')
    }else{
        next()
    }
  }

// auth pages
router.get("/register", Authentification.registerForm);
router.post("/register", Authentification.registerPost);
router.get("/login", Authentification.login);
router.post("/auth", Authentification.auth);
router.get("/logout", Authentification.logout)

// home routes
router.get("/", Controller.homepage);
router.get("/bed", Controller.bed);
router.get("/bedcover", Controller.bedcover);
router.get("/cushions", Controller.cushions);
router.get("/search", Controller.search);

router.get("/cart", access , Controller.cart);
router.get("/:idproduct/addtocart", access, Controller.addToCart);
router.get("/cart/:idcart/delete/:idproduct", access, Controller.deleteProductCart);
router.get("/cart/:idcart/payment", access, Controller.cartPayment);
router.get("/product/add", access, Controller.testingRoute);
router.post("/product/add", access, Controller.testingRoute);
router.get("/profile", access, Controller.getProfile);
router.post("/profile/update", access, Controller.postProfile);

// admin routes
router.get('/admin', access, AdminController.dashboard)
router.get('/admin/stores', access, AdminController.getAllStores)
router.get('/admin/users', access, AdminController.getAllUsers)

module.exports = router;
