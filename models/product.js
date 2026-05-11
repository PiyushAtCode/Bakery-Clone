const mongoose = require("mongoose");
const Review = require("./review");
const Schema = mongoose.Schema;
const productSchema = new Schema({

    name: {
        type: String,
        required: true,            
        maxlength: 100
    },

    price: {
        type: Number,
        required: true,
        min: 0                  // negative price nahi aayega
    },

    category: {
        type: String,
        enum: ["Cookies", "Cakes", "Pastries", "Biscuits", "Chocolates" , "Breads"],
        required: true
    },

    description: {
        type: String,
        trim: true
    },

   image: {
        filename: { type: String},
        url: {  type: String }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    reviews: [  
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner :
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }   
    

});


productSchema.post("findOneAndDelete", async (product) => {
    if (product) {
        // await mongoose.model("Review").deleteMany({
        //     _id: { $in: product.reviews }
        // });

        await Review.deleteMany({
            _id: { $in: product.reviews }
        }); 
    }
});

module.exports = mongoose.model("Product", productSchema);