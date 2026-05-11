
const Product = require("./models/product");
const ExpressError = require("./utils/ExpressError");
const Reviews = require("./models/review");


module.exports.isLoggedIn  = (req , res  , next) => {
    if(!req.isAuthenticated()) {

        // ✅ Only store GET requests
        if(req.method === "GET"){
            req.session.redirectUrl = req.originalUrl;
        } else {
            // POST/DELETE ke liye safe redirect
            req.session.redirectUrl = `/products/${req.params.id}`;
        }

        req.flash("error", "You must be signed in first!");
        return res.redirect("/login");
    }
    next();
}


module.exports.saveRedirectUrl = (req , res , next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}   


module.exports.isOwner = async (req, res, next) => {
    let { id } = req.params;
    let product = await Product.findById(id);
    if (!product) {
        req.flash("error", "Product not found");
        return res.redirect("/products");
    }
    if (!product.owner._id.equals(req.user._id)) {
        req.flash("error", "You don't have permission to do that!");
        return res.redirect(`/products/${id}`);
    }
    next();
}

module.exports.isAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;   // ✅ id add kiya

    let review = await Reviews.findById(reviewId);

    if (!review) {
        req.flash("error", "Review not found");
        return res.redirect("/products");
    }

    if (!review.author.equals(req.user._id)) {   // 🔥 small improvement
        req.flash("error", "You don't have permission to do that!");
        return res.redirect(`/products/${id}`);  // ✅ ab id defined hai
    }

    next();
};