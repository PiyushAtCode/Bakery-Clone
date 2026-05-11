const express = require('express');
const router = express.Router({ mergeParams: true });
const Reviews = require('../models/review');
const Product = require('../models/product');
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const {productSchema , reviewSchema} = require("../schema");
const {isLoggedIn , isAuthor} = require("../middleware");
const reviewController = require('../controllers/review');


const validateReviews = (req , res , next) => {
    let {error}  = reviewSchema.validate(req.body);
     if (error) {
        const message = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400 , message)
    }else{
        next()
    }  
};


router.post("/", isLoggedIn, validateReviews, wrapAsync(reviewController.createReview));


// delete review

router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(reviewController.deleteReview));




module.exports = router;