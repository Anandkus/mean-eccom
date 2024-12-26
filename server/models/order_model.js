const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    fullname: String,
    email: String,
    contact: Number,
    addressId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "address"
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    productId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    status: String,
    orderDate: {
        type: Date,
        default: Date.now()
    },
    orderDate: {
        type: Date,
        default: Date.now()
    },
    deliveryDate: {
        type: Date,
    }

});
const orderModel = mongoose.model("orders", orderSchema);
module.exports = orderModel;