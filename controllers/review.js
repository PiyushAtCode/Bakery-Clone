const Reviews = require('../models/review');
const Product = require('../models/product');


module.exports.createReview = async (req, res) => {
    let product = await Product.findById(req.params.id);
    console.log(product);
    
    if (!product) {  // ← pehle check
        throw new ExpressError(404, "Product not found");
    }

    let { comment, rating } = req.body.review; // ← baad mein

    let addReview = new Reviews({
        rating: rating,
        comment: comment
    });
    let add = addReview.author = req.user._id; // Set the author of the review
    console.log(add);
    
    product.reviews.push(addReview);
    await addReview.save();
    await product.save();
    req.flash("success", "Review added successfully!");
    res.redirect(`/products/${product._id}`);
}



module.exports.deleteReview = async (req, res) => {
    let { id, reviewId } = req.params;

    await Product.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });

    await Reviews.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted successfully!");
    res.redirect(`/products/${id}`);
}