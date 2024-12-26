const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
    fname: String,
    lname: String,
    mobile: Number,
    address1: String,
    address2: String,
    city: String,
    state: String,
    zipcode: Number,
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
})

const addressModel = mongoose.model("address", addressSchema);
module.exports = addressModel;