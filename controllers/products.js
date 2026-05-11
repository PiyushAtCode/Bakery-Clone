
const Product = require('../models/product');


module.exports.index = async (req, res) => {
    let { search } = req.query;
    
    let query = {};
    
    if (search && search.trim() !== "") {
        query = {
            $or: [
                { name: { $regex: search, $options: "i" } },      // product name se search
                { category: { $regex: search, $options: "i" } }   // category se search
            ]
        };
    }
    
    let products = await Product.find(query);
    res.render("products/index.ejs", { products, search: search || "" }); 
}


module.exports.renderNewForm = (req, res) => {
    res.render("products/new.ejs");
};


module.exports.showProduct = async (req, res) => {
    
    let { id } = req.params;
    let product = await Product.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("owner");

    if (!product) {
        req.flash("error", "Product not found");
        return res.redirect("/products");
    }
    // console.log(product);
    res.render("products/show.ejs", { product });
}


module.exports.createProduct = async (req, res , next) => {
    let url = req.file.path;
    let filename =req.file.filename
    
    let productData = req.body.product;
    let newProduct = new Product(productData);
    newProduct.owner = req.user._id; // Set the owner of the product    
    newProduct.image = {url , filename}
    await newProduct.save();
    req.flash("success", "Product created successfully!");
    res.redirect("/products");
}


module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    let product = await Product.findById(id);

    if (!product) {
        req.flash("error", "Product not found");
        return res.redirect("/products");
    }

    res.render("products/edit.ejs", { product });
}



module.exports.updateProduct = async (req, res) => {

    let { id } = req.params;

    let updatedProduct = await Product.findByIdAndUpdate(
        id,
        req.body.product,
        { new: true, runValidators: true }
    );

    if (typeof req.file != "undefined") {

        let url = req.file.path;
        let filename = req.file.filename;

        updatedProduct.image = { url, filename };

        await updatedProduct.save();
    }

    req.flash("success", "Product updated successfully!");

    res.redirect(`/products/${updatedProduct._id}`);
}


module.exports.deleteProduct = async (req, res) => {
    let { id } = req.params;
    await Product.findByIdAndDelete(id);
    req.flash("success", "Product deleted successfully!");
    res.redirect("/products");
}


