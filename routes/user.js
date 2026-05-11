const express = require('express');
const router = express.Router({ mergeParams: true });
const User = require('../models/user');
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { userSchema } = require("../schema");
const passport = require('passport'); 
const {saveRedirectUrl} = require("../middleware");
const usersController = require('../controllers/users');






router.get("/signup", usersController.renderSignupForm);


router.post("/singup", wrapAsync(usersController.signup));



// router.post("/singup", wrapAsync(async (req, res ,next) => {
//     try {
//         let { username, email, password } = req.body;
//         const newUser = new User({
//             email, username
//         })
//         const SignupUser = await User.register(newUser, password);
//         console.log(SignupUser);
//         req.flash("success", "Signup successful! Please log in.");
//         res.redirect("/login");
//     } catch (error) {
//         req.flash("error", error.message);
//         res.redirect("/signup");
//     }
// }))

router.get("/login", usersController.renderLoginForm);


router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureFlash: true,
        failureRedirect: "/login"
    }),
   usersController.login
);



router.get("/logout", usersController.logout);


module.exports = router;