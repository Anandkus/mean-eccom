const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productName: String,
    desc: String,
    price: Number,
    discountPrice: Number,
    status: String,
    productUrl: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }
})

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;