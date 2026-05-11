const User = require('../models/user');


module.exports.renderSignupForm = async (req, res) => {
    res.render("users/signup.ejs");
}


module.exports.signup = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;

        const newUser = new User({ email, username });

        const registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) return next(err);

            req.flash("success", "Welcome! Your account is created.");
            res.redirect("/products"); // ✅ direct login
        });

    } catch (error) {
        req.flash("error", error.message);
        res.redirect("/signup");
    }
}


module.exports.renderLoginForm =  async (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login = async (req, res) => {
        req.flash("success", `Welcome back ${req.user.username}!`);
        res.redirect(res.locals.redirectUrl || "/products"); // ✅ fix
    }


module.exports.logout = (req, res , next) => {
    req.logout(function(err) {
        if (err) {  
            next(err);
            return;
        }
        req.flash("success", "You have been logged out.");
        res.redirect("/products");
    });
}