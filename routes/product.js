const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const {productSchema , reviewSchema} = require("../schema");
const {isLoggedIn , isOwner} = require("../middleware");
const productsController = require('../controllers/products');  



const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })


// Validate krane ke liye hai
const validateProducts = (req , res , next) => {
    let {error} = productSchema.validate(req.body);
    if (error) {
        const message = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400 , message)
    }else{
        next()
    }  
};




// GET all products
router.get('/', wrapAsync(productsController.index));


// NEW form
router.get("/new", isLoggedIn, productsController.renderNewForm);



// CREATE product
router.post("/",isLoggedIn,upload.single("product[image]"), validateProducts , wrapAsync(productsController.createProduct));





// SHOW product
router.get("/:id", wrapAsync(productsController.showProduct));



// EDIT form
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(productsController.renderEditForm));



// UPDATE route
router.put("/:id", isLoggedIn, isOwner, upload.single("product[image]") ,validateProducts, wrapAsync(productsController.updateProduct));



// DELETE product
router.delete("/:id", isLoggedIn , isOwner, wrapAsync(productsController.deleteProduct));


module.exports = router;