// This is Server Side Validate

const Joi = require("joi");
const review = require("./models/review");

module.exports.productSchema = Joi.object({
    product: Joi.object({

        name: Joi.string()
            .max(100)
            .required(),

        price: Joi.number()
            .min(0)
            .required(),

        category: Joi.string()
            .valid("Cookies", "Cakes", "Pastries", "Biscuits", "Chocolates", "Breads") // ⬅️ Breads add karo
            .required(),

        description: Joi.string()
            .optional()
            .allow(""),

        image: Joi.object({
            filename: Joi.string().optional(),
            url: Joi.string().uri().optional()
        }).optional()

    }).required()
});



module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number()
            .min(1)
            .max(5)
            .required(),
        comment: Joi.string()
            .optional()
            .allow("")
    }).required()       
})
