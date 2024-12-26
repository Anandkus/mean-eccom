const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    password: String,
    mobile: Number,
    age: Number,
    dob: String,
    about: String,
    photo: String,
    role: String,
    gender: String,
    agreetc: Boolean,
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "address"
    }],
    orderId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "orders"
    }],
    cartId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }],
    productId: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;